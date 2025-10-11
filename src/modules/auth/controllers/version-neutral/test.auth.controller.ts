import { Controller, Get, Query, Req, UseGuards, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { API_TAGS } from '@common/constants/api-tags.constants';
import { ResponseMessage } from '@common/decorators/response/response-message.decorator';

import { REFRESH_JWT_CONFIG } from '@modules/auth/config/refresh-jwt.config';
import { Public } from '@modules/auth/decorators/public.decorator';
import { TokenAuthService } from '@modules/auth/services/token.auth.service';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'auth/test',
})
@ApiTags(API_TAGS.TEST)
@ApiBearerAuth()
export class AuthTestController {
  constructor(
    private readonly authService: TokenAuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: '토큰 검증 API',
    description: 'GET 요청을 보냈을 때 JwtGuard를 통과했는지 확인합니다.',
  })
  @Get('protected')
  @ResponseMessage('JWT Guard를 Pass 했습니다.')
  async tokenCheck(@Req() req) {
    const { userId, name, nickname } = req.user;

    return {
      userId: userId.toString(),
      name,
      nickname,
    };
  }

  @Get('refresh-jwt')
  getRefresh() {
    return this.configService.getOrThrow(REFRESH_JWT_CONFIG);
  }

  @ApiOperation({
    summary: '테스트 토큰 생성 API',
    description: 'Query String으로 userId를 첨부하세요.',
  })
  @ApiQuery({
    name: 'userId',
    required: true,
    description: '토큰을 생성할 사용자 ID',
    example: '1',
  })
  @Public()
  @Get('token')
  async getTestToken(@Query('userId') userId: string) {
    return this.authService.generateTokens(BigInt(userId));
  }

  @Get('cookie')
  @Public()
  checkCookie(@Req() req: Request) {
    return req.cookies;
  }
}
