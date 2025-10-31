import { Body, Controller, Get, Post, Query, Req, Res, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { API_TAGS } from '@common/constants/api-tags.constants';

import { Public } from '@modules/auth/decorators/public.decorator';
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

  @ApiOperation({
    summary: '[OAuth] Google 로그인 v2',
    description:
      'Google OAuth 2.0 로그인 입니다.\n' +
      'AN에서 Google 측에서 발급받은 id token을 전송하면, 해당 id token을 검증하고 사용자 정보를 반환해줍니다.  ' +
      '따로 Callback은 존재하지 않습니다.',
  })
  @Public()
  @Post('google/login')
  async googleLoginWithToken(@Body() req: GoogleOAuthDto) {
    // console.log('Google OAuth Callback:', req.user);
    const googleUser = await this.googleService.verifyGoogleToken(req.idToken);
    return this.googleService.googleOAuthLoginOrRegister(googleUser);
  }

  @ApiOperation({
    summary: '[테스트용] Google id Token 검증',
    description:
      'Google에서 발급한 id token의 유효성을 검증 후에, id token에 담긴 정보를 반환해줍니다.  ',
  })
  @ApiTags(API_TAGS.TEST)
  @Public()
  @Post('google/verify-id-token')
  async verifyIdToken(@Body() req: GoogleOAuthDto) {
    return this.googleService.verifyGoogleToken(req.idToken);
  }

  // http://localhost:7777/v3/auth/google/login
  @Public()
  @ApiOperation({
    summary: '[OAuth] Google 로그인 v3',
    description:
      'Google OAuth 2.0 로그인 입니다.\n' +
      'v1과 기본적으로 동일하며, Passport 기반이 아닌 Google SDK 기반으로 구현되어 있습니다.  ' +
      'AN에서 따로 사용하지 않습니다.',
    deprecated: true,
  })
  @Version('3')
  @Get('google/login')
  manualGoogleLogin(@Res() res: Response) {
    res.redirect(this.googleService.getGoogleOAuthUrlV3());
  }

  @Public()
  @ApiOperation({
    summary: '[OAuth] Google 로그인 Callback v3',
    description:
      'Google OAuth 2.0 로그인 처리를 위한 Callback 입니다.\n' +
      'v1과 기본적으로 동일하며, Passport 기반이 아닌 Google SDK 기반으로 구현되어 있습니다.  ' +
      'AN에서 따로 사용하지 않습니다.',
    deprecated: true,
  })
  @Version('3')
  @Get('google/callback')
  manualGoogleCallback(@Query() query: any) {
    return this.googleService.getGoogleTokenV3(query.code);
  }
}
