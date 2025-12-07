import { Inject, Injectable, LoggerService } from '@nestjs/common';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { calculateDuration, calculateTotalDistance } from '@common/utils/geo-utils';

import { MongoDBPrismaService } from '@modules/prisma/services/mongodb.prisma.service';

export interface DailyStatistics {
  date: string; // YYYY-MM-DD
  dayOfWeek: string; // 월, 화, 수, 목, 금, 토, 일
  distance: number; // km
  duration: number; // 초
  rideCount: number; // 주행 횟수
}

export interface WeeklyStatisticsResponse {
  startDate: string; // 주의 시작일
  endDate: string; // 주의 종료일
  totalDistance: number; // 주간 총 거리
  totalDuration: number; // 주간 총 시간
  totalRideCount: number; // 주간 총 주행 횟수
  dailyStats: DailyStatistics[]; // 각 요일별 통계 (7개)
}

export interface MonthlyStatistics {
  month: string; // YYYY-MM
  distance: number; // km
  duration: number; // 초
  rideCount: number; // 주행 횟수
}

export interface MonthlyStatisticsResponse {
  year: number;
  totalDistance: number; // 연간 총 거리
  totalDuration: number; // 연간 총 시간
  totalRideCount: number; // 연간 총 주행 횟수
  monthlyStats: MonthlyStatistics[]; // 각 월별 통계 (12개)
}

export interface YearlyStatistics {
  year: number;
  distance: number; // km
  duration: number; // 초
  rideCount: number; // 주행 횟수
}

export interface YearlyStatisticsResponse {
  totalDistance: number; // 전체 총 거리
  totalDuration: number; // 전체 총 시간
  totalRideCount: number; // 전체 총 주행 횟수
  yearlyStats: YearlyStatistics[]; // 각 연도별 통계
}

@Injectable()
export class DrivingStatisticsService {
  constructor(
    private readonly mongo: MongoDBPrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}

  /**
   * 주간 주행 통계 조회 (각 요일별)
   * @param userId - 사용자 ID
   * @param startDate - 주의 시작일 (기본값: 이번 주 월요일)
   * @returns 주간 통계
   */
  async getWeeklyStatistics(userId: bigint, startDate?: Date): Promise<WeeklyStatisticsResponse> {
    // 시작일이 없으면 이번 주 월요일로 설정
    const weekStart = startDate || this.getWeekStart(new Date());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    this.logger.log(
      `[주간 통계 조회] userId: ${userId}, startDate: ${weekStart.toISOString()}`,
      'STATISTICS_SERVICE',
    );

    // 해당 주의 모든 주행 기록 조회
    const ridingRecords = await this.mongo.ridingRecord.findMany({
      where: {
        recordOwnerId: userId.toString(),
        createdAt: {
          gte: weekStart,
          lt: weekEnd,
        },
        status: 'COMPLETED',
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // 요일별 통계 초기화 (월~일)
    const dailyStatsMap = new Map<string, DailyStatistics>();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      const dateStr = this.formatDate(date);
      const dayOfWeek = dayNames[date.getDay()];

      dailyStatsMap.set(dateStr, {
        date: dateStr,
        dayOfWeek,
        distance: 0,
        duration: 0,
        rideCount: 0,
      });
    }

    // 주행 기록을 요일별로 집계
    let totalDistance = 0;
    let totalDuration = 0;

    for (const record of ridingRecords) {
      const dateStr = this.formatDate(record.createdAt);
      const stats = dailyStatsMap.get(dateStr);

      if (stats) {
        const coordinates = record.route.map((geoPoint) => ({
          lat: geoPoint.coordinates[1],
          lon: geoPoint.coordinates[0],
          ele: geoPoint.coordinates[2],
          time: geoPoint.timestamp ?? undefined,
        }));

        const distance = calculateTotalDistance(coordinates, 'km');
        const duration = calculateDuration(coordinates);

        stats.distance += distance;
        stats.duration += duration;
        stats.rideCount += 1;

        totalDistance += distance;
        totalDuration += duration;
      }
    }

    return {
      startDate: this.formatDate(weekStart),
      endDate: this.formatDate(weekEnd),
      totalDistance: Math.round(totalDistance * 100) / 100,
      totalDuration: Math.round(totalDuration),
      totalRideCount: ridingRecords.length,
      dailyStats: Array.from(dailyStatsMap.values()),
    };
  }

  /**
   * 월간 주행 통계 조회 (각 달별)
   * @param userId - 사용자 ID
   * @param year - 연도 (기본값: 올해)
   * @returns 월간 통계
   */
  async getMonthlyStatistics(userId: bigint, year?: number): Promise<MonthlyStatisticsResponse> {
    const targetYear = year || new Date().getFullYear();
    const yearStart = new Date(targetYear, 0, 1);
    const yearEnd = new Date(targetYear + 1, 0, 1);

    this.logger.log(
      `[월간 통계 조회] userId: ${userId}, year: ${targetYear}`,
      'STATISTICS_SERVICE',
    );

    // 해당 연도의 모든 주행 기록 조회
    const ridingRecords = await this.mongo.ridingRecord.findMany({
      where: {
        recordOwnerId: userId.toString(),
        createdAt: {
          gte: yearStart,
          lt: yearEnd,
        },
        status: 'COMPLETED',
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // 월별 통계 초기화 (1~12월)
    const monthlyStatsMap = new Map<string, MonthlyStatistics>();

    for (let i = 0; i < 12; i++) {
      const monthStr = `${targetYear}-${String(i + 1).padStart(2, '0')}`;
      monthlyStatsMap.set(monthStr, {
        month: monthStr,
        distance: 0,
        duration: 0,
        rideCount: 0,
      });
    }

    // 주행 기록을 월별로 집계
    let totalDistance = 0;
    let totalDuration = 0;

    for (const record of ridingRecords) {
      const monthStr = `${targetYear}-${String(record.createdAt.getMonth() + 1).padStart(2, '0')}`;
      const stats = monthlyStatsMap.get(monthStr);

      if (stats) {
        const coordinates = record.route.map((geoPoint) => ({
          lat: geoPoint.coordinates[1],
          lon: geoPoint.coordinates[0],
          ele: geoPoint.coordinates[2],
          time: geoPoint.timestamp ?? undefined,
        }));

        const distance = calculateTotalDistance(coordinates, 'km');
        const duration = calculateDuration(coordinates);

        stats.distance += distance;
        stats.duration += duration;
        stats.rideCount += 1;

        totalDistance += distance;
        totalDuration += duration;
      }
    }

    return {
      year: targetYear,
      totalDistance: Math.round(totalDistance * 100) / 100,
      totalDuration: Math.round(totalDuration),
      totalRideCount: ridingRecords.length,
      monthlyStats: Array.from(monthlyStatsMap.values()),
    };
  }

  /**
   * 연간 주행 통계 조회 (각 연도별)
   * @param userId - 사용자 ID
   * @returns 연간 통계
   */
  async getYearlyStatistics(userId: bigint): Promise<YearlyStatisticsResponse> {
    this.logger.log(`[연간 통계 조회] userId: ${userId}`, 'STATISTICS_SERVICE');

    // 모든 주행 기록 조회
    const ridingRecords = await this.mongo.ridingRecord.findMany({
      where: {
        recordOwnerId: userId.toString(),
        status: 'COMPLETED',
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // 연도별 통계 맵
    const yearlyStatsMap = new Map<number, YearlyStatistics>();

    let totalDistance = 0;
    let totalDuration = 0;

    for (const record of ridingRecords) {
      const year = record.createdAt.getFullYear();

      if (!yearlyStatsMap.has(year)) {
        yearlyStatsMap.set(year, {
          year,
          distance: 0,
          duration: 0,
          rideCount: 0,
        });
      }

      const stats = yearlyStatsMap.get(year)!;

      const coordinates = record.route.map((geoPoint) => ({
        lat: geoPoint.coordinates[1],
        lon: geoPoint.coordinates[0],
        ele: geoPoint.coordinates[2],
        time: geoPoint.timestamp ?? undefined,
      }));

      const distance = calculateTotalDistance(coordinates, 'km');
      const duration = calculateDuration(coordinates);

      stats.distance += distance;
      stats.duration += duration;
      stats.rideCount += 1;

      totalDistance += distance;
      totalDuration += duration;
    }

    // 연도별로 정렬
    const yearlyStats = Array.from(yearlyStatsMap.values()).sort((a, b) => a.year - b.year);

    return {
      totalDistance: Math.round(totalDistance * 100) / 100,
      totalDuration: Math.round(totalDuration),
      totalRideCount: ridingRecords.length,
      yearlyStats,
    };
  }

  /**
   * 이번 주 월요일 날짜 구하기
   */
  private getWeekStart(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // 월요일 기준
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  /**
   * 날짜를 YYYY-MM-DD 형식으로 포맷
   */
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
