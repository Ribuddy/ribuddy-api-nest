import { DrivingScoreResult } from '@common/utils/geo-utils';

export interface UserLocation {
  userId: string;
  lat: number;
  lon: number;
}

export interface RidingRecordStatistics {
  distance: number; // 주행 거리 (km)
  duration: number; // 주행 시간 (초)
  topSpeed: number; // 최고 속도 (km/h)
  climb: number; // 상승 고도 (m)
  fall: number; // 하강 고도 (m)
  maxLeftLean: number; // 최대 좌측 기울기 (도)
  maxRightLean: number; // 최대 우측 기울기 (도)
  drivingScore: DrivingScoreResult; // 주행 점수
}
