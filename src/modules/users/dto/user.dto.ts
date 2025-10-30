import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';

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
    type: 'string',
    format: 'bigint',
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
    description: '사용자 한 줄 소개',
    example: '나는 말하는 감자입니다.',
  })
  oneLineIntroduction?: string; // 한 줄 소개

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '라이버디 ID, 친구 추가 시 사용됩니다.',
    example: 'ribuddy_official',
  })
  ribuddyId!: string; // 한 줄 소개

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '사용자 프로필 이미지 링크',
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
  'oneLineIntroduction',
  'ribuddyId',
  'profileImage',
] as const) {}

/**
 * 사용자 정보 수정 DTO
 */
export class EditUserProfileRequestDto extends PartialType(
  PickType(User, ['name', 'nickname', 'oneLineIntroduction', 'ribuddyId', 'profileImage'] as const),
) {}

export class AddFriendByRibuddyIdRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '친구로 추가할 사용자의 라이버디 ID',
    example: 'ribuddy_official',
  })
  ribuddyId!: string;
}

export class DeleteFriendByUserIdRequestDto {
  @TransformToBigint()
  @IsBigInt()
  @IsNotEmpty()
  @ApiProperty({
    description: '친구를 삭제할 사용자의 user ID',
    example: '12',
    type: 'string',
    format: 'bigint',
  })
  friendUserId!: bigint;
}

export class FriendDto {
  @TransformToBigint()
  @IsBigInt()
  @IsNotEmpty()
  @ApiProperty({
    description: '기준 사용자 ID',
    type: 'string',
    format: 'bigint',
    example: '2',
  })
  fromUserId!: bigint;

  @TransformToBigint()
  @IsBigInt()
  @IsNotEmpty()
  @ApiProperty({
    description: '기준 사용자가 친구로 추가할 사용자의 ID',
    type: 'string',
    format: 'bigint',
    example: '2',
  })
  toUserId!: bigint;

  @IsOptional()
  @ApiProperty({
    description: '친구 즐겨찾기 여부 (기본값: false)',
    example: false,
  })
  isFavorite!: boolean;
}

export class EditFriendStatusDto extends PickType(FriendDto, ['toUserId', 'isFavorite'] as const) {}

export class GetUserInfoResponseDto {
  id!: string;
  name!: string;
  nickname!: string;
  introduction!: string | null;
  createdAt!: Date;
  teams!: string[];
  ridingRecords!: number;
}
