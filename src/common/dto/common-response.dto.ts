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

  static success<T>(successCode: string, message: string, result: T): ApiCommonResponse<T> {
    return new ApiCommonResponse(true, successCode, message, result, null);
  }

  static fail(errorCode: string, reason: string, data: any): ApiCommonResponse<null> {
    return new ApiCommonResponse(false, errorCode, reason, null, data ?? null);
  }
}
