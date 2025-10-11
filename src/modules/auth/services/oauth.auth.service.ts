import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

import { OAuth2Client } from 'google-auth-library';

import { GOOGLE_OAUTH_CONFIG, GoogleOAuthConfig } from '@modules/auth/config/google-oauth-config';
import { TokenAuthService } from '@modules/auth/services/token.auth.service';
import { OAuthUserService } from '@modules/users/services/oauth.users.service';
import { GoogleOAuthUserData } from '@modules/users/types/oauth.users.types';

@Injectable()
export class OAuthAuthService {
  private readonly googleConfig: ConfigType<typeof GoogleOAuthConfig>;

  constructor(
    private readonly configService: ConfigService,
    private readonly oauthUserService: OAuthUserService,
    private readonly tokenAuthService: TokenAuthService,
  ) {
    this.googleConfig =
      this.configService.getOrThrow<ConfigType<typeof GoogleOAuthConfig>>(GOOGLE_OAUTH_CONFIG);
  }

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
