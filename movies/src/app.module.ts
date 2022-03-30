import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app-config.module';
import { AppConfigService } from './config/app-config.service';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    MongooseModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (cfg: AppConfigService) => {
        return Promise.resolve({
          uri: cfg.mongo.uri,
          dbName: cfg.mongo.db,
          authSource: 'admin',
          autoCreate: true,
        });
      }
    }),
    MoviesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
