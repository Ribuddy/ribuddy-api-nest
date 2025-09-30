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
  @ApiProperty({
    description: '사용자 성별',
  })
  gender!: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 생년월일',
  })
  birthdate!: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '사용자 프로필 이미지',
  })
  profileImage?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '사용자 전화번호',
  })
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'OAuth Provider (e.g., google, facebook)',
  })
  oauthProvider?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'OAuth Provider ID',
  })
  oauthId?: string;

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

export class CreateUserRequestDto extends PickType(User, [
  'name',
  'nickname',
  'gender',
  'birthdate',
  'profileImage',
  'phoneNumber',
]) {}

export class CreateOAuthUserRequestDto extends User {
  // TODO: RegisterToken 이용하는 방식이면 필요 없음
  // oauthProvider!: string;
  //
  // oauthId!: string;
}

export class GetMyProfileResponseDto extends PickType(User, []) {}

export class UpdateNicknameRequestDto extends PickType(User, ['nickname']) {}

export class UpdateProfileImageRequestDto {
  @ApiProperty({
    description: '새 프로필 이미지 URL. null이면 삭제로 처리',
    required: false,
    nullable: true,
  })
  @Transform(({ value }) => (value === null ? null : value))
  @IsOptional() // undefined는 검증 제외
  @IsString()
  @IsUrl({}, { message: '유효한 URL이어야 합니다.' })
  profileImage?: string | null;
}
export class UpdateProfileImageResponseDto {}
