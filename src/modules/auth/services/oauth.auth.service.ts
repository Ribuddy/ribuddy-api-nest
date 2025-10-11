import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

import { GOOGLE_OAUTH_CONFIG, GoogleOAuthConfig } from '@modules/auth/config/google-oauth-config';
import { TokenAuthService } from '@modules/auth/services/token.auth.service';
import { OAuthUserService } from '@modules/users/services/oauth.users.service';

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
}
