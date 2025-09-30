import { HttpException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

import { Request } from 'express';

export const parseHttpExceptionToErrorDetails = (exception: HttpException) => {
  const errorResponse = exception.getResponse();
  const httpStatusCode = exception.getStatus();
  const errorCode = (errorResponse as any).errorCode ?? 'UNKNOWN_ERROR';
  const errorMessage = extractErrorDetails(errorResponse);

  const errorDetails = {
    name: exception.constructor.name,
    httpStatusCode,
    code: errorCode,
    stack: exception.stack ?? undefined,
    message: errorMessage,
  };

  return errorDetails;
};

const extractErrorDetails = (errorResponse: string | object): string | object => {
  // 1. errorResponse가 객체이고, 내부에 message 속성이 있는 경우
  if (typeof errorResponse === 'object' && errorResponse !== null && 'message' in errorResponse) {
    return (errorResponse as { message: string | object }).message;
  }

  // 2. 그 외의 경우 (문자열이거나, message 속성이 없는 객체)는 그대로 반환
  // 이 경우, errorResponse 자체가 중요한 정보입니다.
  return errorResponse;
};

export const parseContextToRequestInfo = (ctx: HttpArgumentsHost) => {
  const request = ctx.getRequest<Request>();

  // 3. 요청 정보 상세화
  const requestInfo = {
    method: request.method,
    url: request.originalUrl,
    ip: request.ip,
    userAgent: request.headers['user-agent'],
    referer: request.headers['referer'] || request.headers['referrer'],
  };

  return requestInfo;
};
