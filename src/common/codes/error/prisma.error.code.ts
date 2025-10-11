import { HttpStatus } from '@nestjs/common';

import { CustomErrorCode } from '@common/codes/code.type';

export class PrismaErrorCode {
  public static readonly GENERAL: CustomErrorCode = {
    code: 'PRISMA0001',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Prisma ERROR.',
  };

  public static readonly UNIQUE_KEY_FAIL: CustomErrorCode = {
    code: 'PRISMA0001',
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Prisma ERROR.',
  };
}
