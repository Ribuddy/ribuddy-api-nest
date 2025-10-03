import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { Public } from '@modules/auth/decorators/public.decorator';
import { OAUTH_CALLBACK, OAUTH_LOGIN } from '@modules/auth/docs/oauth.docs';
import { GoogleOAuthGuard } from '@modules/auth/guards/google-oauth.guard';
import { OAuthUserService } from '@modules/users/services/oauth.users.service';

@Controller({
  version: '1',
  path: 'auth',
})
export class OAuthV1Controller {
  constructor(private readonly oauthUserService: OAuthUserService) {}

  @ApiOperation(OAUTH_LOGIN('Google', '/auth/google/login'))
  @ApiResponse({
    status: 302,
  })
  @Public()
  @UseGuards(GoogleOAuthGuard)
  @Get('google/login')
  googleLogin() {}
  //  http://localhost:7777/v1/auth/google/login

  @ApiOperation(OAUTH_CALLBACK('Google'))
  @Public()
  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(@Request() req: any) {
    // console.log('Google OAuth Callback:', req.user);

    return await this.oauthUserService.googleOAuthLoginOrRegister(req.user);
  }
}
