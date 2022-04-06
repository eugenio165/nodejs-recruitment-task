import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app-config.module';
import { MONGOOSE_MODULE_CONSTANTS } from './constants/mongoose.constants';
import { MongoExceptionFilter } from './core/mongo-exception.filter';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    MongooseModule.forRootAsync(MONGOOSE_MODULE_CONSTANTS),
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
