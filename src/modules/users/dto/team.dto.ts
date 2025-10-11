import { ApiProperty, PickType } from '@nestjs/swagger';

import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IsBigInt } from '@common/decorators/is-bigint.decorator';
import { TransformToBigint } from '@common/decorators/transform.decorator';

import { User } from '@modules/users/dto/user.dto';

export enum TeamRole {
  LEADER = 'LEADER',
  MEMBER = 'MEMBER',
}

export class Team {
  @TransformToBigint()
  @IsBigInt()
  @ApiProperty({
    description: '팀 ID',
    type: 'string',
    format: 'bigint',
    example: '1',
  })
  id!: bigint;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '팀 이름',
    example: '라이버디',
  })
  name!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '팀 설명',
    example: '우리는 모두 라이버디입니다.',
  })
  description?: string;

  @ApiProperty({
    description: '팀 멤버 ID 리스트',
    type: 'array',
    items: {
      type: 'string',
      format: 'bigint',
      example: '1',
    },
  })
  @TransformToBigint({ each: true })
  // @IsBigInt()
  @IsOptional()
  @IsNotEmpty()
  members!: bigint[];

  @ApiProperty({
    description: '크루 여부',
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  isCrew!: boolean;
}

export class JoinOrLeaveTeamRequestDto extends PickType(Team, ['id'] as const) {}
export class MakeTeamRequestDto extends PickType(Team, [
  'name',
  'description',
  'members',
  'isCrew',
] as const) {}
