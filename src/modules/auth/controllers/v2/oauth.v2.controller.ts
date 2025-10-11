import { Body, Controller, Get, Post, Query, Req, Res, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

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
    const googleUser = await this.googleService.verifyGoogleToken(req.idToken);
    return this.googleService.googleOAuthLoginOrRegister(googleUser);
  }

  @Public()
  @Post('google/verify-id-token')
  async verifyIdToken(@Body() req: GoogleOAuthDto) {
    return this.googleService.verifyGoogleToken(req.idToken);
  }

  // http://localhost:7777/v3/auth/google/login
  @Public()
  @Version('3')
  @Get('google/login')
  manualGoogleLogin(@Res() res: Response) {
    res.redirect(this.googleService.getGoogleOAuthUrlV3());
  }

  @Public()
  @Version('3')
  @Get('google/callback')
  manualGoogleCallback(@Query() query: any) {
    return this.googleService.getGoogleTokenV3(query.code);
  }
}
