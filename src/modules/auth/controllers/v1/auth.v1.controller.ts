import { Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCookieAuth, ApiOperation } from '@nestjs/swagger';

import { ResponseMessage } from '@common/decorators/response/response-message.decorator';

import { RegisterJwtGuard } from '@modules/auth/guards/register-jwt.guard';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthV1Controller {
  constructor() {}

  @UseGuards(RegisterJwtGuard)
  @ApiBearerAuth()
  @Post('token/reissue')
  @ApiOperation({
    summary: '[WIP] RefreshToken을 이용한 AccessToken 재발급',
    description: `RefreshToken을 이용하여 AccessToken을 재발급 합니다.
    \n요청 시, Header의 RefreshToken에 이전에 발급받은 RefreshToken을 넣어서 요청해주세요.`,
  })
  reissueToken() {
    // TODO: RT를 이용한 AT 재발급 기능 추가 필요, Cookie로 RT 받나요 ? (2025-09-14)
    return;
  }

  @Delete('logout')
  @ResponseMessage('성공적으로 로그아웃 되었습니다.')
  @ApiOperation({
    summary: '[WIP] 로그아웃 API',
    description: `로그아웃 API 입니다. FE 단에서 보유하고 있는 credential는 직접 삭제해주셔야 합니다.
    \n요청 시, RefreshToken을 Header의 RefreshToken에 넣어서 요청해주세요.
    \n올바르지 않은 RefreshToken일 경우 401 Unauthorized 에러가 발생합니다.`,
  })
  logout() {
    // TODO: 쿠키 삭제 추가 & RT 무효화 기능 추가 & RT를 관리할 DB Table 설계 필요 (2025-09-14)
    return;
  }
}
