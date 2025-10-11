import { ApiProperty } from '@nestjs/swagger';

import { IsEnum } from 'class-validator';

export enum ErrorType {
  HTTP = 'HTTP',
  NORMAL = 'NORMAL',
  CUSTOM = 'CUSTOM',
}
export class ErrorTypeDto {
  @IsEnum(ErrorType)
  @ApiProperty({ enum: ErrorType, example: ErrorType.CUSTOM })
  type!: ErrorType;
}
