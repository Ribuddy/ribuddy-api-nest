import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';

import { Public } from '@modules/auth/decorators/public.decorator';
import { PoiSearchRequestDto } from '@modules/tmap/dto/poi-search-request.dto';
import { RouteRequestDto } from '@modules/tmap/dto/route-request.dto';
import { TmapRouteService } from '@modules/tmap/services/tmap-route.service';
import { TmapSearchService } from '@modules/tmap/services/tmap-search.service';

@Controller({
  path: 'map',
  version: '1',
})
@ApiTags(API_TAGS.MAP)
@ApiBearerAuth()
export class MapV1Controller {
  constructor(
    private readonly tmapRouteService: TmapRouteService,
    private readonly tmapSearchService: TmapSearchService,
  ) {}

  @ApiOperation({
    summary: '[WIP] Tmap 길찾기 API',
    deprecated: true,
  })
  @Post('routes')
  @Public()
  getRoute(@Body() routeRequestDto: RouteRequestDto) {
    return this.tmapRouteService.findRoute(routeRequestDto);
  }

  @ApiOperation({
    summary: '[WIP] Tmap 장소 찾기 API',
    deprecated: true,
  })
  @Post('search')
  @Public()
  searchPoi(@Body() poiRequestDto: PoiSearchRequestDto) {
    return this.tmapSearchService.searchPoi(poiRequestDto);
  }
}
