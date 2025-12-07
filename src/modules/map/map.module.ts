import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { MapV1Controller } from '@modules/map/controllers/v1/map.v1.controller';
import { TmapRouteService } from '@modules/map/services/tmap-route.service';
import { TmapSearchService } from '@modules/map/services/tmap-search.service';

@Module({
  imports: [HttpModule],
  controllers: [MapV1Controller],
  providers: [TmapRouteService, TmapSearchService],
  exports: [TmapRouteService, TmapSearchService],
})
export class MapModule {}
