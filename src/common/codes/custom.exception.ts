import { HttpException } from '@nestjs/common';

import { CustomErrorCode } from '@common/codes/code.type';

export class CustomException extends HttpException {
  constructor(customCode: CustomErrorCode) {
    // HttpException의 constructor : response, status
    // 우리는 { code, message } 형태의 response를 전달
    super(
      {
        code: customCode.code,
        message: customCode.message,
      },
      customCode.status,
    );
  }
}
