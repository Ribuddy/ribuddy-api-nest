import { HttpStatus } from '@nestjs/common';

/**
 * 어플리케이션에서 사용하는 모든 커스텀 코드 객체의 구조를 정의합니다.
 * @property code - 어플리케이션 고유 코드 (예: 'USER_001')
 * @property message - 기본 응답 메시지
 * @property status - 이 코드에 매칭되는 HTTP 상태 코드
 */
export interface ICustomCode {
  readonly code: string;
  readonly status: HttpStatus;
  readonly message: string;
}

export interface CustomExceptionResponse {
  code: string;
  message: string;
}
