import { HttpCode, HttpStatus, applyDecorators } from '@nestjs/common';

import { CustomErrorCode, CustomSuccessCode } from '@common/codes/code.type';
import { ResponseCode } from '@common/decorators/response/response-code.decorator';
import { ResponseMessage } from '@common/decorators/response/response-message.decorator';

export const CustomResponse = (customCode: CustomSuccessCode | CustomErrorCode) =>
  applyDecorators(
    ResponseCode(customCode.code),
    ResponseMessage(customCode.message),
    HttpCode(customCode.status ?? HttpStatus.OK),
  );
