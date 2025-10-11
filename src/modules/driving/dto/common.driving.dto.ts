/*

GPX 파일 구성
1. Track : 지나온 길에 대한 기록
2. Route : 목적지 까지의 경로, 길안내 등에 사용 (RB에서는 사용 X)
3. WayPoint : 특정 지점 (즐겨찾기 같은 느낌? - RB에서는 사용 X)

gpx-builder를 사용해서 object 등을 생성하겠지만, 기본 DTO는 직접 제작해서 사용 예정

 */
import { ApiProperty } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GpxTrackPoint {
  @ApiProperty({ description: '위도', example: 37.123456 })
  @IsNumber()
  @IsNotEmpty()
  lat!: number; // 위도

  @ApiProperty({ description: '경도', example: 127.123456 })
  @IsNumber()
  @IsNotEmpty()
  lon!: number;

  @ApiProperty({ description: '고도', example: 150.5, required: false })
  @IsNumber()
  @IsOptional()
  ele?: number; // 고도

  @ApiProperty({ description: '타임스탬프 (UTC)', example: '2023-10-05T14:48:00.000Z' })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Date(value) : value))
  time!: Date;
}

export class GpxTrackSegment {
  private _trkpt: GpxTrackPoint[];

  constructor(gpxTrackPoints: GpxTrackPoint[] = []) {
    this._trkpt = gpxTrackPoints;
  }

  public addTrackPoint(point: GpxTrackPoint): void {
    this._trkpt.push(point);
  }

  public clearTrackPoints(): void {
    this._trkpt = [];
  }
}

export class GpxTrack {
  private _trkseg: GpxTrackSegment[] = [];

  constructor(gpxTrackSegments: GpxTrackSegment[]) {
    this._trkseg = gpxTrackSegments;
  }

  public get trackSegments(): GpxTrackSegment[] {
    return this._trkseg;
  }
}
