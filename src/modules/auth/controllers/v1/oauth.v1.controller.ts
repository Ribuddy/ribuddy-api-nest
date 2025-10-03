import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { BypassResponseInterceptor } from '@common/decorators/bypass-response-interceptor.decorator';

import { Public } from '@modules/auth/decorators/public.decorator';
import { OAUTH_CALLBACK, OAUTH_LOGIN, OAUTH_REGISTER } from '@modules/auth/docs/oauth.docs';
import { GoogleOAuthGuard } from '@modules/auth/guards/google-oauth.guard';
import { RegisterJwtGuard } from '@modules/auth/guards/register-jwt.guard';
import { KakaoAuthService } from '@modules/auth/services/kakao-oauth.auth.service';
import { CreateOAuthUserRequestDto } from '@modules/users/dto/user.dto';
import { OAuthUserService } from '@modules/users/services/oauth.users.service';

@Controller({
  version: '1',
  path: 'auth',
})
export class OAuthV1Controller {
  constructor(
    private readonly oauthUserService: OAuthUserService,
    private readonly kakaoUserService: KakaoAuthService,
  ) {}

  @ApiOperation(OAUTH_REGISTER)
  @ApiHeader({
    name: 'RegisterToken', // 실제 헤더의 key
    description: 'Bearer Token이 아닌, RegisterToken 평문 그대로 요청을 보내주세요.',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @Public()
  @UseGuards(RegisterJwtGuard)
  @Post('oauth/register')
  async oauthRegister(@Req() req, @Body() user: CreateOAuthUserRequestDto) {
    console.log(user);
    return this.oauthUserService.createOAuthUser({ ...req.user, ...user });
  }

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
    console.log('Google OAuth Callback:', req.user);

    const result = await this.oauthUserService.oauthLoginOrRegister(req.user);

    return result;
  }

  @ApiOperation(OAUTH_LOGIN('Kakao', '/auth/kakao/login'))
  @ApiResponse({
    status: 302,
  })
  @Public()
  @Redirect()
  @Get('kakao/login')
  @BypassResponseInterceptor()
  kakaoLogin() {
    //  http://localhost:7777/v1/auth/kakao/login
    //  https://api.peekle.kr/v1/auth/kakao/login
    return this.kakaoUserService.getKakaoRedirectUrl();
  }

  @ApiOperation(OAUTH_CALLBACK('Kakao'))
  @Public()
  @Get('kakao/callback')
  async kakaoCallback(@Query('code') code: string) {
    this.kakaoUserService.checkAuthorizationCode(code);
    const kakaoAccessToken = await this.kakaoUserService.getKakaoAccessToken(code);
    const kakaoUserInfo = await this.kakaoUserService.getKakaoUserInfo(kakaoAccessToken);

    const result = await this.oauthUserService.oauthLoginOrRegister(kakaoUserInfo);

    // const url = this.oauthUserService.getFrontendOAuthCallbackUrl();
    // console.log('Redirect URL:', url, result);

    return result;
  }
}
