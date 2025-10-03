import { HttpException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

import { Request } from 'express';

import {
  CustomExceptionResponse,
  ExceptionDetails,
  ExceptionRequestInfo,
} from '@common/codes/code.type';
import { CustomException } from '@common/codes/custom.exception';
import { CommonErrorCode } from '@common/codes/error/common.error.code';

/**
 * CustomException의 정보를 파싱합니다.
 * @param exception
 */
export const parseCustomExceptionToErrorDetails = (
  exception: CustomException,
): ExceptionDetails => {
  const errorResponse = exception.getResponse() as CustomExceptionResponse;
  const httpStatusCode = exception.getStatus();

  return {
    name: exception.constructor.name,
    httpStatusCode,
    code: errorResponse.code,
    stack: exception.stack ?? undefined,
    message: errorResponse.message,
    data: null,
  };
};

/**
 * HttpException의 정보를 파싱합니다.
 * @param exception
 */
export const parseHttpExceptionToErrorDetails = (exception: HttpException): ExceptionDetails => {
  const errorResponse = exception.getResponse();
  const httpStatusCode = exception.getStatus();

  // ErrorCode와 Message는 고정
  // 디버깅 시에는 data에 있는 errorResponse를 확인해서, 왜 우리가 의도하지 않은 HttpException이 발생했는지 확인
  const { code: errorCode, message: errorMessage } = CommonErrorCode.UNKNOWN_HTTP_EXCEPTION;

  // console.log(errorResponse, 'errorResponse');

  return {
    name: exception.constructor.name,
    httpStatusCode,
    code: errorCode,
    stack: exception.stack ?? undefined,
    message: errorMessage,
    data: errorResponse,
  };
};

/**
 * Request의 정보를 파싱합니다.
 * @param ctx
 */
export const parseContextToRequestInfo = (ctx: HttpArgumentsHost): ExceptionRequestInfo => {
  const request = ctx.getRequest<Request>();

  return {
    method: request.method,
    url: request.originalUrl,
    ip: request.ip,
    headers: {
      userAgent: request.headers['user-agent'],
      referer: request.headers['referer'],
      referrer: request.headers['referrer'],
    },
  };
};
