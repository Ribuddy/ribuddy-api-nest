import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class User {
  id!: bigint;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 이름',
  })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 닉네임',
  })
  nickname!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '사용자 프로필 이미지',
  })
  profileImage?: string;

  @IsOptional()
  @Type(() => Date)
  @ApiProperty({
    description: '계정 생성 일시',
  })
  createdAt!: Date;

  @IsOptional()
  @Type(() => Date)
  @ApiProperty({
    description: 'User 정보 수정 일자',
  })
  updatedAt!: Date;
}
