import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';
import { ParseBigIntPipe } from '@common/pipes/parse-bigint.pipe';

import { RequestContextService } from '@modules/als/services/request-context.service';
import { JoinOrLeaveTeamRequestDto, MakeTeamRequestDto } from '@modules/users/dto/team.dto';
import { TeamUsersService } from '@modules/users/services/team.users.service';

@Controller({
  path: 'users/team',
  version: '1',
})
@ApiTags(API_TAGS.DRIVING_TEAM)
@ApiBearerAuth()
export class TeamV1Controller {
  constructor(
    private readonly teamService: TeamUsersService,
    private readonly requestContextService: RequestContextService,
  ) {}

  @Get('info/:id')
  @ApiOperation({
    summary: '팀 정보 조회',
    description: '팀 ID를 통해 해당 팀의 정보를 조회합니다.',
  })
  getTeamInfo(@Param('id', ParseBigIntPipe) teamId: bigint) {
    return this.teamService.getTeamInfo(teamId);
  }

  @Get('list')
  @ApiOperation({
    summary: '내가 속한 팀 목록 조회',
    description: '내가 속한 팀들의 목록을 조회합니다.',
  })
  getTeamList() {
    const userId = this.requestContextService.getOrThrowUserId();
    return this.teamService.getTeamList(userId);
  }

  @Post('join')
  @ApiOperation({
    summary: '팀 참여하기',
    description: '팀 ID를 통해 해당 팀에 참여합니다.',
  })
  joinTeam(@Body() body: JoinOrLeaveTeamRequestDto) {
    const userId = this.requestContextService.getOrThrowUserId();

    return this.teamService.joinTeam(userId, body.id);
  }

  @Post()
  @ApiOperation({
    summary: '팀 생성',
    description: '라이딩 팀을 생성합니다.',
  })
  makeTeam(@Body() body: MakeTeamRequestDto) {
    const userId = this.requestContextService.getOrThrowUserId();

    return this.teamService.makeTeam(
      body.isCrew,
      [userId, ...(body.members ?? [])],
      body.name,
      body.description,
    );
  }

  @Delete()
  @ApiOperation({
    summary: '팀 탈퇴하기',
    description: '팀을 탈퇴합니다.',
  })
  async leaveTeam(@Body() body: JoinOrLeaveTeamRequestDto) {
    const userId = this.requestContextService.getOrThrowUserId();
    return this.teamService.leaveTeam(userId, body.id);
  }

  @Get('join-code/:id')
  @ApiOperation({
    summary: 'Team ID를 받아, 해당 팀에 대한 참여 코드를 생성합니다.',
    description: '사용자는 해당 팀에 속해 있어야 합니다.',
  })
  async getTeamJoinCode(@Param('id', ParseBigIntPipe) teamId: bigint) {
    const userId = this.requestContextService.getOrThrowUserId();

    // Check if the user is in the team
    await this.teamService.isUserInTeam(userId, teamId);

    return this.teamService.createTeamJoinCode(teamId);
  }
}
