import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

import { OAuth2Client } from 'google-auth-library';

import { CustomException } from '@common/codes/custom.exception';
import { AuthErrorCode } from '@common/codes/error/auth.error.code';

import { GOOGLE_OAUTH_CONFIG, GoogleOAuthConfig } from '@modules/auth/config/google-oauth-config';

@Injectable()
export class GoogleOAuthService {
  private readonly client: OAuth2Client;
  private readonly googleConfig: ConfigType<typeof GoogleOAuthConfig>;

  constructor(private readonly configService: ConfigService) {
    this.googleConfig =
      this.configService.getOrThrow<ConfigType<typeof GoogleOAuthConfig>>(GOOGLE_OAUTH_CONFIG);
    this.client = new OAuth2Client({
      clientId: this.googleConfig.clientId,
      clientSecret: this.googleConfig.clientSecret,
      redirectUri: this.googleConfig.callbackURL,
    });
  }

  async verifyGoogleToken(idToken: string) {
    const client = new OAuth2Client(this.googleConfig.clientId);

    try {
      // 1. verifyIdToken 메서드 호출
      const ticket = await client.verifyIdToken({
        idToken: idToken,
        // audience: this.googleConfig.clientId, // 내 앱의 클라이언트 ID
      });

      // 2. 검증 성공 시 페이로드(사용자 정보) 반환
      const payload = ticket.getPayload();
      if (payload) {
        const userId = payload['sub']; // 사용자의 고유 Google ID
        const email = payload['email'];
        console.log('Google User ID:', userId);
        return payload;
      }
    } catch (error) {
      // 3. 검증 실패 시 (서명 불일치, 만료 등) 에러 발생
      console.error('Token verification failed:', error);
      throw new CustomException(AuthErrorCode.INVALID_GOOGLE_ID_TOKEN);
    }
  }

  async getToken() {
    // this.client.getToken()
    return this.client.generateAuthUrl({
      redirect_uri: 'http://localhost:7777/test/basic/mirror',
      scope: ['profile'],
    });
  }
}
