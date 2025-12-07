import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';

import { RequestContextService } from '@modules/als/services/request-context.service';
import {
  MonthlyStatisticsResponseDto,
  WeeklyStatisticsResponseDto,
  YearlyStatisticsResponseDto,
} from '@modules/driving/dto/statistics.driving.dto';
import { DrivingStatisticsService } from '@modules/driving/services/statistics.driving.service';

@ApiTags(API_TAGS.DRIVING_TEAM)
@ApiBearerAuth()
@Controller({
  path: 'driving/statistics',
  version: '1',
})
export class DrivingStatisticsV1Controller {
  constructor(
    private readonly statisticsService: DrivingStatisticsService,
    private readonly requestContext: RequestContextService,
  ) {}

  @Get('weekly')
  @ApiOperation({
    summary: '주간 주행 통계 조회',
    description:
      '각 요일별(월~일) 주행 거리와 시간을 조회합니다.\n' +
      'startDate를 지정하지 않으면 이번 주 월요일부터의 데이터를 반환합니다.',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    description: '주의 시작일 (YYYY-MM-DD). 기본값: 이번 주 월요일',
    example: '2025-12-02',
  })
  @ApiResponse({ status: 200, type: WeeklyStatisticsResponseDto })
  async getWeeklyStatistics(@Query('startDate') startDate?: string) {
    const userId = this.requestContext.getOrThrowUserId();
    const start = startDate ? new Date(startDate) : undefined;

    return this.statisticsService.getWeeklyStatistics(userId, start);
  }

  @Get('monthly')
  @ApiOperation({
    summary: '월간 주행 통계 조회',
    description:
      '각 달별(1~12월) 주행 거리와 시간을 조회합니다.\n' +
      'year를 지정하지 않으면 올해 데이터를 반환합니다.',
  })
  @ApiQuery({
    name: 'year',
    required: false,
    description: '조회할 연도. 기본값: 올해',
    example: 2025,
  })
  @ApiResponse({ status: 200, type: MonthlyStatisticsResponseDto })
  async getMonthlyStatistics(@Query('year') year?: number) {
    const userId = this.requestContext.getOrThrowUserId();

    return this.statisticsService.getMonthlyStatistics(userId, year);
  }

  @Get('yearly')
  @ApiOperation({
    summary: '연간 주행 통계 조회',
    description: '각 연도별 주행 거리와 시간을 조회합니다. 모든 기록이 포함됩니다.',
  })
  @ApiResponse({ status: 200, type: YearlyStatisticsResponseDto })
  async getYearlyStatistics() {
    const userId = this.requestContext.getOrThrowUserId();

    return this.statisticsService.getYearlyStatistics(userId);
  }
}
