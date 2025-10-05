import {
  GoogleOAuthUserData,
  KakaoUserData,
  OAuthUserInfo,
} from '@modules/users/types/oauth.users.types';

export interface AccessTokenJwtPayload {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export type RegisterJwtPayload = GoogleOAuthUserData | KakaoUserData;
