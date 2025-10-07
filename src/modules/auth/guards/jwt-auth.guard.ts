import { ExecutionContext, Inject, Injectable, LoggerService } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';

import { CustomException } from '@common/codes/custom.exception';
import { JwtErrorCode } from '@common/codes/error/jwt.error.code';
import { inspectObject } from '@common/utils/inspect-object.util';

import { RequestContextService } from '@modules/als/services/request-context.service';
import { IS_PUBLIC_KEY } from '@modules/auth/decorators/public.decorator';
import { JWT_STRATEGY } from '@modules/auth/strategies/strategy.constants';
import { AccessTokenJwtPayload } from '@modules/auth/types/jwt.types';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_STRATEGY) {
  constructor(
    private readonly reflector: Reflector,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    private readonly requestContextService: RequestContextService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }

  handleRequest(err, user: any, info: unknown, context: ExecutionContext) {
    // info: 토큰 자체에 대한 정보(예: 만료, 형식 오류)
    // err: Strategy의 validate 메소드에서 발생시킨 에러
    // user: validate 메소드가 성공적으로 유저 객체를 반환했을 때의 값
    // console.log(err, user, info);

    // 토큰이 없는 경우나 기타 Error 발생 시 NO_TOKEN 에러 반환
    if (info instanceof Error) {
      this.logger.log(`[JWT ERROR]: ${inspectObject(info)}`);
      throw new CustomException(JwtErrorCode.NO_TOKEN);
    }
    // 토큰 자체의 에러 확인 (만료, 잘못된 형식 등)
    else if (info instanceof JsonWebTokenError) {
      // 만료된 토큰인 경우
      if (info instanceof TokenExpiredError) {
        throw new CustomException(JwtErrorCode.EXPIRED_TOKEN);
      }
      // 아직 활성화되지 않은 토큰인 경우
      else if (info instanceof NotBeforeError) {
        throw new CustomException(JwtErrorCode.NOT_ACTIVATED_TOKEN);
      }
      // 그 외 : 토큰 서명이 잘못되었거나 형식이 잘못된 경우
      throw new CustomException(JwtErrorCode.INVALID_TOKEN);
    }

    // err가 존재하는 경우 :
    // Strategy의 validate 메소드에서 발생시킨 에러 확인
    if (err) {
      this.logger.error(`[JWT STRATEGY VALIDATION ERR]: ${inspectObject(err)}`);
      throw new CustomException(JwtErrorCode.STRATEGY_VALIDATION_ERROR);
      // throw err; // validate에서 던진 커스텀 에러를 그대로 다시 던짐
    }

    // 유저 정보가 없는 경우 :
    // Jwt 검증을 통과했으나 사용자 정보가 없는 경우
    // secret key leak를 의심해볼 수 있음.
    if (!user) {
      this.logger.error('FATAL ERROR: JWT SECRET LEAK');
      throw new CustomException(JwtErrorCode.SECRET_LEAK);
    }

    const payload: AccessTokenJwtPayload = user;

    // 검증을 통과했다면, RequestContext에 userId를 설정
    this.requestContextService.setUserId(BigInt(payload.userId));

    // 모든 검증을 통과하면 user 객체를 반환
    return user;
  }
}
