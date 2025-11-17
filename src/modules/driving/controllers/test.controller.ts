import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';
import { ParseBigIntPipe } from '@common/pipes/parse-bigint.pipe';

import { RequestContextService } from '@modules/als/services/request-context.service';
import { Public } from '@modules/auth/decorators/public.decorator';
import { DriveLocationService } from '@modules/driving/services/drive-location.service';
import { TeamUsersService } from '@modules/users/services/team.users.service';

@ApiTags(API_TAGS.TEST)
@ApiBearerAuth()
@Controller({
  path: 'driving/test',
  version: '1',
})
export class DrivingTestController {
  constructor(
    private readonly locationService: DriveLocationService,
    private readonly teamUsersService: TeamUsersService,
    private readonly requestContext: RequestContextService,
  ) {}

  @ApiOperation({
    summary: '[테스트용] 특정 유저 위치 조회',
    description: 'userId를 받아서 해당 사용자의 위치를 반환합니다.',
  })
  @Public()
  @Get('test/single-user/:userId')
  testSingleUser(@Param('userId', ParseBigIntPipe) userId: bigint) {
    return this.locationService.getUserLocation(userId);
  }

  @ApiOperation({
    summary: '[테스트용] RidingRecord 조회',
    description: 'Params로 제공된 ridingRecordId에 해당하는 라이딩 기록을 반환합니다.',
  })
  @Public()
  @Get('test/riding-record/:ridingRecordId')
  createRidingRecord(@Param('ridingRecordId') ridingRecordId: string) {
    return this.locationService.getRidingRecordInfo(ridingRecordId);
  }

  // ridingRecord 상위 5개를 반환하는 API
  @ApiTags(API_TAGS.TEST)
  @ApiOperation({
    summary: '[테스트용] RidingRecord 상위 N개 조회',
    description:
      'Query의 take에서 가져온 number N에 대하여, 최근 생성된 riding record 상위 N개를 반환합니다.\n' +
      'take가 제공되지 않을 경우 기본값 5개를 반환합니다.',
  })
  @Public()
  @Get('test/riding-record')
  getTop5RidingRecords(@Query('take') take: number) {
    return this.locationService.getTop5RidingRecords(take);
  }

  // mock 위치를 박고, 팀 위치를 반환하도록 하는 test API
  @Post('test/location/:ridingRecordId')
  @ApiOperation({
    summary: '[테스트용] 내 위치 Mock으로 보고 & 팀 위치 조회',
    description:
      '내 위치를 정해진 형식에 맞추어 전송하면, 함께 라이딩 중인 팀원의 위치를 반환합니다.\n' +
      "라이딩 중인 팀원의 규칙 : 본인이 속한 팀 중, 상태가 '라이딩' 중인 팀의 팀원들 중 위치 정보가 존재하는 팀원",
  })
  async setSampleLocation(@Param('ridingRecordId') ridingRecordId: string) {
    const userId = this.requestContext.getOrThrowUserId();

    // riding record의 소유자가 맞는지 확인
    await this.locationService.isRidingRecordOwner(ridingRecordId, userId);

    const fakeLoc = this.locationService.generateFakeLocation();

    // DB에 위치 저장 및 redis에 위치 캐싱 (타 팀원 공유용)
    await this.locationService.saveUserLocationToRidingRecord(ridingRecordId, fakeLoc);

    // redis에서 가져온 팀원 위치 조회
    return this.locationService.getLocationsFromRidingRecordId(ridingRecordId);
  }

  @Post('test/start/:teamId')
  @ApiOperation({
    summary: '[테스트용] 팀 라이딩 시작 (시작 위치 Mock)',
    description: '시작 위치를 Mocking하여 팀 라이딩을 시작합니다. 나머지는 기존 API와 동일합니다.',
  })
  async startMockRiding(@Param('teamId', ParseBigIntPipe) teamId: bigint) {
    const userId = this.requestContext.getOrThrowUserId();
    await this.teamUsersService.isUserInTeam(userId, teamId);

    // 역지오코딩 서비스 (나중에)
    const departureName = '출발지';

    const departureLocation = this.locationService.generateFakeLocation();

    return await this.locationService.startTeamRiding(
      teamId,
      userId,
      departureLocation,
      departureName,
    );
  }
}
