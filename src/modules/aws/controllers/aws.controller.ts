import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';

import { GetPresignedUrlDto } from '@modules/aws/dto/get-presigned-url.dto';
import { AwsS3Service } from '@modules/aws/services/aws.s3.service';

// import { Public } from '@/modules/auth/decorators/public.decorator';

@ApiTags(API_TAGS.UPLOAD, API_TAGS.AWS)
@ApiBearerAuth()
@Controller({
  path: 'uploads',
  version: '1',
})
export class AwsController {
  constructor(private readonly awsS3: AwsS3Service) {}

  // @Public() // 테스트 할 때 사용
  @Post('presigned')
  @ApiOperation({
    summary: 'S3 Presigned URL 발급',
    description: '클라이언트가 S3로 직접 업로드할 수 있도록 PUT presigned URL을 발급합니다.',
  })
  async getPresigned(@Body() dto: GetPresignedUrlDto) {
    // batchCount는 현재 서버 검증에 사용하지 않지만 Swagger/FE 참고용으로 DTO에 두었습니다.
    return this.awsS3.getPresignedPutUrl(dto);
  }
}
