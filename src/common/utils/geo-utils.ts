// src/utils/geo.utils.ts
import { LatLonEleDto } from '@modules/driving/dto/common.driving.dto';

export const calculateDistance = (
  coord1: LatLonEleDto,
  coord2: LatLonEleDto,
  unit: 'm' | 'km' = 'km',
): number => {
  const R = 6371e3; // 지구 반지름 (미터)
  const phi1 = (coord1.lat * Math.PI) / 180;
  const phi2 = (coord2.lat * Math.PI) / 180;
  const deltaPhi1 = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const deltaPhi2 = ((coord2.lon - coord1.lon) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi1 / 2) * Math.sin(deltaPhi1 / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaPhi2 / 2) * Math.sin(deltaPhi2 / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // 미터
  return unit === 'km' ? distance / 1000 : distance;
};

export const calculateTotalDistance = (
  coordinates: LatLonEleDto[],
  unit: 'm' | 'km' = 'km',
): number => {
  if (!coordinates || coordinates.length < 2) return 0;

  // 유효한 좌표만 필터링
  const validCoords = coordinates.filter(
    (coord) => coord.lat != null && coord.lon != null && !isNaN(coord.lat) && !isNaN(coord.lon),
  );

  if (validCoords.length < 2) return 0;

  let totalDistance = 0;
  for (let i = 0; i < validCoords.length - 1; i++) {
    totalDistance += calculateDistance(validCoords[i], validCoords[i + 1]);
  }

  return unit === 'km' ? Math.round(totalDistance * 100) / 100 : Math.round(totalDistance);
};

export const calculateAverageSpeed = (totalDistanceKm: number, totalTimeHours: number): number => {
  if (totalTimeHours <= 0) return 0;
  return Math.round((totalDistanceKm / totalTimeHours) * 100) / 100; // 소수점 둘째 자리까지 반올림
};

/**
 * 주행 시간을 초 단위로 계산합니다.
 * @param coordinates - 시간 정보가 포함된 좌표 배열 (GpxTrackPoint 등)
 * @returns 총 주행 시간 (초)
 */
export const calculateDuration = (coordinates: Array<{ time?: Date }>): number => {
  if (!coordinates || coordinates.length < 2) return 0;

  const validCoords = coordinates.filter((coord) => coord.time != null);
  if (validCoords.length < 2) return 0;

  const startTime = new Date(validCoords[0].time!).getTime();
  const endTime = new Date(validCoords[validCoords.length - 1].time!).getTime();

  const durationMs = endTime - startTime;
  return Math.round(durationMs / 1000); // 밀리초를 초로 변환
};

/**
 * 최고 속도를 km/h 단위로 계산합니다.
 * @param coordinates - 위치 및 시간 정보가 포함된 좌표 배열
 * @returns 최고 속도 (km/h)
 */
export const calculateTopSpeed = (coordinates: Array<LatLonEleDto & { time?: Date }>): number => {
  if (!coordinates || coordinates.length < 2) return 0;

  const validCoords = coordinates.filter(
    (coord) =>
      coord.lat != null &&
      coord.lon != null &&
      coord.time != null &&
      !isNaN(coord.lat) &&
      !isNaN(coord.lon),
  );

  if (validCoords.length < 2) return 0;

  let maxSpeed = 0;

  for (let i = 0; i < validCoords.length - 1; i++) {
    const distance = calculateDistance(validCoords[i], validCoords[i + 1], 'km');
    const timeDiff =
      (new Date(validCoords[i + 1].time!).getTime() - new Date(validCoords[i].time!).getTime()) /
      1000 /
      3600; // 시간 단위로 변환

    if (timeDiff > 0) {
      const speed = distance / timeDiff; // km/h
      if (speed > 250) continue; // 비현실적인 속도 필터링 (예: 250km/h 초과)
      maxSpeed = Math.max(maxSpeed, speed);
    }
  }

  return Math.round(maxSpeed * 100) / 100; // 소수점 둘째 자리까지 반올림
};

/**
 * 상승 고도와 하강 고도를 미터 단위로 계산합니다.
 * @param coordinates - 고도 정보가 포함된 좌표 배열
 * @returns { climb: 상승 고도, fall: 하강 고도 } (미터)
 */
export const calculateClimbAndFall = (
  coordinates: Array<{ ele?: number }>,
): { climb: number; fall: number } => {
  if (!coordinates || coordinates.length < 2) return { climb: 0, fall: 0 };

  const validCoords = coordinates.filter((coord) => coord.ele != null && !isNaN(coord.ele));
  if (validCoords.length < 2) return { climb: 0, fall: 0 };

  let totalClimb = 0;
  let totalFall = 0;

  for (let i = 0; i < validCoords.length - 1; i++) {
    // console.log('VALID_COORD: ', validCoords[i]);
    const elevationDiff = validCoords[i + 1].ele! - validCoords[i].ele!;

    if (elevationDiff > 0) {
      totalClimb += elevationDiff;
    } else if (elevationDiff < 0) {
      totalFall += Math.abs(elevationDiff);
    }
  }

  return {
    climb: Math.round(totalClimb * 100) / 100,
    fall: Math.round(totalFall * 100) / 100,
  };
};

/**
 * 최대 기울기 각도를 계산합니다.
 * @param coordinates - 기울기 각도 정보가 포함된 좌표 배열
 * @returns { maxLeftLean: 최대 좌측 기울기, maxRightLean: 최대 우측 기울기 } (도)
 */
export const calculateMaxLeanAngle = (
  coordinates: Array<{ leanAngle?: number }>,
): { maxLeftLean: number; maxRightLean: number } => {
  if (!coordinates || coordinates.length === 0) return { maxLeftLean: 0, maxRightLean: 0 };

  const validAngles = coordinates
    .filter((coord) => coord.leanAngle != null && !isNaN(coord.leanAngle))
    .map((coord) => coord.leanAngle!);

  if (validAngles.length === 0) return { maxLeftLean: 0, maxRightLean: 0 };

  // 양수: 우측 기울기, 음수: 좌측 기울기로 가정
  const maxRightLean = Math.max(0, ...validAngles);
  const maxLeftLean = Math.abs(Math.min(0, ...validAngles));

  return {
    maxLeftLean: Math.round(maxLeftLean * 100) / 100,
    maxRightLean: Math.round(maxRightLean * 100) / 100,
  };
};

// ================== 주행 점수 산출 함수 ==================

/**
 * 이벤트 횟수 기반 점수 산출 (조작 안전 - A 점수)
 * e ≤ 1 → 100, e = 2 → 90, e = 3 → 80, e = 4 → 70, e = 5 → 60, e ≥ 6 → 50
 * @param eventCount - 총 이벤트 수 (급감속 + 급가속 + 급정지 + 급출발)
 * @param distanceKm - 주행 거리 (km)
 * @returns A 점수 (0-100)
 */
export const calculateManeuverScore = (eventCount: number, distanceKm: number): number => {
  if (eventCount == null || distanceKm == null) return 100; // 데이터 없으면 기본 만점
  if (eventCount <= 0) return 100;

  // 10km당 이벤트로 표준화
  const e = (10 * eventCount) / Math.max(distanceKm, 1);

  // 선형 보간 적용
  if (e <= 1) return 100;
  if (e >= 6) return 50;

  // 1~6 구간에서 선형 보간 (e=1 → 100, e=6 → 50)
  // 각 구간: 1→100, 2→90, 3→80, 4→70, 5→60, 6→50
  const score = 100 - (e - 1) * 10;
  return Math.round(Math.max(50, Math.min(100, score)) * 100) / 100;
};

/**
 * 기울기 기반 점수 산출 (기울기 안정성 - C 점수)
 * θ ≤ 20° → 100, 30° → 85, 40° → 70, 50° → 55, ≥60° → 40
 * 좌측 기울기의 경우 -5점 페널티
 * @param maxLeftLean - 최대 좌측 기울기 (도)
 * @param maxRightLean - 최대 우측 기울기 (도)
 * @returns C 점수 (0-100)
 */
export const calculateStabilityScore = (maxLeftLean: number, maxRightLean: number): number => {
  if (maxLeftLean == null && maxRightLean == null) return 100; // 데이터 없으면 기본 만점

  const leftLean = maxLeftLean ?? 0;
  const rightLean = maxRightLean ?? 0;

  // 각 방향별 점수 계산
  const calculateAngleScore = (angle: number): number => {
    if (angle <= 20) return 100;
    if (angle >= 60) return 40;

    // 선형 보간: 20→100, 30→85, 40→70, 50→55, 60→40
    if (angle <= 30) {
      return 100 - ((angle - 20) / 10) * 15; // 100 → 85
    }
    if (angle <= 40) {
      return 85 - ((angle - 30) / 10) * 15; // 85 → 70
    }
    if (angle <= 50) {
      return 70 - ((angle - 40) / 10) * 15; // 70 → 55
    }
    // 50 < angle < 60
    return 55 - ((angle - 50) / 10) * 15; // 55 → 40
  };

  const leftScore = calculateAngleScore(leftLean);
  const rightScore = calculateAngleScore(rightLean);

  // 최대 기울기가 더 큰 쪽의 점수 사용
  let finalScore: number;
  if (leftLean >= rightLean) {
    // 좌측 기울기가 더 크면 -5점 페널티
    finalScore = leftScore - 5;
  } else {
    finalScore = rightScore;
  }

  return Math.round(Math.max(0, Math.min(100, finalScore)) * 100) / 100;
};

/**
 * 속도 위험도 레벨 반환 (B 점수 대신 경고 메시지용)
 * @param topSpeed - 최고 속도 (km/h)
 * @returns 위험도 레벨 및 메시지
 */
export const getSpeedWarningLevel = (
  topSpeed: number,
): { level: 'safe' | 'caution' | 'danger' | 'critical'; message: string } => {
  if (topSpeed == null || topSpeed < 90) {
    return { level: 'safe', message: '안전한 속도입니다.' };
  }
  if (topSpeed < 110) {
    return { level: 'caution', message: '주의 속도입니다. 안전 운전하세요.' };
  }
  if (topSpeed < 120) {
    return {
      level: 'danger',
      message: '위험 속도입니다. 100km/h를 넘기면 사고 치사율이 급격히 증가합니다.',
    };
  }
  return {
    level: 'critical',
    message: '고위험 속도입니다. 사고 시 치사율이 매우 높습니다. 속도를 줄여주세요.',
  };
};

export interface ManeuverEventCounts {
  suddenDeceleration: number; // 급감속
  suddenAcceleration: number; // 급가속
  suddenStop: number; // 급정지
  suddenStart: number; // 급출발
}

export interface DrivingScoreInput {
  distanceKm: number;
  eventCounts?: ManeuverEventCounts;
  maxLeftLean?: number;
  maxRightLean?: number;
  topSpeed?: number;
}

export interface DrivingScoreResult {
  maneuverScore: number; // A 점수
  stabilityScore: number; // C 점수
  finalScore: number; // 종합 점수
  speedWarning: { level: 'safe' | 'caution' | 'danger' | 'critical'; message: string };
  improvementPoints: ImprovementPoint[];
}

/**
 * 종합 주행 점수 계산
 * Final Score = 0.5 * A + 0.5 * C (B는 제외)
 * @param input - 주행 데이터
 * @returns 각 항목별 점수 및 종합 점수
 */
export const calculateDrivingScore = (input: DrivingScoreInput): DrivingScoreResult => {
  const { distanceKm, eventCounts, maxLeftLean, maxRightLean, topSpeed } = input;

  // 이벤트 합계 계산
  const totalEvents = eventCounts
    ? eventCounts.suddenDeceleration +
      eventCounts.suddenAcceleration +
      eventCounts.suddenStop +
      eventCounts.suddenStart
    : 0;

  // A 점수 (조작 안전)
  const maneuverScore = calculateManeuverScore(totalEvents, distanceKm);

  // C 점수 (기울기 안정성)
  const stabilityScore = calculateStabilityScore(maxLeftLean ?? 0, maxRightLean ?? 0);

  // 속도 경고
  const speedWarning = getSpeedWarningLevel(topSpeed ?? 0);

  // 종합 점수: 0.5*A + 0.5*C
  const finalScore = Math.round((0.5 * maneuverScore + 0.5 * stabilityScore) * 100) / 100;

  const improvementPoints = generateAllImprovementPoints(input);

  return {
    maneuverScore,
    stabilityScore,
    finalScore,
    speedWarning,
    improvementPoints,
  };
};

// ================== 개선 포인트 생성 함수 ==================

export interface ImprovementPoint {
  category: 'maneuver' | 'stability' | 'speed';
  title: string;
  description: string;
  severity: 'good' | 'caution' | 'warning' | 'danger';
}

/**
 * 조작 안전 개선 포인트 생성
 * @param eventCount - 총 이벤트 수
 * @param distanceKm - 주행 거리 (km)
 * @returns 개선 포인트 또는 null
 */
export const generateManeuverImprovementPoint = (
  eventCount: number,
  distanceKm: number,
): ImprovementPoint | null => {
  if (eventCount == null || distanceKm == null) return null;

  const e = (10 * eventCount) / Math.max(distanceKm, 1);
  const eventsPerTenKm = Math.round(e * 10) / 10;

  if (e <= 1) {
    return {
      category: 'maneuver',
      title: '좋은 조작 습관',
      description: '안정적인 조작 습관을 유지하고 계세요!',
      severity: 'good',
    };
  }

  if (e <= 3) {
    return {
      category: 'maneuver',
      title: `조작 이벤트 10km당 ${eventsPerTenKm}회 발생`,
      description: '조금 더 부드러운 가속과 감속을 시도해보세요.',
      severity: 'caution',
    };
  }

  if (e <= 5) {
    return {
      category: 'maneuver',
      title: `조작 이벤트 10km당 ${eventsPerTenKm}회 발생`,
      description: '급가속/급감속이 잦습니다. 앞 차량과의 간격을 넓히고 여유있게 운전하세요.',
      severity: 'warning',
    };
  }

  return {
    category: 'maneuver',
    title: `조작 이벤트 10km당 ${eventsPerTenKm}회 이상 발생`,
    description:
      '거친 조작이 매우 자주 발생합니다. 사고 위험이 높으니 부드러운 운전 습관을 기르세요.',
    severity: 'danger',
  };
};

/**
 * 기울기 안정성 개선 포인트 생성
 * @param maxLeftLean - 최대 좌측 기울기 (도)
 * @param maxRightLean - 최대 우측 기울기 (도)
 * @returns 개선 포인트 또는 null
 */
export const generateStabilityImprovementPoint = (
  maxLeftLean: number,
  maxRightLean: number,
): ImprovementPoint | null => {
  if (maxLeftLean == null && maxRightLean == null) return null;

  const leftLean = maxLeftLean ?? 0;
  const rightLean = maxRightLean ?? 0;
  const maxAngle = Math.max(leftLean, rightLean);
  const isLeftDominant = leftLean >= rightLean;
  const direction = isLeftDominant ? '좌측' : '우측';

  if (maxAngle < 40) {
    return {
      category: 'stability',
      title: '좋은 기울기 안정성',
      description: '안정적인 코너링 습관을 유지하고 계세요!',
      severity: 'good',
    };
  }

  if (maxAngle < 50) {
    return {
      category: 'stability',
      title: `${direction} 기울기 ${Math.round(maxAngle)}° 이상`,
      description: '주의 코너링. 40°를 넘는 기울기는 타이어 그립 한계에 근접합니다.',
      severity: 'caution',
    };
  }

  if (maxAngle < 60) {
    return {
      category: 'stability',
      title: `${direction} 기울기 ${Math.round(maxAngle)}° 이상`,
      description: '급코너 위험. 코너 진입 속도를 줄이고 더 완만하게 회전하세요.',
      severity: 'warning',
    };
  }

  return {
    category: 'stability',
    title: `${direction} 기울기 ${Math.round(maxAngle)}° 이상`,
    description: '사고 위험! 극단적인 기울기는 전복 사고로 이어질 수 있습니다.',
    severity: 'danger',
  };
};

/**
 * 속도 관련 개선 포인트 생성
 * @param topSpeed - 최고 속도 (km/h)
 * @returns 개선 포인트 또는 null
 */
export const generateSpeedImprovementPoint = (topSpeed: number): ImprovementPoint | null => {
  if (topSpeed == null) return null;

  if (topSpeed < 90) {
    return null; // 안전 속도이면 개선 포인트 생성 안함
  }

  if (topSpeed < 110) {
    return {
      category: 'speed',
      title: `최고속도 ${Math.round(topSpeed)}km/h`,
      description: '주의 속도입니다. 안전 운전을 위해 속도를 조금 줄여보세요.',
      severity: 'caution',
    };
  }

  if (topSpeed < 120) {
    return {
      category: 'speed',
      title: `최고속도 ${Math.round(topSpeed)}km/h`,
      description: '위험 속도입니다. 오토바이는 100km/h를 넘기면 사고 치사율이 급격히 증가합니다.',
      severity: 'warning',
    };
  }

  return {
    category: 'speed',
    title: `최고속도 ${Math.round(topSpeed)}km/h`,
    description: '고위험 속도입니다. 사고 시 치사율이 매우 높으니 반드시 속도를 줄여주세요.',
    severity: 'danger',
  };
};

/**
 * 모든 개선 포인트 생성
 * @param input - 주행 데이터
 * @returns 개선 포인트 배열
 */
export const generateAllImprovementPoints = (input: DrivingScoreInput): ImprovementPoint[] => {
  const { distanceKm, eventCounts, maxLeftLean, maxRightLean, topSpeed } = input;

  const points: ImprovementPoint[] = [];

  // 이벤트 합계 계산
  const totalEvents = eventCounts
    ? eventCounts.suddenDeceleration +
      eventCounts.suddenAcceleration +
      eventCounts.suddenStop +
      eventCounts.suddenStart
    : 0;

  // 조작 안전 개선 포인트
  const maneuverPoint = generateManeuverImprovementPoint(totalEvents, distanceKm);
  if (maneuverPoint) points.push(maneuverPoint);

  // 기울기 안정성 개선 포인트
  const stabilityPoint = generateStabilityImprovementPoint(maxLeftLean ?? 0, maxRightLean ?? 0);
  if (stabilityPoint) points.push(stabilityPoint);

  // 속도 개선 포인트
  const speedPoint = generateSpeedImprovementPoint(topSpeed ?? 0);
  if (speedPoint) points.push(speedPoint);

  return points;
};
