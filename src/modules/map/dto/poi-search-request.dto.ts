import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

// API 명세서에 정의된 enum 값들을 상수로 관리
enum SearchType {
  ALL = 'all',
  NAME = 'name',
  TELNO = 'telno',
}

enum SearchTypCd {
  ACCURACY = 'A',
  DISTANCE = 'R',
}

enum CoordType {
  WGS84GEO = 'WGS84GEO',
  EPSG3857 = 'EPSG3S7',
  KATECH = 'KATECH',
}

enum MultiPoint {
  YES = 'Y',
  NO = 'N',
}

enum PoiGroupYn {
  YES = 'Y',
  NO = 'N',
}

/**
 * @class PoiSearchRequestDto
 * @description TMAP 장소(POI) 통합 검색 API 요청을 위한 파라미터를 정의하는 DTO입니다.
 */
export class PoiSearchRequestDto {
  /**
   * 시설물명, 상호, 시설 유형, 주소, 전화번호를 포함하는 검색어입니다.
   * UTF-8 기반 URL 인코딩 처리가 필요합니다. (서비스 로직에서 처리)
   */
  @ApiProperty({
    description: '시설물명, 상호, 시설 유형, 주소, 전화번호를 포함하는 검색어',
    example: 'SK T타워',
    required: true,
  })
  @IsString()
  searchKeyword!: string;

  /**
   * 검색 결과 페이지 번호를 지정합니다. (최소: 1, 최대: 200)
   */
  @ApiProperty({
    description: '검색 결과 페이지 번호',
    example: 1,
    required: false,
    default: 1,
    minimum: 1,
    maximum: 200,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(200)
  page?: number;

  /**
   * 페이지당 검색 결과 수를 지정합니다. (최소: 1, 최대: 200)
   */
  @ApiProperty({
    description: '페이지당 검색 결과 수',
    example: 20,
    required: false,
    default: 20,
    minimum: 1,
    maximum: 200,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(200)
  count?: number;

  /**
   * 장소 통합 검색 유형을 지정합니다. (all: 통합, name: 명칭, telno: 전화번호)
   */
  @ApiProperty({
    description: '장소 통합 검색 유형',
    enum: SearchType,
    required: false,
    default: SearchType.ALL,
  })
  @IsOptional()
  @IsEnum(SearchType)
  searchType?: SearchType;

  /**
   * 지역 대분류 코드 (시/도). 'searchType=name'일 경우 필수입니다.
   */
  @ApiProperty({
    description: "지역 대분류 코드 (시/도). 'searchType=name'일 경우 적용을 권장합니다.",
    example: '11',
    required: false,
  })
  @IsOptional()
  @IsString()
  areaLLCode?: string;

  /**
   * 지역 중분류 코드 (시/군/구). 'searchType=name'일 경우 필수입니다.
   */
  @ApiProperty({
    description: "지역 중분류 코드 (시/군/구). 'searchType=name'일 경우 적용을 권장합니다.",
    example: '110',
    required: false,
  })
  @IsOptional()
  @IsString()
  areaLMCode?: string;

  /**
   * 검색 결과 정렬 순서를 지정합니다. (A: 정확도순, R: 거리순)
   */
  @ApiProperty({
    description:
      "검색 결과 정렬 순서. 'R'(거리순) 지정 시 'centerLon', 'centerLat', 'radius'가 필요합니다.",
    enum: SearchTypCd,
    required: false,
    default: SearchTypCd.ACCURACY,
  })
  @IsOptional()
  @IsEnum(SearchTypCd)
  searchtypCd?: SearchTypCd;

  /**
   * 반경 검색의 중심 경도 좌표입니다.
   */
  @ApiProperty({
    description: "반경 검색의 중심 경도 좌표. 'searchtypCd=R'일 경우 필요합니다.",
    example: 126.98502043,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  centerLon?: number;

  /**
   * 반경 검색의 중심 위도 좌표입니다.
   */
  @ApiProperty({
    description: "반경 검색의 중심 위도 좌표. 'searchtypCd=R'일 경우 필요합니다.",
    example: 37.5664821,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  centerLat?: number;

  /**
   * 검색 반경(단위: km)을 지정합니다. (0: 전국, 1~33)
   */
  @ApiProperty({
    description: "검색 반경(단위: km). '0'은 전국 검색을 의미합니다.",
    example: 5,
    required: false,
    minimum: 0,
    maximum: 33,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  @Max(33)
  radius?: number;

  /**
   * 요청 좌표계를 지정합니다.
   */
  @ApiProperty({
    description: '요청 좌표계 지정',
    enum: CoordType,
    required: false,
    default: CoordType.WGS84GEO,
  })
  @IsOptional()
  @IsEnum(CoordType)
  reqCoordType?: CoordType;

  /**
   * 응답 좌표계를 지정합니다.
   */
  @ApiProperty({
    description: '응답 좌표계 지정',
    enum: CoordType,
    required: false,
    default: CoordType.WGS84GEO,
  })
  @IsOptional()
  @IsEnum(CoordType)
  resCoordType?: CoordType;

  /**
   * 다중 입구 건물에 대한 결과 반환 여부를 지정합니다.
   */
  @ApiProperty({
    description: '다중 입구 건물 결과 반환 여부 (Y: 기본값만, N: 모든 값)',
    enum: MultiPoint,
    required: false,
    default: MultiPoint.NO,
  })
  @IsOptional()
  @IsEnum(MultiPoint)
  multiPoint?: MultiPoint;

  /**
   * 부속 시설물 정보 반환 여부를 지정합니다.
   */
  @ApiProperty({
    description: '부속 시설물 정보 반환 여부 (Y: 반환, N: 미반환)',
    enum: PoiGroupYn,
    required: false,
    default: PoiGroupYn.NO,
  })
  @IsOptional()
  @IsEnum(PoiGroupYn)
  poiGroupYn?: PoiGroupYn;

  /**
   * JSONP 형식에서 사용하는 콜백 함수명입니다.
   */
  @ApiProperty({
    description: 'JSONP 형식에서 사용하는 콜백 함수명',
    required: false,
  })
  @IsOptional()
  @IsString()
  callback?: string;
}
