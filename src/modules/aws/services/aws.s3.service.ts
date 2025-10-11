import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

import {
  ALLOWED_IMAGE_MIME,
  ALLOWED_VIDEO_MIME,
  MAX_BATCH_IMAGES,
  MAX_IMAGE_SIZE,
  MAX_IMAGE_SIZE_MB,
  MAX_TOTAL_IMAGE_SIZE,
  MAX_VIDEO_SIZE,
  MAX_VIDEO_SIZE_GB,
} from '@modules/aws/configs/aws-upload.config';
import { AWS_CONFIG, AwsConfig } from '@modules/aws/configs/aws.config';
import {
  ImageMaximumBatchCountExceededException,
  SingleImageMaximumSizedExceededException,
  TotalImageMaximumSizeExceededException,
  VideoMaximumSizeExceededException,
} from '@modules/aws/exceptions/aws-upload.exception';
import { AwsUploadFileType, UploadDomain } from '@modules/aws/types/aws.types';
import { mimeToExt } from '@modules/aws/utils/mime-transfer';
import { MySQLPrismaService } from '@modules/prisma/services/mysql.prisma.service';

@Injectable()
export class AwsS3Service {
  private readonly s3: S3Client;
  private readonly bucket: string;
  private readonly cdn: string;
  private readonly awsConfig: ConfigType<typeof AwsConfig>;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: MySQLPrismaService,
  ) {
    this.awsConfig = this.configService.getOrThrow<ConfigType<typeof AwsConfig>>(AWS_CONFIG);

    this.bucket = this.awsConfig.bucket;
    this.cdn = this.awsConfig.cdnBaseUrl;

    const region = this.awsConfig.region;
    const accessKeyId = this.awsConfig.accessKeyId;
    const secretAccessKey = this.awsConfig.secretAccessKey;

    this.s3 = new S3Client({
      region,
      credentials: accessKeyId && secretAccessKey ? { accessKeyId, secretAccessKey } : undefined,
    });
  }

  async getPresignedPutUrl(opts: {
    domain: UploadDomain;
    kind: AwsUploadFileType; // image나 video
    contentType: string;
    size?: number; // 현재 파일 용량
    totalSize?: number; // 배치 업로드 총합
    batchCount?: number; // 업로드 총 장수
    ext?: string; // 확장자 (직접 전달 안 하면 mimeToExt로 자동 결정)
    expiresIn?: number; // Presigned URL 유효 시간
  }) {
    const { domain, kind, contentType, size, ext, expiresIn = 600 } = opts;

    this.validateOptions(opts);

    const now = new Date();
    const yyyy = String(now.getUTCFullYear());
    const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(now.getUTCDate()).padStart(2, '0');

    const extension = (ext ?? mimeToExt(contentType)).toLowerCase();
    const key = `uploads/${domain}/${kind}/${yyyy}/${mm}/${dd}/${randomUUID()}.${extension}`;

    const cmd = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3, cmd, { expiresIn });
    const publicUrl = `${this.cdn.replace(/\/+$/, '')}/${key}`;

    // DB 저장
    const created = await this.prisma.s3UploadedFiles.create({
      data: {
        domain,
        kind,
        key,
        url: publicUrl,
        mimeType: contentType,
        size: size ?? null,
      },
    });

    // JSON 직렬화에서 안 터지도록 BigInt → string
    const upload = {
      id: created.id.toString(),
      domain: created.domain,
      kind: created.kind,
      key: created.key,
      url: created.url,
      mimeType: created.mimeType,
      size: created.size,
      createdAt: created.createdAt,
    };

    return { uploadUrl, key, publicUrl, expiresIn, upload };
  }

  validateOptions(opts: {
    kind: AwsUploadFileType; // image나 video
    contentType: string;
    size?: number; // 현재 파일 용량
    totalSize?: number; // 배치 업로드 총합
    batchCount?: number; // 업로드 총 장수
  }) {
    const { kind, contentType, size, totalSize, batchCount } = opts;

    // MIME 정책
    if (kind === 'image' && !ALLOWED_IMAGE_MIME.has(contentType)) {
      throw new BadRequestException(
        `Unsupported image type. Allowed: ${[...ALLOWED_IMAGE_MIME].join(', ')}`,
      );
    } else if (kind === 'video' && !ALLOWED_VIDEO_MIME.has(contentType)) {
      throw new BadRequestException(
        `Unsupported video type. Allowed: ${[...ALLOWED_VIDEO_MIME].join(', ')}`,
      );
    }

    // 용량 정책
    if (kind === 'image') {
      if (typeof size === 'number' && size > MAX_IMAGE_SIZE) {
        throw new SingleImageMaximumSizedExceededException();
      }
      if (typeof totalSize === 'number' && totalSize > MAX_TOTAL_IMAGE_SIZE) {
        throw new TotalImageMaximumSizeExceededException();
      }
      if (typeof batchCount === 'number' && batchCount > MAX_BATCH_IMAGES) {
        throw new ImageMaximumBatchCountExceededException();
      }
    } else if (kind === 'video' && typeof size === 'number' && size > MAX_VIDEO_SIZE) {
      throw new VideoMaximumSizeExceededException();
    }
  }
}
