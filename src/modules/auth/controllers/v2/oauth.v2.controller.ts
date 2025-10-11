import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';

import { Public } from '@modules/auth/decorators/public.decorator';
import { OAUTH_CALLBACK } from '@modules/auth/docs/oauth.docs';
import { GoogleOAuthDto } from '@modules/auth/dto/google.oauth.dto';
import { GoogleOAuthService } from '@modules/auth/services/google-oauth.auth.service';

@Controller({
  version: '2',
  path: 'auth',
})
@ApiTags(API_TAGS.OAUTH)
@ApiBearerAuth()
export class OAuthV2Controller {
  constructor(private readonly googleService: GoogleOAuthService) {}

  //  http://localhost:7777/v1/auth/google/login

  @ApiOperation(OAUTH_CALLBACK('Google'))
  @Public()
  @Post('google/login')
  async googleLoginWithToken(@Body() req: GoogleOAuthDto) {
    // console.log('Google OAuth Callback:', req.user);

    return req;
  }

  @Public()
  @Post('google/verify-id-token')
  async verifyIdToken(@Body() req: GoogleOAuthDto) {
    return this.googleService.verifyGoogleToken(req.idToken);
  }

  @Public()
  @Get('test')
  test() {
    return this.googleService.getToken();
  }
}
