import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';

import { LatLonEleDto, ReportAccidentRequestDto } from '@modules/driving/dto/common.driving.dto';
import {
  AccidentEventDto,
  SuddenSpeedChangeEventDto,
} from '@modules/driving/dto/event.driving.dto';
import { DrivingEventService } from '@modules/driving/services/event.driving.service';

@Controller({
  path: 'driving/event',
  version: '1',
})
@ApiTags(API_TAGS.DRIVING_EVENT)
@ApiBearerAuth()
export class DrivingEventsV1Controller {
  constructor(private readonly eventService: DrivingEventService) {}

  @ApiOperation({
    summary: '[WIP] 급가속/급정거 등 순간적인 속도 변화 발생 보고',
    description: 'FE단에서 급가속 이벤트 감지 시, 관련 정보와 함께 호출해주시면 됩니다.',
    deprecated: true,
  })
  @Post('sudden-speed-change')
  suddenSpeedChange(@Body() eventData: SuddenSpeedChangeEventDto) {
    console.log(eventData.trackSegments.map((point) => `${point.lat}, ${point.lon}`));
    return eventData;
  }

  @ApiOperation({
    summary: '[WIP] 급선회 발생 보고',
    description: 'FE단에서 급선회 이벤트 감지 시, 관련 정보와 함께 호출해주시면 됩니다.',
    deprecated: true,
  })
  @Post('sharp-turn')
  sharpTurn() {
    return;
  }

  @ApiOperation({
    summary: '[WIP] 과속 발생 보고',
    description: 'FE단에서 과속 이벤트 감지 시, 관련 정보와 함께 호출해주시면 됩니다.',
    deprecated: true,
  })
  @Post('overspeed')
  overspeed() {
    return;
  }

  @ApiOperation({
    summary: '사고 발생 보고',
    description:
      '사고 발생 시 사고 관련 정보를 담아서 전송하면, 타 팀원들에게 server-side event를 전송합니다. (예정).\n\n' +
      '현재는 사고 기록만 저장하고 있으며, 사고 관련 정보는 위치 정보와 사고 발생 시간이 포함됩니다. 시간은 제공되지 않을 경우 요청을 받은 서버 시간으로 기록됩니다.',
  })
  @Post('accident')
  accident(@Body() accidentData: ReportAccidentRequestDto) {
    return this.eventService.recordAccidentEvent(
      accidentData.ridingRecordId,
      accidentData.timestamp ?? new Date(),
    );
  }
}
