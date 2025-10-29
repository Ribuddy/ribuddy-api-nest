import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';

import { RequestContextService } from '@modules/als/services/request-context.service';
import { LatLonEleDto } from '@modules/driving/dto/common.driving.dto';
import { DriveLocationService } from '@modules/driving/services/drive-location.service';

@Controller({
  path: '/location',
  version: '1',
})
@ApiTags(API_TAGS.DRIVING)
@ApiBearerAuth()
export class LocationV1Controller {
  constructor(
    private readonly locationService: DriveLocationService,
    private readonly reqContext: RequestContextService,
  ) {}

  @Post('my')
  @ApiOperation({
    summary: '내 위치 보고 & 팀 위치 조회',
    description:
      '내 위치를 정해진 형식에 맞추어 전송하면, 함께 라이딩 중인 팀원의 위치를 반환합니다.\n' +
      "라이딩 중인 팀원의 규칙 : 본인이 속한 팀 중, 상태가 '라이딩' 중인 팀의 팀원들 중 위치 정보가 존재하는 팀원",
  })
  async setMyLocation(@Body() body: LatLonEleDto) {
    const userId = this.reqContext.getOrThrowUserId();

    await this.locationService.setUserLocation(userId, body.lat, body.lon);
    return this.locationService.getLocationsFromUserIds(userId);
  }
}
