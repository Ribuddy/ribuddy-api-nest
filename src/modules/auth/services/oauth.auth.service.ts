import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TokenAuthService } from '@modules/auth/services/token.auth.service';
import { OAuthUserService } from '@modules/users/services/oauth.users.service';
import { GoogleOAuthUserData } from '@modules/users/types/oauth.users.types';

@Injectable()
export class OAuthAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly oauthUserService: OAuthUserService,
    private readonly tokenAuthService: TokenAuthService,
  ) {}

  async googleOAuthLoginOrRegister(googleData: GoogleOAuthUserData) {
    const user = await this.oauthUserService.getUserByOAuth(googleData);

    if (!user) {
      const newUserId = await this.oauthUserService.createOAuthUserWithGoogle(googleData);
      return this.tokenAuthService.generateTokens(newUserId);
    } else {
      return this.tokenAuthService.generateTokens(user.userId);
    }
  }
}
