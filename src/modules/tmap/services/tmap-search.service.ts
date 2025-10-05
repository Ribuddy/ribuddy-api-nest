import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, InternalServerErrorException, LoggerService } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

import { AxiosError } from 'axios';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { catchError, firstValueFrom } from 'rxjs';

import { inspectObject } from '@common/utils/inspect-object.util';

import { TMAP_CONFIG, TmapConfig } from '@modules/tmap/configs/tmap.config';
import { PoiSearchRequestDto } from '@modules/tmap/dto/poi-search-request.dto';

@Injectable()
export class TmapSearchService {
  private readonly TMAP_API_BASE_URL = 'https://apis.openapi.sk.com/tmap/pois';

  constructor(
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * @method searchPoi
   * @description 주어진 검색어와 옵션을 기반으로 장소(POI) 정보를 검색합니다.
   * @param {PoiSearchRequestDto} poiSearchRequestDto - POI 검색 요청에 필요한 파라미터 DTO
   * @returns {Promise<any>} API 응답 데이터를 Promise 형태로 반환합니다.
   * @throws {InternalServerErrorException} API 요청 실패 시 예외를 발생시킵니다.
   */
  async searchPoi(poiSearchRequestDto: PoiSearchRequestDto): Promise<any> {
    const tmapConfig = this.configService.getOrThrow<ConfigType<typeof TmapConfig>>(TMAP_CONFIG);
    const appKey = tmapConfig.appKey;
    const url = this.TMAP_API_BASE_URL;

    // 요청 헤더 구성
    const headers = {
      appKey: appKey,
      Accept: 'application/json',
    };

    // 요청 파라미터 구성 (searchKeyword는 URL 인코딩)
    const params = {
      ...poiSearchRequestDto,
      searchKeyword: encodeURIComponent(poiSearchRequestDto.searchKeyword),
      version: 1, // API 명세에 따라 version은 필수로 포함
    };

    this.logger.log(
      `Requesting POI search to TMAP API: ${url} with params: ${inspectObject(params)}`,
    );

    // HttpService를 사용하여 GET 요청을 보냅니다.
    const { data } = await firstValueFrom(
      this.httpService.get(url, { headers, params }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(`Failed to fetch POI data: ${inspectObject(error)}`, error.stack);
          throw new InternalServerErrorException('장소 정보를 가져오는 데 실패했습니다.');
        }),
      ),
    );

    this.logger.log(`Requested POI search to TMAP API: ${data}`);

    return data;
  }
}
