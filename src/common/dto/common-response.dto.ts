export class ErrorPayload {
  data: any;
}

export class ApiCommonResponse<T = any> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T | null;
  error: ErrorPayload | null;

  private constructor(
    isSuccess: boolean,
    code: string,
    message: string,
    result: T | null,
    error: ErrorPayload | null,
  ) {
    this.isSuccess = isSuccess; // 요청 성공 여부를 boolean으로 표현
    this.code = code; // HTTP 상태코드가 아닌, 서비스 자체의 응답코드임
    this.message = message; // 요청 결과에 대한 간단한 설명
    this.result = result; // 응답 데이터
    this.error = error; // 에러 정보
  }

  /**
   * API 요청 성공 응답을 생성합니다.
   * @param successCode - 어플리케이션 자체 응답 코드 (string)
   * @param message - 요청 응답에 관한 간단한 메세지 (e.g. "게시글이 정상적으로 생성되었습니다.")
   * @param result - 응답 데이터 (필요 시)
   */
  static success<T>(successCode: string, message: string, result: T): ApiCommonResponse<T> {
    return new ApiCommonResponse(true, successCode, message, result, null);
  }

  /**
   * API 요청 실패 응답을 생성합니다.
   * @param errorCode - 어플리케이션 자체 에러 코드 (string)
   * @param reason - 요청 실패에 대한 간단한 설명 (e.g. "존재하지 않는 게시글입니다.")
   * @param data - 추가적인 에러 정보 (필요 시)
   */
  static fail(errorCode: string, reason: string, data: any): ApiCommonResponse<null> {
    return new ApiCommonResponse(false, errorCode, reason, null, data ?? null);
  }
}
