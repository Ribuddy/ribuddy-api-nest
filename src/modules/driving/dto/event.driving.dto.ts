import { ApiProperty } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

import { GpxTrackPoint } from '@modules/driving/dto/common.driving.dto';

export enum DrivingEventType {
  SUDDEN_ACCELERATION = 'SUDDEN_ACCELERATION',
  SUDDEN_STOP = 'SUDDEN_STOP',
  SHARP_TURN = 'SHARP_TURN',
  OVERSPEED = 'OVERSPEED',
  ACCIDENT = 'ACCIDENT',
}

export class CommonEventDto {
  @ApiProperty({
    description: '이벤트 발생 위치 정보 배열, 각 위치는 latitude와 longitude를 포함합니다.',
    type: [GpxTrackPoint],
  })
  @Transform(({ value }) => value.map((item: any) => Object.assign(new GpxTrackPoint(), item)))
  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @Type(() => GpxTrackPoint)
  trackSegments!: GpxTrackPoint[];

  @IsNotEmpty()
  @ApiProperty({ enum: DrivingEventType, description: '발생한 이벤트의 유형' })
  type!: DrivingEventType;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '급가속(급정거) 이벤트 발생',
    description: '발생한 이벤트에 대한 간단한 설명. 필수는 아닙니다.',
  })
  description?: string;
}

export class SuddenSpeedChangeEventDto extends CommonEventDto {
  declare type: DrivingEventType.SUDDEN_ACCELERATION | DrivingEventType.SUDDEN_STOP;

  @ApiProperty({ example: 1.7, description: '급가속/급정거 시의 가속도 (G 단위)' })
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  g_force!: number;

  @ApiProperty({ example: 20, description: '급가속/급정거 전 차량 속도 (km/h)' })
  @IsOptional()
  beforeSpeed?: number;

  @ApiProperty({ example: 50, description: '급가속/급정거 후 차량 속도 (km/h)' })
  @IsOptional()
  afterSpeed?: number;
}

export class AccidentEventDto extends CommonEventDto {
  declare type: DrivingEventType.ACCIDENT;

  @ApiProperty({ example: 3.5, description: '사고 시의 충격량 (G 단위)' })
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  g_force!: number;
}
