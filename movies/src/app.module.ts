import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app-config.module';
import { AppConfigService } from './config/app-config.service';
import { MongoExceptionFilter } from './core/mongo-exception.filter';
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
    MoviesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MongoExceptionFilter,
    },
  ],
})
export class AppModule { }
