import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GOOGLE_OAUTH_STRATEGY } from '@modules/auth/strategies/strategy.constants';

@Injectable()
export class GoogleOAuthGuard extends AuthGuard(GOOGLE_OAUTH_STRATEGY) {}
