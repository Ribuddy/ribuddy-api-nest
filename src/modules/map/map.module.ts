import { Module } from '@nestjs/common';

import { MapV1Controller } from '@modules/map/controllers/v1/map.v1.controller';
import { RoutesService } from '@modules/map/services/routes.service';
import { TmapModule } from '@modules/tmap/tmap.module';

@Module({
  imports: [TmapModule],
  controllers: [MapV1Controller],
  providers: [RoutesService],
})
export class MapModule {}
