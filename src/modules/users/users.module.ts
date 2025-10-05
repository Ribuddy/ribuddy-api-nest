import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JwtConfig } from '@modules/auth/config/jwt.config';
import { UsersV1Controller } from '@modules/users/controllers/v1/users.v1.controller';
import { OAuthUserService } from '@modules/users/services/oauth.users.service';
import { UsersService } from '@modules/users/services/users.service';

@Module({
  imports: [JwtModule.registerAsync(JwtConfig.asProvider())],
  controllers: [UsersV1Controller],
  providers: [UsersService, OAuthUserService],
  exports: [UsersService, OAuthUserService],
})
export class UsersModule {}
