import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

import { AxiosError } from 'axios';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { catchError, firstValueFrom } from 'rxjs';

import { inspectObject } from '@common/utils/inspect-object.util';

import { TmapConfig } from '@modules/tmap/configs/tmap.config';
import { RouteRequestDto } from '@modules/tmap/dto/route-request.dto';

@Injectable()
export class TmapRouteService {
  // TMAP 등 외부 API의 기본 URL
  private readonly TMAP_API_BASE_URL = 'https://apis.openapi.sk.com/tmap/routes';

  constructor(
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    @Inject(TmapConfig.KEY) private readonly tmapConfig: ConfigType<typeof TmapConfig>,
  ) {}

  /**
   * @method findRoute
   * @description 주어진 출발지와 목적지 및 옵션을 기반으로 최적의 경로를 검색합니다.
   * @param {RouteRequestDto} routeRequestDto - 길찾기 요청에 필요한 파라미터 DTO
   * @returns {Promise<any>} API 응답 데이터를 Promise 형태로 반환합니다.
   * @throws {InternalServerErrorException} API 요청 실패 시 예외를 발생시킵니다.
   */
  async findRoute(routeRequestDto: RouteRequestDto): Promise<any> {
    // 필수 파라미터인 appKey를 환경 변수에서 가져옵니다.
    const appKey = this.tmapConfig.appKey;

    // API 요청 URL
    const url = `${this.TMAP_API_BASE_URL}`;

    // 요청 본문(body) 데이터 구성
    const requestBody = {
      ...routeRequestDto,
      // startName과 endName을 URL 인코딩 처리
      startName: encodeURIComponent(routeRequestDto.startName || '출발지'),
      endName: encodeURIComponent(routeRequestDto.endName || '도착지'),
    };

    const headers = {
      appKey: appKey,
      'Content-Type': 'application/json',
      version: '1',
    };

    this.logger.log(`Requesting route to TMAP API: ${url} ${requestBody}`);

    // HttpService를 사용하여 POST 요청을 보냅니다.
    const { data } = await firstValueFrom(
      this.httpService.post(url, requestBody, { headers }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(`Failed to fetch route data: ${inspectObject(error)}`, error.stack);
          throw new InternalServerErrorException('경로 데이터를 가져오는 데 실패했습니다.');
        }),
      ),
    );

    return data;
  }
}
