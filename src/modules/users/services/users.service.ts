import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@modules/prisma/prisma.service';
import {
  CreateUserRequestDto,
  UpdateNicknameRequestDto,
  UpdateProfileImageRequestDto,
} from '@modules/users/dto/user.dto';

import { Prisma } from '@/generated/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 사용자 생성
   */
  async createUser(user: CreateUserRequestDto) {
    const newUser = await this.prisma.user.create({
      data: user,
      select: { id: true },
    });

    return { id: newUser.id.toString() };
  }

  /**
   * 내 정보 조회
   */
  async getUserInfo(userId: bigint) {
    const profileOwner = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!profileOwner) {
      throw new NotFoundException('해당 사용자를 찾을 수 없습니다.');
    }

    return {
      id: profileOwner.id,
      name: profileOwner.name,
      nickname: profileOwner.nickname,
      phoneNumber: profileOwner.phoneNumber ?? undefined,
      profileImage: profileOwner.profileImage ?? undefined,
      createdAt: profileOwner.createdAt.toISOString(),
      updatedAt: profileOwner.updatedAt.toISOString(),
    };
  }

  /**
   * 닉네임 사용 가능 여부 확인
   * - 중복 존재 시 available=false
   */
  async checkNicknameAvailability(nickname: string) {
    const trimmed = nickname.trim();
    if (!trimmed) {
      throw new BadRequestException('닉네임을 입력해 주세요.');
    }

    const exists = await this.prisma.user.findFirst({
      where: { nickname: trimmed },
      select: { id: true },
    });

    return { available: !exists };
  }

  /**
   * 내 닉네임 변경
   * - 자기 자신 제외 중복 방지
   * - TODO: Prisma에 @unique 제약 추가해야 함
   */
  async updateNickname(userId: bigint, dto: UpdateNicknameRequestDto) {
    const nickname = dto.nickname.trim();

    const nicknameAlreadyExists = await this.prisma.user.findFirst({
      where: { nickname, NOT: { id: userId } },
      select: { id: true },
    });
    if (nicknameAlreadyExists) {
      throw new ConflictException('이미 사용 중인 닉네임입니다.');
    }

    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { nickname },
      });
    } catch (e: unknown) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // P2002: Prisma unique constraint violation (중복 닉네임)
        if (e?.code === 'P2002') {
          throw new ConflictException('이미 사용 중인 닉네임입니다.');
        }
      }
      throw e;
    }

    return { message: '닉네임이 변경되었습니다.' };
  }

  /**
   * 내 프로필 이미지 수정/삭제
   * - null → 삭제
   */
  async updateProfileImage(userId: bigint, dto: UpdateProfileImageRequestDto) {
    if (!('profileImage' in dto)) {
      return { message: '변경 사항이 없습니다.' };
    }

    // null → 삭제, string → trim 후 저장
    const next =
      dto.profileImage === null
        ? null
        : typeof dto.profileImage === 'string'
          ? dto.profileImage.trim()
          : dto.profileImage;

    await this.prisma.user.update({
      where: { id: userId },
      data: { profileImage: next },
    });

    return {
      message: next ? '프로필 이미지가 업데이트되었습니다.' : '프로필 이미지가 삭제되었습니다.',
    };
  }
}
