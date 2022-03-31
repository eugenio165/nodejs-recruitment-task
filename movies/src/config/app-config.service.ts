import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService extends ConfigService {

  get jwtSecret() {
    return this.get<string>('JWT_SECRET');
  }

  get mongo() {
    const obj = {
      db: this.get<string>('MOVIES_DB'),
      host: this.get<string>('MOVIES_DB_HOST'),
      username: this.get<string>('MOVIES_DB_USERNAME'),
      password: this.get<string>('MOVIES_DB_PASSWORD'),
      port: this.get<number>('MOVIES_DB_PORT'),
    };

    return {
      ...obj,
      uri: `mongodb://${obj.username}:${obj.password}@${obj.host}:${obj.port}/${obj.db}`,
    }
  }

  get OMDbApiKey() {
    return this.get<string>('OMDB_API_KEY');
  }

}
