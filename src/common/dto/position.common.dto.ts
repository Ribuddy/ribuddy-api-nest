import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class Position {
  @ApiProperty({ example: 37.7749, description: '위도' })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  latitude!: number;

  @ApiProperty({ example: 122.4194, description: '경도' })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  longitude!: number;
}
