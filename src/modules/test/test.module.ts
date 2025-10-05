import { Module } from '@nestjs/common';

import { ErrorTestController } from '@modules/test/controllers/error.test.controller';

@Module({
  imports: [],
  controllers: [ErrorTestController],
  providers: [],
  exports: [],
})
export class TestModule {}
