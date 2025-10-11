import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

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
    // Note: 여기에 RequestContext를 주입했었으나, 순환의존성 및 알 수 없는 버그 발생으로 제거하였습니다.
    // 향후 작업 시 주의하세요.
    configService: ConfigService,
    private authService: TokenAuthService,
  ) {
    const jwtConfig = configService.getOrThrow<ConfigType<typeof JwtConfig>>(JWT_CONFIG);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
      ignoreExpiration: false,
    });
  }

  validate(payload: AccessTokenJwtPayload) {
    const userId = BigInt(payload.userId);
    // console.log('Validated user ID:', userId);

    return this.authService.validateJwtUser(userId);
  }
}
