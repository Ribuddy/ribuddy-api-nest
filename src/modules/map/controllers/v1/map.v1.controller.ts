import { Body, Controller, Get, Post } from '@nestjs/common';

import { Public } from '@modules/auth/decorators/public.decorator';
import { PoiSearchRequestDto } from '@modules/tmap/dto/poi-search-request.dto';
import { RouteRequestDto } from '@modules/tmap/dto/route-request.dto';
import { TmapRouteService } from '@modules/tmap/services/tmap-route.service';
import { TmapSearchService } from '@modules/tmap/services/tmap-search.service';

@Controller({
  path: 'map',
  version: '1',
})
export class MapV1Controller {
  constructor(
    private readonly tmapRouteService: TmapRouteService,
    private readonly tmapSearchService: TmapSearchService,
  ) {}

  @Post('routes')
  @Public()
  getRoute(@Body() routeRequestDto: RouteRequestDto) {
    return this.tmapRouteService.findRoute(routeRequestDto);
  }

  @Post('search')
  @Public()
  searchPoi(@Body() poiRequestDto: PoiSearchRequestDto) {
    return this.tmapSearchService.searchPoi(poiRequestDto);
  }
}
