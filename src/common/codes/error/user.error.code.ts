import { HttpStatus } from '@nestjs/common';

import { CustomErrorCode } from '@common/codes/code.type';

export class UserErrorCode {
  public static readonly NO_USER: CustomErrorCode = {
    code: 'USER0001',
    status: HttpStatus.NOT_FOUND,
    message: '존재하지 않는 사용자입니다.',
  };

  public static readonly DUPLICATE_RIBUDDY_ID: CustomErrorCode = {
    code: 'USER0002',
    status: HttpStatus.CONFLICT,
    message: '중복된 RiBuddy ID 입니다.',
  };

  public static readonly CANNOT_ADD_SELF_AS_FRIEND: CustomErrorCode = {
    code: 'USER0003',
    status: HttpStatus.BAD_REQUEST,
    message: '자기 자신을 친구로 추가할 수 없습니다.',
  };
  public static readonly ALREADY_FRIEND: CustomErrorCode = {
    code: 'USER0004',
    status: HttpStatus.CONFLICT,
    message: '이미 친구인 사용자입니다.',
  };

  public static readonly NOT_A_FRIEND: CustomErrorCode = {
    code: 'USER0005',
    status: HttpStatus.BAD_REQUEST,
    message: '친구가 아닌 사용자에 대한 삭제 또는 즐겨찾기 설정/해제는 불가합니다.',
  };
}
