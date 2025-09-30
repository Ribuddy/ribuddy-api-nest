import { Body, Controller, Get, Patch, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

// 임시 유저 식별 (JWT 붙기 전까지 mock 헤더 사용)

import {
  GetMyProfileResponseDto,
  UpdateNicknameRequestDto,
  UpdateProfileImageRequestDto,
} from '@modules/users/dto/user.dto';
import { UsersService } from '@modules/users/services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersV1Controller {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '내 정보 조회' })
  @ApiOkResponse({ type: GetMyProfileResponseDto })
  @Get('me')
  getUserInfo(@Req() { userId }): Promise<GetMyProfileResponseDto> {
    return this.usersService.getUserInfo(userId);
  }

  @ApiOperation({ summary: '내 정보 - 닉네임 수정' })
  @Patch('me/nickname')
  updateNickname(@Req() { userId }, @Body() body: UpdateNicknameRequestDto) {
    return this.usersService.updateNickname(userId, body);
  }

  @ApiOperation({ summary: '내 정보 - 프로필 이미지 수정/삭제' })
  @Patch('me/profile-image')
  updateProfileImage(@Req() { userId }, @Body() body: UpdateProfileImageRequestDto) {
    return this.usersService.updateProfileImage(userId, body);
  }
}
