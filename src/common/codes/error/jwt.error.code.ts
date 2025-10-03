import { HttpStatus } from '@nestjs/common';

import { CustomErrorCode } from '@common/codes/code.type';

export class JwtErrorCode {
  public static readonly EXPIRED_TOKEN: CustomErrorCode = {
    code: 'JWT0001',
    status: HttpStatus.UNAUTHORIZED,
    message: 'JWT 토큰이 만료되었습니다.',
  };

  public static readonly INVALID_TOKEN: CustomErrorCode = {
    code: 'JWT0002',
    status: HttpStatus.UNAUTHORIZED,
    message: '유효하지 않은 JWT 토큰입니다.',
  };

  public static readonly NO_TOKEN: CustomErrorCode = {
    code: 'JWT0003',
    status: HttpStatus.UNAUTHORIZED,
    message:
      'JWT 토큰이 존재하지 않습니다. 토큰을 첨부한 경우 X-Trace-ID 값을 첨부하여 관리자에게 문의하세요.',
  };

  public static readonly INVALID_REFRESH_TOKEN: CustomErrorCode = {
    code: 'JWT0004',
    status: HttpStatus.UNAUTHORIZED,
    message: '유효하지 않은 리프레시 토큰입니다.',
  };

  public static readonly SECRET_LEAK: CustomErrorCode = {
    code: 'JWT0005',
    status: HttpStatus.SERVICE_UNAVAILABLE,
    message: 'JWT 토큰 결함입니다. 관리자에게 문의하세요.',
  };

  public static readonly NOT_ACTIVATED_TOKEN: CustomErrorCode = {
    code: 'JWT0006',
    status: HttpStatus.UNAUTHORIZED,
    message: 'JWT 토큰이 아직 활성화되지 않았습니다.',
  };

  public static readonly STRATEGY_VALIDATION_ERROR: CustomErrorCode = {
    code: 'JWT0007',
    status: HttpStatus.UNAUTHORIZED,
    message: 'JWT Strategy Validation이 실패하였습니다.',
  };
}
