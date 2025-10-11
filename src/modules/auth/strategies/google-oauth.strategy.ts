import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { GoogleOAuthConfig } from '@modules/auth/config/google-oauth-config';
import { GOOGLE_OAUTH_STRATEGY } from '@modules/auth/strategies/strategy.constants';
import { GoogleOAuthUserData, OAuthProvider } from '@modules/users/types/oauth.users.types';

@Injectable()
export class GoogleOAuthStrategy extends PassportStrategy(Strategy, GOOGLE_OAUTH_STRATEGY) {
  constructor(
    @Inject(GoogleOAuthConfig.KEY)
    private readonly googleOAuthConfig: ConfigType<typeof GoogleOAuthConfig>,
  ) {
    super({
      clientID: googleOAuthConfig.clientId,
      clientSecret: googleOAuthConfig.clientSecret,
      callbackURL: googleOAuthConfig.v1CallbackUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    __accessToken: string,
    __refreshToken: string,
    profile: {
      id: string;
      displayName: string;
      name: { familyName: string | undefined; givenName: string | undefined };
      emails: { value: string }[];
      photos: { value: string }[];
      _raw: string;
    },
    done: VerifyCallback,
  ) {
    console.log(__accessToken, '!!!!!', __refreshToken, profile);
    // console.log('Google OAUTH PROFILE:', profile);
    // console.log('Google ID Token Raw', profile._raw);
    // console.log('Google ID params', params);

    const user: GoogleOAuthUserData = {
      oauthProvider: OAuthProvider.GOOGLE,
      oauthId: profile.id,
      // Google 측에서 제공하는 이름, 성/이름 구분이 있음.
      // 둘 다 없는 경우 No Name으로 처리
      name: `${profile.name.givenName ?? ''} ${profile.name.familyName ?? ''}`.trim() ?? 'No Name',
      displayName: profile.displayName,
      profileImage: profile.photos[0].value,
    };

    // ✅ done(에러, 사용자_객체) 형태로 호출합니다.
    done(null, user);
    //  http://localhost:7777/v1/auth/google/login
  }
}
