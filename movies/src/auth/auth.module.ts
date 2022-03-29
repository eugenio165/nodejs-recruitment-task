import { JwtStrategy } from './jwt.strategy';
import { AppConfigService } from './../config/app-config.service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [AppConfigService],
      useFactory: (cfg: AppConfigService) => {
        return { secret: cfg.jwtSecret };
      },
    }),
  ],
  providers: [JwtStrategy],
  exports: [],
})
export class AuthModule { }
