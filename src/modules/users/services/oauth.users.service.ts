import { Injectable } from '@nestjs/common';

import { MySQLPrismaService } from '@modules/prisma/services/mysql.prisma.service';
import { GoogleOAuthUserData, OAuthUserInfo } from '@modules/users/types/oauth.users.types';

@Injectable()
export class OAuthUserService {
  constructor(private readonly prismaService: MySQLPrismaService) {}

  async getUserByOAuth(oauthData: OAuthUserInfo) {
    return this.prismaService.oAuthUser.findUnique({
      where: {
        oauthProvider_oauthId: {
          oauthProvider: oauthData.oauthProvider,
          oauthId: oauthData.oauthId,
        },
      },
    });
  }

  /**
   * Google OAuth 시에 제공되는 데이터를 기반으로 회원가입을 하는 로직입니다.
   *
   * transaction이 적용되어 있습니다.
   *
   * @returns 생성된 사용자의 ID를 반환합니다.
   */
  async createOAuthUserWithGoogle(googleUser: GoogleOAuthUserData): Promise<bigint> {
    const newUser = await this.prismaService.$transaction(async (txPrisma) => {
      const createdUser = await txPrisma.user.create({
        data: {
          name: googleUser.name,
          nickname: googleUser.displayName,
          profileImage: googleUser.profileImage,
        },
        select: { id: true },
      });

      await txPrisma.oAuthUser.create({
        data: {
          oauthProvider: googleUser.oauthProvider,
          oauthId: googleUser.oauthId,
          userId: BigInt(createdUser.id),
        },
      });

      return createdUser;
    });

    return newUser.id;
  }
}
