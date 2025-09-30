import { Injectable } from '@nestjs/common';

@Injectable()
export class RoutesService {
  constructor() {}

  findRoute() {
    return { message: 'Route found' };
  }
}
