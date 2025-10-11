import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';

import {
  AccidentEventDto,
  SuddenSpeedChangeEventDto,
} from '@modules/driving/dto/event.driving.dto';

@Controller({
  path: 'driving/event',
  version: '1',
})
@ApiTags(API_TAGS.DRIVING_EVENT)
@ApiBearerAuth()
export class DrivingEventsV1Controller {
  constructor() {}

  @ApiOperation({
    summary: '급가속/급정거 등 순간적인 속도 변화 발생 보고',
    description: 'FE단에서 급가속 이벤트 감지 시, 관련 정보와 함께 호출해주시면 됩니다.',
  })
  @Post('sudden-speed-change')
  suddenSpeedChange(@Body() eventData: SuddenSpeedChangeEventDto) {
    console.log(eventData.trackSegments.map((point) => `${point.lat}, ${point.lon}`));
    return eventData;
  }

  @ApiOperation({
    summary: '[WIP] 급선회 발생 보고',
    description: 'FE단에서 급선회 이벤트 감지 시, 관련 정보와 함께 호출해주시면 됩니다.',
  })
  @Post('sharp-turn')
  sharpTurn() {
    return;
  }

  @ApiOperation({
    summary: '[WIP] 과속 발생 보고',
    description: 'FE단에서 과속 이벤트 감지 시, 관련 정보와 함께 호출해주시면 됩니다.',
  })
  @Post('overspeed')
  overspeed() {
    return;
  }

  @ApiOperation({
    summary: '[WIP] 사고 발생 보고',
    description: 'FE단에서 사고 이벤트 감지 시, 관련 정보와 함께 호출해주시면 됩니다.',
  })
  @Post('accident')
  accident(@Body() accidentData: AccidentEventDto) {
    return accidentData;
  }
}
