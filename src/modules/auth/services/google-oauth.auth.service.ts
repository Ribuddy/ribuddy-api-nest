import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

import { OAuth2Client } from 'google-auth-library';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { CustomException } from '@common/codes/custom.exception';
import { AuthErrorCode } from '@common/codes/error/auth.error.code';

import { GOOGLE_OAUTH_CONFIG, GoogleOAuthConfig } from '@modules/auth/config/google-oauth-config';
import { TokenAuthService } from '@modules/auth/services/token.auth.service';
import { OAuthUserService } from '@modules/users/services/oauth.users.service';
import { GoogleOAuthUserData, OAuthProvider } from '@modules/users/types/oauth.users.types';

@Injectable()
export class GoogleOAuthService {
  private readonly client: OAuth2Client;
  private readonly googleConfig: ConfigType<typeof GoogleOAuthConfig>;

  constructor(
    private readonly configService: ConfigService,
    private readonly oauthUserService: OAuthUserService,
    private readonly tokenAuthService: TokenAuthService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {
    this.googleConfig =
      this.configService.getOrThrow<ConfigType<typeof GoogleOAuthConfig>>(GOOGLE_OAUTH_CONFIG);
    this.client = new OAuth2Client({
      clientId: this.googleConfig.clientId,
      clientSecret: this.googleConfig.clientSecret,
      redirectUri: this.googleConfig.v1CallbackUrl,
    });
  }

  async verifyGoogleToken(idToken: string) {
    const client = new OAuth2Client(this.googleConfig.clientId);

    const ticket = await client.verifyIdToken({ idToken });

    const payload = ticket.getPayload();
    if (!payload) throw new CustomException(AuthErrorCode.INVALID_GOOGLE_ID_TOKEN);

    const user: GoogleOAuthUserData = {
      oauthProvider: OAuthProvider.GOOGLE,
      oauthId: payload.sub,
      name: `${payload.family_name ?? ''} ${payload.given_name ?? ''}`.trim() ?? '알수없음',
      displayName: payload.name ?? '알수없음',
      profileImage: payload.picture ?? '',
    };

    // TODO: 제거 바람
    this.logger.log(payload);

    return user;
  }

  getGoogleOAuthUrlV3() {
    // this.client.getToken()
    return this.client.generateAuthUrl({
      redirect_uri: this.googleConfig.v3CallbackUrl,
      scope: ['profile', 'email'],
      access_type: 'offline',
      prompt: 'consent',
    });
  }

  getGoogleTokenV3(code: string) {
    return this.client.getToken({
      code: code,
      redirect_uri: this.googleConfig.v3CallbackUrl,
    });
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
