import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { API_TAGS } from '@common/constants/api-tags.constants';

import { Public } from '@modules/auth/decorators/public.decorator';
import {
  PoiSearchRequestDto,
  ReducedPoiSearchRequestDto,
} from '@modules/map/dto/poi-search-request.dto';
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
    summary: '티맵 길찾기',
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
      carType: 7, // 이륜차로 고정
      searchOption: 12, // 이륜차 경로로 고정
    });
  }

  @ApiOperation({
    summary: '티맵 장소 찾기 API',
  })
  @Post('search')
  @Public()
  searchPoi(@Body() poiRequestDto: ReducedPoiSearchRequestDto) {
    return this.tmapSearchService.searchPoi(poiRequestDto);
  }
}
