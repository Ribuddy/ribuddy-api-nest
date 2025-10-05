import { Injectable } from '@nestjs/common';

import { CustomException } from '@common/codes/custom.exception';
import { UserErrorCode } from '@common/codes/error/user.error.code';

import { PrismaService } from '@modules/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 내 정보 조회
   */
  async getUserInfo(userId: bigint) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new CustomException(UserErrorCode.NO_USER);
    }

    return { ...user, id: user.id.toString() };
  }

  async deleteUser(userId: bigint) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
