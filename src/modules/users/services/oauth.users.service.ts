import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { FrontendUrlConfig } from '@modules/auth/config/frontend-url.config';
import { AuthService } from '@modules/auth/services/auth.service';
import { PrismaService } from '@modules/prisma/prisma.service';
import { GoogleOAuthUserData, OAuthUserInfo } from '@modules/users/types/oauth.users.types';

@Injectable()
export class OAuthUserService {
  constructor(
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService,
    @Inject(FrontendUrlConfig.KEY)
    private readonly frontendUrlConfig: ConfigType<typeof FrontendUrlConfig>,
  ) {}

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

  async googleOAuthLoginOrRegister(googleData: GoogleOAuthUserData) {
    const user = await this.getUserByOAuth(googleData);

    if (!user) {
      const newUserId = await this.createOAuthUserWithGoogle(googleData);
      return this.authService.generateTokens(newUserId);
    } else {
      return this.authService.generateTokens(user.userId);
    }
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

  getFrontendOAuthCallbackUrl() {
    let baseUrl: string;
    if (process.env.NODE_ENV === 'production') {
      baseUrl = this.frontendUrlConfig.prodUrl;
    } else if (process.env.NODE_ENV === 'development') {
      baseUrl = this.frontendUrlConfig.devUrl;
    } else {
      baseUrl = this.frontendUrlConfig.localUrl;
    }

    return baseUrl + '/auth/oauth/callback';
    //  return 'http://localhost:3000/auth/oauth/callback';
  }
}
