import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { TmapRouteService } from '@modules/tmap/services/tmap-route.service';
import { TmapSearchService } from '@modules/tmap/services/tmap-search.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [TmapRouteService, TmapSearchService],
  exports: [TmapRouteService, TmapSearchService],
})
export class TmapModule {}
