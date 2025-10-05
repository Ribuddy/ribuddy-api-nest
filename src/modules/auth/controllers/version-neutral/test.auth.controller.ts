import { Controller, Get, Query, Req, UseGuards, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';

import { ResponseMessage } from '@common/decorators/response/response-message.decorator';

import { Public } from '@modules/auth/decorators/public.decorator';
import { AuthService } from '@modules/auth/services/auth.service';

@Controller({
  version: VERSION_NEUTRAL,
  path: 'auth/test',
})
@ApiTags('Test API')
export class AuthTestController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: '토큰 검증 API',
    description: 'GET 요청을 보냈을 때 JwtGuard를 통과했는지 확인합니다.',
  })
  @ApiBearerAuth()
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
    return this.configService.getOrThrow('refresh-jwt');
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
  @ApiBearerAuth()
  @Public()
  checkCookie(@Req() req: Request) {
    return req.cookies;
  }
}
