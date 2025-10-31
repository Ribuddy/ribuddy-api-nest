import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';

import { Public } from '@modules/auth/decorators/public.decorator';
import { GoogleOAuthGuard } from '@modules/auth/guards/google-oauth.guard';
import { GoogleOAuthService } from '@modules/auth/services/google-oauth.auth.service';

@Controller({
  version: '1',
  path: 'auth',
})
@ApiTags(API_TAGS.OAUTH)
@ApiBearerAuth()
export class OAuthV1Controller {
  constructor(private readonly googleService: GoogleOAuthService) {}

  @ApiOperation({
    summary: '[OAuth] Google 로그인 v1',
    description:
      'Google OAuth 2.0 로그인 입니다.\n' +
      'Passport의 전략을 그대로 따라가며, 기본적으로 Web 클라이언트를 위한 API 입니다.',
    deprecated: true,
  })
  @ApiResponse({
    status: 302,
  })
  @Public()
  @UseGuards(GoogleOAuthGuard)
  @Get('google/login')
  googleLogin() {}
  //  http://localhost:7777/v1/auth/google/login

  @ApiOperation({
    summary: '[OAuth] Google 로그인 Callback v1',
    description: 'Passport 단에서 자동으로 Redirect 되는 v1 Callback 입니다.',
    deprecated: true,
  })
  @Public()
  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(@Request() req: any) {
    // console.log('Google OAuth Callback:', req.user);

    return await this.googleService.googleOAuthLoginOrRegister(req.user);
  }
}
