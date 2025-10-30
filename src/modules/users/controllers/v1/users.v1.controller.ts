import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { CustomException } from '@common/codes/custom.exception';
import { CommonErrorCode } from '@common/codes/error/common.error.code';
import { UserErrorCode } from '@common/codes/error/user.error.code';
import { API_TAGS } from '@common/constants/api-tags.constants';

import { RequestContextService } from '@modules/als/services/request-context.service';
import {
  AddFriendByRibuddyIdRequestDto,
  DeleteFriendByUserIdRequestDto,
  EditFriendStatusDto,
  EditUserProfileRequestDto,
  FriendDto,
  UserIdRequestDto,
  UserProfileResponseDto,
} from '@modules/users/dto/user.dto';
// 임시 유저 식별 (JWT 붙기 전까지 mock 헤더 사용)

import { UsersService } from '@modules/users/services/users.service';

@ApiTags(API_TAGS.USERS)
@ApiBearerAuth()
@Controller({
  path: 'users',
  version: '1',
})
export class UsersV1Controller {
  constructor(
    private readonly usersService: UsersService,
    private readonly requestContextService: RequestContextService,
  ) {}

  @ApiOperation({
    summary: '내 정보 조회',
    description: '현재 로그인 된 사용자의 정보를 반환합니다.',
  })
  @ApiOkResponse({
    description: 'AccessToken을 기반으로, 로그인된 사용자의 정보룰 조회합니다.',
    type: UserProfileResponseDto,
  })
  @Get('me')
  getMyProfile() {
    const userId = this.requestContextService.getOrThrowUserId();

    return this.usersService.getUserInfo(userId);
  }

  @ApiOperation({
    summary: '다른 사용자 정보 조회',
    description: '현재 로그인한 사용자가 아닌, 다른 사용자에 대한 정보를 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    description: '내 정보 조회 성공',
    type: UserProfileResponseDto,
  })
  @Get('profile/:id')
  async getUserInfo(@Param() param: UserIdRequestDto) {
    const userId = this.requestContextService.getOrThrowUserId();

    if (userId === BigInt(param.id)) {
      throw new CustomException(UserErrorCode.BAD_PROFILE_REQUEST);
    }

    const opponentUserInfo = await this.usersService.getUserInfo(param.id);
    const opponentRidingCount = await this.usersService.getRidingCountWithFriend(userId, param.id);

    return { ...opponentUserInfo, ridingCountWithMe: opponentRidingCount };
  }

  @ApiOperation({
    summary: '사용자 탈퇴',
    description: 'Soft Delete가 아닌, Hard Delete로 복구가 불가능하니 사용에 유의하세요.',
  })
  @Delete()
  deleteUser() {
    const userId = this.requestContextService.getOrThrowUserId();

    if (!userId) {
      throw new CustomException(CommonErrorCode.REQUEST_CONTEXT_ERROR);
    }

    return this.usersService.deleteUser(userId);
  }

  @ApiOperation({
    summary: '사용자 정보를 수정합니다. 수정 가능한 필드는 Schema를 참고하세요.',
    description: 'AccessToken으로 사용자를 식별합니다.',
  })
  @Post('edit')
  async editUser(@Body() data: EditUserProfileRequestDto) {
    const userId = this.requestContextService.getOrThrowUserId();

    return this.usersService.editUser(userId, data);
  }

  @Post('friend')
  @ApiOperation({
    summary: '라이버디 ID로 친구 추가',
    description: '라이버디 ID를 받아, 친구를 추가합니다.',
  })
  async addFriendByRibuddyId(@Body() data: AddFriendByRibuddyIdRequestDto) {
    const fromUserId = this.requestContextService.getOrThrowUserId();

    const toUserId = await this.usersService.getUserIdByRiBuddyId(data.ribuddyId);

    await this.usersService.addFriend(fromUserId, toUserId);

    return;
  }

  @ApiOperation({
    summary: '상대방 userId로 친구 삭제',
    description: '상대방의 userId를 이용해 친구를 삭제합니다. (라이버디 ID가 아님에 주의)',
  })
  @Delete('friend')
  async deleteFriendById(@Body() data: DeleteFriendByUserIdRequestDto) {
    const fromUserId = this.requestContextService.getOrThrowUserId();

    await this.usersService.deleteFriend(fromUserId, data.friendUserId);

    return;
  }

  @Patch('friend')
  @ApiOperation({
    summary: '상대방 userId로 친구 즐겨찾기 설정/해제',
    description: '',
  })
  async editFriendProperty(@Body() data: EditFriendStatusDto) {
    const fromUserId = this.requestContextService.getOrThrowUserId();

    await this.usersService.changeFavoriteFriendStatus(fromUserId, data.toUserId, data.isFavorite);

    return;
  }

  @ApiOperation({
    summary: '내 친구 목록 조회 (친구 수 조회)',
    description:
      '로그인 한 사용자의 친구 목록을 반환합니다. 친구 목록에 포함되어 있는 정보는 Schema를 참고하세요.',
  })
  @Get('friend/list')
  async getFriendList() {
    const userId = this.requestContextService.getOrThrowUserId();

    console.log('userId', userId);

    return this.usersService.getFriendList(userId);
  }

  // ================= 테스트용 API =================

  @ApiTags(API_TAGS.TEST)
  @ApiOperation({
    summary: '[테스트용] userId로 직접 친구 추가',
    description:
      '라이버디 ID로 친구 추가 하는 대신, 직접 userId로 친구 추가를 할 수 있습니다. (즐겨찾기 여부는 무시되지만, 요청에 포함하셔야 합니다.)',
  })
  @Post('friend/manual')
  async addFriendByUserId(@Body() data: FriendDto) {
    await this.usersService.addFriend(data.fromUserId, data.toUserId);

    return;
  }

  @ApiTags(API_TAGS.TEST)
  @ApiOperation({
    summary: '[테스트용] 라이버디 ID로 userId 조회',
    description:
      '라이버디 ID로 친구 추가 하는 대신, 직접 userId로 친구 추가를 할 수 있습니다. (즐겨찾기 여부는 무시되지만, 요청에 포함하셔야 합니다.)',
  })
  @ApiParam({
    name: 'ribuddyId',
    description: '라이버디 ID',
    example: 'ribuddy_official',
  })
  @Get('friend/:ribuddyId')
  async getUserIdByRibuddyId(@Param('ribuddyId') ribuddyId: string) {
    const id = await this.usersService.getUserIdByRiBuddyId(ribuddyId);

    return id.toString();
  }
}
