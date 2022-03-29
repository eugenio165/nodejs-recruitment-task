import { Injectable, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService extends ConfigService {

  get jwtSecret() {
    return this.get<string>('JWT_SECRET');
  }

}
