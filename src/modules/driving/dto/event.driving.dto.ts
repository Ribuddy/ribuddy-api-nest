import { ApiProperty } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

import { Position } from '@common/dto/position.common.dto';

export enum DrivingEventType {
  SUDDEN_ACCELERATION = 'SUDDEN_ACCELERATION',
  SUDDEN_STOP = 'SUDDEN_STOP',
  SHARP_TURN = 'SHARP_TURN',
  OVERSPEED = 'OVERSPEED',
  ACCIDENT = 'ACCIDENT',
}

export class CommonEventDetails {
  @ApiProperty({
    description: '이벤트 발생 위치 정보 배열, 각 위치는 latitude와 longitude를 포함합니다.',
  })
  @Transform(({ value }) =>
    value.map((pos: any) => ({
      latitude: parseFloat(pos.latitude),
      longitude: parseFloat(pos.longitude),
    })),
  )
  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @Type(() => Position)
  location!: Position[];

  @IsNotEmpty()
  type!: DrivingEventType;
}

export class SuddenSpeedChangeEventDetails extends CommonEventDetails {
  declare type: DrivingEventType.SUDDEN_ACCELERATION;

  @ApiProperty({ example: 3.5, description: '급가속/급정거 시의 가속도 (m/s²)' })
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  g_force!: number;

  @ApiProperty({ example: 20, description: '급가속/급정거 전 차량 속도 (km/h)' })
  beforeSpeed!: number;

  @ApiProperty({ example: 50, description: '급가속/급정거 후 차량 속도 (km/h)' })
  afterSpeed!: number;
}
