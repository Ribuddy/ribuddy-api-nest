import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserProfileResponseDto } from '@modules/users/dto/user.dto';
// 임시 유저 식별 (JWT 붙기 전까지 mock 헤더 사용)

import { UsersService } from '@modules/users/services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersV1Controller {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '[WIP] 내 정보 조회' })
  @ApiOkResponse({
    description: '내 정보 조회 성공',
    type: UserProfileResponseDto,
  })
  @Get('me')
  getUserInfo(@Req() req) {
    return this.usersService.getUserInfo(req.user);
  }
}
