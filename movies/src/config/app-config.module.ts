import { AppConfigService } from './app-config.service';
import { ConfigModule } from '@nestjs/config';
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule { }
