import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

import { IsBigInt } from '@common/decorators/is-bigint.decorator';
import { TransformToBigint } from '@common/decorators/transform.decorator';

export class User {
  // User Table에 포함된 정보

  @TransformToBigint()
  @IsBigInt()
  @ApiProperty({
    description: '사용자 ID',
    type: String,
    example: '1',
  })
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

  // OAuth User에서 추가로 받을 수 있는 정보

  oauthProvider?: string; // OAuth 제공자 (예: Google, Facebook 등)
  oauthId?: string; // OAuth 제공자에서 제공하는 사용자 ID
}

export class UserIdRequestDto extends PickType(User, ['id'] as const) {}

export class UserProfileResponseDto extends PickType(User, [
  'id',
  'name',
  'nickname',
  'profileImage',
] as const) {}
