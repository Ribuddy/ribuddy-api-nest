import { Module } from '@nestjs/common';

import { BasicTestController } from '@modules/test/controllers/basic.test.controller';
import { DBTestController } from '@modules/test/controllers/db.test.controller';
import { ErrorTestController } from '@modules/test/controllers/error.test.controller';

@Module({
  imports: [],
  controllers: [ErrorTestController, DBTestController, BasicTestController],
  providers: [],
  exports: [],
})
export class TestModule {}
