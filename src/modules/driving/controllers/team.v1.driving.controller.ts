import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';
import { ParseBigIntPipe } from '@common/pipes/parse-bigint.pipe';

import { RequestContextService } from '@modules/als/services/request-context.service';
import { DriveLocationService } from '@modules/driving/services/drive-location.service';
import { TeamUsersService } from '@modules/users/services/team.users.service';

@ApiTags(API_TAGS.DRIVING_TEAM)
@ApiBearerAuth()
@Controller({
  path: 'driving/team',
  version: '1',
})
export class DrivingTeamV1Controller {
  constructor(
    private readonly locationService: DriveLocationService,
    private readonly teamUsersService: TeamUsersService,
    private readonly requestContext: RequestContextService,
  ) {}

  // 팀라이딩 시작 API
  // 특정 팀이 라이딩을 시작할 경우, teamId를 받아서 해당 팀을 라이딩 중인 상태로 변환해야 함
  @ApiOperation({
    summary: '팀 라이딩 시작',
    description:
      '특정 팀이 라이딩을 시작할 경우, teamId를 받아서 해당 팀을 라이딩 중인 상태로 변환합니다.',
  })
  @Post('start/:teamId')
  async startTeamRiding(@Param('teamId', ParseBigIntPipe) teamId: bigint) {
    const userId = this.requestContext.getOrThrowUserId();
    await this.teamUsersService.isUserInTeam(userId, teamId);

    return await this.locationService.startTeamRiding(teamId);
  }

  // 팀라이딩 종료 API
  @ApiOperation({
    summary: '팀 라이딩 종료',
    description:
      '특정 팀이 라이딩을 종료할 경우, teamId를 받아서 해당 팀을 라이딩 중인 상태에서 해제합니다.',
  })
  @Post('end/:teamId')
  async endTeamRiding(@Param('teamId', ParseBigIntPipe) teamId: bigint) {
    const userId = this.requestContext.getOrThrowUserId();
    await this.teamUsersService.isUserInTeam(userId, teamId);

    return await this.locationService.endTeamRiding(teamId);
  }

  @ApiTags(API_TAGS.TEST)
  @ApiOperation({
    summary: '[테스트용] 특정 유저 위치 조회',
    description: 'userId를 받아서 해당 사용자의 위치를 반환합니다.',
  })
  @Get('test/single-user/:userId')
  testSingleUser(@Param('userId', ParseBigIntPipe) userId: bigint) {
    return this.locationService.getUserLocation(userId);
  }
}
