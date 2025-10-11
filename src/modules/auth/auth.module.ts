import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtConfig } from '@modules/auth/config/jwt.config';
import { AuthV1Controller } from '@modules/auth/controllers/v1/auth.v1.controller';
import { OAuthV1Controller } from '@modules/auth/controllers/v1/oauth.v1.controller';
import { OAuthV2Controller } from '@modules/auth/controllers/v2/oauth.v2.controller';
import { AuthTestController } from '@modules/auth/controllers/version-neutral/test.auth.controller';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { GoogleOAuthService } from '@modules/auth/services/google-oauth.auth.service';
import { KakaoAuthService } from '@modules/auth/services/kakao-oauth.auth.service';
import { OAuthAuthService } from '@modules/auth/services/oauth.auth.service';
import { TokenAuthService } from '@modules/auth/services/token.auth.service';
import { GoogleOAuthStrategy } from '@modules/auth/strategies/google-oauth.strategy';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import { RegisterJwtStrategy } from '@modules/auth/strategies/register.jwt.strategy';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [UsersModule, JwtModule.registerAsync(JwtConfig.asProvider())],
  controllers: [AuthV1Controller, OAuthV1Controller, OAuthV2Controller, AuthTestController],
  providers: [
    // Services
    TokenAuthService,
    KakaoAuthService,
    OAuthAuthService,
    GoogleOAuthService,
    // Strategies
    JwtStrategy,
    GoogleOAuthStrategy,
    RegisterJwtStrategy,
    // Guards
    JwtAuthGuard,
  ],
  exports: [TokenAuthService, OAuthAuthService],
})
export class AuthModule {}
