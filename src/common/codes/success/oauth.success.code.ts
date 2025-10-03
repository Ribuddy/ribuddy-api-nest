import { HttpStatus } from '@nestjs/common';

import { CustomSuccessCode } from '@common/codes/code.type';

export class OAuthSuccessCode {
  public static readonly REGISTER_NEEDED: CustomSuccessCode = {
    code: 'OAUTH0001',
    status: HttpStatus.OK,
    message:
      'OAuth 로그인을 성공했으나, 본 서비스 사용자가 아닙니다. 발급된 RegisterToken을 이용해서 회원가입을 진행해주세요.',
  };

  public static readonly OAUTH_LOGIN_SUCCESS: CustomSuccessCode = {
    code: 'OAUTH0002',
    status: HttpStatus.OK,
    message: '요청이 정상적으로 처리되었습니다.',
  };
}
