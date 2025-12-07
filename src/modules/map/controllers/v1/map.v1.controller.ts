import { Body, Controller, Get, Inject, LoggerService, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { API_TAGS } from '@common/constants/api-tags.constants';

import { Public } from '@modules/auth/decorators/public.decorator';
import { ReducedPoiSearchRequestDto } from '@modules/map/dto/poi-search-request.dto';
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
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}

  @ApiOperation({
    summary: '티맵 길찾기',

    description: '시작점의 좌표와 도착점의 좌표를 받습니다.',
  })
  @Post('routes')
  @Public()
  async getRoute(@Query() query: ReducedRouteRequestDto) {
    if (query.ridingRecordId) {
      const route: any | null = await this.tmapRouteService.getTeamRoutes(query.ridingRecordId);
      if (route) {
        this.logger.log(`라이딩 기록 ${query.ridingRecordId}에 대한 저장된 경로를 반환합니다.`);
        return route;
      }
    }

    const routes = await this.tmapRouteService.findRoute({
      startX: query.startX,
      startY: query.startY,
      endX: query.endX,
      endY: query.endY,
      carType: 7, // 이륜차로 고정
      searchOption: 12, // 이륜차 경로로 고정
    });

    // ridingRecord가 있을 경우에는 저장하도록 함
    if (query.ridingRecordId) {
      await this.tmapRouteService.saveTeamRoutes(query.ridingRecordId, routes);
    }

    return routes;
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
