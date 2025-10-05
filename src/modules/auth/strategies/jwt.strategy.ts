import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { RequestContext } from '@common/context/reqeust.context';
import { REQUEST_CONTEXT } from '@common/middleware/request-context.middleware';

import { JWT_CONFIG, JwtConfig } from '@modules/auth/config/jwt.config';
import { TokenAuthService } from '@modules/auth/services/token.auth.service';
import { JWT_STRATEGY } from '@modules/auth/strategies/strategy.constants';
import { AccessTokenJwtPayload } from '@modules/auth/types/jwt.types';

/**
 * JWT를 이용한 Guard 입니다.
 *
 * Passport의 jwt strategy에 활용됩니다.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY) {
  constructor(
    configService: ConfigService,
    // @Inject(REQUEST_CONTEXT)
    // private readonly requestContext: RequestContext,
    private authService: TokenAuthService,
  ) {
    const jwtConfig = configService.getOrThrow<ConfigType<typeof JwtConfig>>(JWT_CONFIG);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
      ignoreExpiration: false,
    });

    console.log('JWT Strategy initialized');
  }

  validate(payload: AccessTokenJwtPayload) {
    const userId = BigInt(payload.userId);
    // this.requestContext.setUserId(userId);
    console.log('Validated user ID:', userId);

    return this.authService.validateJwtUser(userId);
  }
}
