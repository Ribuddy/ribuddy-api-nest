import { Module } from '@nestjs/common';

import { DBTestController } from '@modules/test/controllers/db.test.controller';
import { ErrorTestController } from '@modules/test/controllers/error.test.controller';

@Module({
  imports: [],
  controllers: [ErrorTestController, DBTestController],
  providers: [],
  exports: [],
})
export class TestModule {}
