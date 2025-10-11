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

  public static readonly ALREADY_IN_TEAM: CustomErrorCode = {
    code: 'USER0006',
    status: HttpStatus.CONFLICT,
    message: '이미 해당 라이딩 팀에 속해있는 사용자입니다.',
  };

  public static readonly NOT_IN_TEAM: CustomErrorCode = {
    code: 'USER0007',
    status: HttpStatus.CONFLICT,
    message: '해당 라이딩 팀에 속해있지 않은 사용자입니다.',
  };

  public static readonly TEAM_LEADER_CANNOT_LEAVE: CustomErrorCode = {
    code: 'USER0008',
    status: HttpStatus.CONFLICT,
    message: '라이딩 팀 리더는 유일한 팀원이 아닌 이상 팀에서 나갈 수 없습니다.',
  };

  public static readonly INVALID_TEAM_JOIN_CODE: CustomErrorCode = {
    code: 'USER0009',
    status: HttpStatus.NOT_FOUND,
    message: '유효하지 않은 라이딩 팀 참여 코드입니다.',
  };

  public static readonly EXPIRED_TEAM_JOIN_CODE: CustomErrorCode = {
    code: 'USER0010',
    status: HttpStatus.BAD_REQUEST,
    message: '라이딩 팀 참여 코드가 만료되었습니다. 다시 시도해주세요.',
  };

  public static readonly FAILED_TO_CREATE_TEAM_JOIN_CODE: CustomErrorCode = {
    code: 'USER0011',
    status: HttpStatus.BAD_REQUEST,
    message:
      '라이딩 팀 참여 코드 생성에 실패했습니다. 이미 코드가 생성되어 있지는 않은지 확인해주세요.',
  };

  public static readonly BAD_TEAM_CREATE_REQUEST: CustomErrorCode = {
    code: 'USER0011',
    status: HttpStatus.BAD_REQUEST,
    message: '잘못된 라이딩 팀 생성 요청입니다.',
  };
}
