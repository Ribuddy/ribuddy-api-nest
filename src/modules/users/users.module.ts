import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { FrontendUrlConfig } from '@modules/auth/config/frontend-url.config';
import { JwtConfig } from '@modules/auth/config/jwt.config';
import { RefreshJwtConfig } from '@modules/auth/config/refresh-jwt.config';
import { RegisterJwtConfig } from '@modules/auth/config/register-jwt.config';
import { AuthService } from '@modules/auth/services/auth.service';
import { UsersV1Controller } from '@modules/users/controllers/v1/users.v1.controller';
import { OAuthUserService } from '@modules/users/services/oauth.users.service';
import { UsersService } from '@modules/users/services/users.service';

@Module({
  imports: [
    JwtModule.registerAsync(JwtConfig.asProvider()),
    // ConfigModule.forFeature(RefreshJwtConfig),
    // ConfigModule.forFeature(RegisterJwtConfig),
    // ConfigModule.forFeature(FrontendUrlConfig),
  ],
  controllers: [UsersV1Controller],
  providers: [UsersService, OAuthUserService, AuthService],
  exports: [UsersService, OAuthUserService],
})
export class UsersModule {}
