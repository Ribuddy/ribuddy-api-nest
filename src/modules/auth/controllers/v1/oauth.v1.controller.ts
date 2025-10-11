import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';

import { Public } from '@modules/auth/decorators/public.decorator';
import { OAUTH_CALLBACK, OAUTH_LOGIN } from '@modules/auth/docs/oauth.docs';
import { GoogleOAuthGuard } from '@modules/auth/guards/google-oauth.guard';
import { GoogleOAuthService } from '@modules/auth/services/google-oauth.auth.service';
import { OAuthAuthService } from '@modules/auth/services/oauth.auth.service';

@Controller({
  version: '1',
  path: 'auth',
})
@ApiTags(API_TAGS.OAUTH)
@ApiBearerAuth()
export class OAuthV1Controller {
  constructor(private readonly googleService: GoogleOAuthService) {}

  @ApiOperation(OAUTH_LOGIN('Google', '/auth/google/login'))
  @ApiResponse({
    status: 302,
  })
  @Public()
  @UseGuards(GoogleOAuthGuard)
  @ApiQuery({
    name: 'code',
    required: false,
  })
  @Get('google/login')
  googleLogin() {}
  //  http://localhost:7777/v1/auth/google/login

  @ApiOperation(OAUTH_CALLBACK('Google'))
  @Public()
  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(@Request() req: any) {
    // console.log('Google OAuth Callback:', req.user);

    return await this.googleService.googleOAuthLoginOrRegister(req.user);
  }
}
