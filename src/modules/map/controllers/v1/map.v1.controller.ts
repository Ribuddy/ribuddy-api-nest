import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';

import { Public } from '@modules/auth/decorators/public.decorator';
import { PoiSearchRequestDto } from '@modules/map/dto/poi-search-request.dto';
import { ReducedRouteRequestDto } from '@modules/map/dto/route-request.dto';
import { TmapRouteService } from '@modules/map/services/tmap-route.service';
import { TmapSearchService } from '@modules/map/services/tmap-search.service';

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
    summary: 'TMAP 길찾기',
    description: '시작점의 좌표와 도착점의 좌표를 받습니다.',
  })
  @Post('routes')
  @Public()
  getRoute(@Query() query: ReducedRouteRequestDto) {
    return this.tmapRouteService.findRoute({
      startX: query.startX,
      startY: query.startY,
      endX: query.endX,
      endY: query.endY,
    });
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
