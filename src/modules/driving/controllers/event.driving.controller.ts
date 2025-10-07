import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { SuddenSpeedChangeEventDetails } from '@modules/driving/dto/event.driving.dto';

@Controller({
  path: 'event',
  version: '1',
})
export class DrivingEventsV1Controller {
  constructor() {}

  @ApiOperation({
    summary: '급가속 발생 보고',
    description: 'FE단에서 급가속 이벤트 감지 시, 관련 정보와 함께 호출해주시면 됩니다.',
  })
  @Post('sudden-acceleration')
  suddenAcceleration(@Body() data: SuddenSpeedChangeEventDetails) {
    return;
  }

  @ApiOperation({
    summary: '급정거 발생 보고',
    description: 'FE단에서 급정거 이벤트 감지 시, 관련 정보와 함께 호출해주시면 됩니다.',
  })
  @Post('sudden-stop')
  suddenStop(@Body() data: SuddenSpeedChangeEventDetails) {
    return;
  }

  @ApiOperation({
    summary: '급선회 발생 보고',
    description: 'FE단에서 급선회 이벤트 감지 시, 관련 정보와 함께 호출해주시면 됩니다.',
  })
  @Post('sharp-turn')
  sharpTurn() {
    return;
  }

  @ApiOperation({
    summary: '과속 발생 보고',
    description: 'FE단에서 과속 이벤트 감지 시, 관련 정보와 함께 호출해주시면 됩니다.',
  })
  @Post('overspeed')
  overspeed() {
    return;
  }

  @ApiOperation({
    summary: '사고 발생 보고',
    description: 'FE단에서 사고 이벤트 감지 시, 관련 정보와 함께 호출해주시면 됩니다.',
  })
  @Post('accident')
  accident() {
    return;
  }
}
