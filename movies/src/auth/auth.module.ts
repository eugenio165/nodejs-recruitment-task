import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWT_MODULE_CONSTANTS } from './auth.constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(JWT_MODULE_CONSTANTS),
  ],
  providers: [JwtStrategy],
  exports: [],
})
export class AuthModule { }
