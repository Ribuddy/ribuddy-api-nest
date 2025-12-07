import { ApiProperty } from '@nestjs/swagger';

export class DailyStatisticsDto {
  @ApiProperty({ description: '날짜 (YYYY-MM-DD)', example: '2025-12-02' })
  date!: string;

  @ApiProperty({ description: '요일', example: '월' })
  dayOfWeek!: string;

  @ApiProperty({ description: '주행 거리 (km)', example: 45.5 })
  distance!: number;

  @ApiProperty({ description: '주행 시간 (초)', example: 3600 })
  duration!: number;

  @ApiProperty({ description: '주행 횟수', example: 3 })
  rideCount!: number;
}

export class WeeklyStatisticsResponseDto {
  @ApiProperty({ description: '주의 시작일', example: '2025-12-02' })
  startDate!: string;

  @ApiProperty({ description: '주의 종료일', example: '2025-12-09' })
  endDate!: string;

  @ApiProperty({ description: '주간 총 주행 거리 (km)', example: 150.5 })
  totalDistance!: number;

  @ApiProperty({ description: '주간 총 주행 시간 (초)', example: 18000 })
  totalDuration!: number;

  @ApiProperty({ description: '주간 총 주행 횟수', example: 15 })
  totalRideCount!: number;

  @ApiProperty({ description: '각 요일별 통계 (7개)', type: [DailyStatisticsDto] })
  dailyStats!: DailyStatisticsDto[];
}

export class MonthlyStatisticsDto {
  @ApiProperty({ description: '월 (YYYY-MM)', example: '2025-12' })
  month!: string;

  @ApiProperty({ description: '주행 거리 (km)', example: 450.5 })
  distance!: number;

  @ApiProperty({ description: '주행 시간 (초)', example: 54000 })
  duration!: number;

  @ApiProperty({ description: '주행 횟수', example: 45 })
  rideCount!: number;
}

export class MonthlyStatisticsResponseDto {
  @ApiProperty({ description: '연도', example: 2025 })
  year!: number;

  @ApiProperty({ description: '연간 총 주행 거리 (km)', example: 5400.5 })
  totalDistance!: number;

  @ApiProperty({ description: '연간 총 주행 시간 (초)', example: 648000 })
  totalDuration!: number;

  @ApiProperty({ description: '연간 총 주행 횟수', example: 540 })
  totalRideCount!: number;

  @ApiProperty({ description: '각 월별 통계 (12개)', type: [MonthlyStatisticsDto] })
  monthlyStats!: MonthlyStatisticsDto[];
}

export class YearlyStatisticsDto {
  @ApiProperty({ description: '연도', example: 2025 })
  year!: number;

  @ApiProperty({ description: '주행 거리 (km)', example: 5400.5 })
  distance!: number;

  @ApiProperty({ description: '주행 시간 (초)', example: 648000 })
  duration!: number;

  @ApiProperty({ description: '주행 횟수', example: 540 })
  rideCount!: number;
}

export class YearlyStatisticsResponseDto {
  @ApiProperty({ description: '전체 총 주행 거리 (km)', example: 15000.5 })
  totalDistance!: number;

  @ApiProperty({ description: '전체 총 주행 시간 (초)', example: 1800000 })
  totalDuration!: number;

  @ApiProperty({ description: '전체 총 주행 횟수', example: 1500 })
  totalRideCount!: number;

  @ApiProperty({ description: '각 연도별 통계', type: [YearlyStatisticsDto] })
  yearlyStats!: YearlyStatisticsDto[];
}
