import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * @class RouteRequestDto
 * @description 길찾기 API 요청을 위한 파라미터를 정의하는 DTO(Data Transfer Object)입니다.
 */
export class RouteRequestDto {
  @ApiProperty({
    description: '목적지 X좌표 (경도)',
    required: true,
    example: 129.07579349764512,
  })
  @IsNumber()
  endX!: number;

  @ApiProperty({
    description: '목적지 Y좌표 (위도)',
    required: true,
    example: 35.17883196265564,
  })
  @IsNumber()
  endY!: number;

  @ApiProperty({
    description: '출발지 X좌표 (경도)',
    required: true,
    example: 126.98217734415019,
  })
  @IsNumber()
  startX!: number;

  @ApiProperty({
    description: '출발지 Y좌표 (위도)',
    required: true,
    example: 37.56468648536046,
  })
  @IsNumber()
  startY!: number;

  @ApiProperty({
    description: '요금 가중치 옵션. 1: 유/무료, 2: 최적 요금, 8: 무료 우선, 16: 로직판단(기본값)',
    required: false,
    default: 16,
  })
  @IsOptional()
  @IsNumber()
  tollgateFareOption?: number;

  @ApiProperty({
    description:
      '출발 지점의 도로 타입. 32: 가까운 도로(기본값), 16: 일반도로, 8: 지하도, 4: 고가도, 2: 도시 고속도로, 1: 고속도로, 0: 미선택',
    required: false,
    default: 32,
  })
  @IsOptional()
  @IsNumber()
  roadType?: number;

  @ApiProperty({
    description: '출발 지점의 주행 방향. 0: 주행 방향 비우선, 1: 주행 방향 우선(기본값)',
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  directionOption?: number;

  @ApiProperty({
    description: '목적지 POI ID (POI 검색 결과로 얻은 값)',
    required: false,
  })
  @IsOptional()
  @IsString()
  endPoiId?: string;

  @ApiProperty({
    description: '목적지의 RP Flag 정보',
    required: false,
    default: 'G',
  })
  @IsOptional()
  @IsString()
  endRpFlag?: string;

  @ApiProperty({
    description: '출발지, 경유지, 목적지 좌표계 유형',
    required: false,
    default: 'WGS84GEO',
    enum: ['WGS84GEO', 'EPSG3857', 'KATECH'],
  })
  @IsOptional()
  @IsString()
  reqCoordType?: string;

  @ApiProperty({
    description: 'GPS 시각 (YYYYMMDDhhmmss)',
    required: false,
    example: '20230922170000',
  })
  @IsOptional()
  @IsString()
  gpsTime?: string;

  @ApiProperty({
    description: '각도 (0~359)',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  angle?: number;

  @ApiProperty({
    description: '속도 (차량 진행 속도 km/h)',
    required: false,
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  speed?: number;

  @ApiProperty({
    description: '위성수 (0~12)',
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  uncetaintyP?: number;

  @ApiProperty({
    description: '측위 방법. 1: 측위 불량, 2: 2차원 측위, 3: 3차원 측위',
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  uncetaintyA?: number;

  @ApiProperty({
    description: 'HDOP(Horizontal Dilution of Precision). 0.1단위로 정수화 (예: 1.2 -> 12)',
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  uncetaintyAP?: number;

  @ApiProperty({
    description:
      '톨게이트 요금에 대한 차종. 0: 미선택, 1: 승용차, 2: 중형승합차, 3: 대형승합차, 4: 대형화물차, 5: 특수화물차, 6: 경차, 7: 이륜차',
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  carType?: number;

  @ApiProperty({
    description: '출발지 명칭 (UTF-8 기반 URL 인코딩 필요)',
    required: false,
    example: '을지로입구역',
  })
  @IsOptional()
  @IsString()
  startName?: string;

  @ApiProperty({
    description: '목적지 명칭 (UTF-8 기반 URL 인코딩 필요)',
    required: false,
    example: '헤이리',
  })
  @IsOptional()
  @IsString()
  endName?: string;

  @ApiProperty({
    description:
      '경로 탐색 옵션. 0: 교통최적+추천, 1: 무료우선, 2: 최소시간, 3: 초보, 4: 고속도로우선, 10: 최단거리, 12: 이륜차, 19: 어린이보호구역 회피',
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  searchOption?: number;

  @ApiProperty({
    description: '경유지 목록. 형식: "X좌표,Y좌표_X좌표,Y좌표_..."',
    required: false,
    example: '127.384541,36.351272_127.4,36.4',
  })
  @IsOptional()
  @IsString()
  passList?: string;

  @ApiProperty({
    description: 'GPS 궤적 정보 목록',
    required: false,
  })
  @IsOptional()
  @IsString()
  gpsInfoList?: string;

  @ApiProperty({
    description:
      '상세 위치 확인 코드. 0: 고객 상세 위치 확인 안함, 1: 확인, 2: 확인 안하는 서비스(기본값)',
    required: false,
    default: '2',
  })
  @IsOptional()
  @IsString()
  detailPosFlag?: string;

  @ApiProperty({
    description: '받고자 하는 응답 좌표계 유형',
    required: false,
    default: 'WGS84GEO',
    enum: ['WGS84GEO', 'EPSG3857', 'KATECH'],
  })
  @IsOptional()
  @IsString()
  resCoordType?: string;

  @ApiProperty({
    description: '지리정보 개체의 정렬 순서',
    required: false,
    default: 'index',
    enum: ['index', 'custom'],
  })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiProperty({
    description: '응답결과 선택. 1: 전체 데이터, 2: 요약 정보만',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  totalValue?: number;

  @ApiProperty({
    description: '교통정보 표출 옵션',
    required: false,
    enum: ['Y', 'N'],
  })
  @IsOptional()
  @IsString()
  trafficInfo?: 'Y' | 'N';

  @ApiProperty({
    description: '경로상 주요도로 정보 표출 옵션',
    required: false,
    enum: ['Y', 'N'],
  })
  @IsOptional()
  @IsString()
  mainRoadInfo?: 'Y' | 'N';
}
