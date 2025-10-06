import { Body, Controller, Delete, Get, Inject, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { CustomException } from '@common/codes/custom.exception';
import { CommonErrorCode } from '@common/codes/error/common.error.code';

import { RequestContextService } from '@modules/als/services/request-context.service';
import { EditUserProfileRequestDto, UserProfileResponseDto } from '@modules/users/dto/user.dto';
// 임시 유저 식별 (JWT 붙기 전까지 mock 헤더 사용)

import { UsersService } from '@modules/users/services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersV1Controller {
  constructor(
    private readonly usersService: UsersService,
    private readonly requestContextService: RequestContextService,
  ) {}

  @ApiOperation({ summary: '[WIP] 내 정보 조회' })
  @ApiOkResponse({
    description: '내 정보 조회 성공',
    type: UserProfileResponseDto,
  })
  @ApiBearerAuth()
  @Get('me')
  getUserInfo() {
    const userId = this.requestContextService.getOrThrowUserId();

    return this.usersService.getUserInfo(userId);
  }

  @ApiOperation({
    summary: '사용자를 삭제합니다. (탈퇴)',
    description: 'Soft Delete가 아닌, Hard Delete로 복구가 불가능하니 사용에 유의하세요.',
  })
  @Delete('delete')
  deleteUser() {
    const userId = this.requestContextService.getOrThrowUserId();

    if (!userId) {
      throw new CustomException(CommonErrorCode.REQUEST_CONTEXT_ERROR);
    }

    return this.usersService.deleteUser(userId);
  }

  @ApiOperation({
    summary: '사용자 정보를 수정합니다. 이름/닉네임/프로필 이미지 를 수정할 수 있습니다.',
    description: 'AccessToken으로 사용자를 식별합니다.',
  })
  @ApiBearerAuth()
  @Post('edit')
  async editUser(@Body() data: EditUserProfileRequestDto) {
    const userId = this.requestContextService.getOrThrowUserId();

    return this.usersService.editUser(userId, data);
  }
}
