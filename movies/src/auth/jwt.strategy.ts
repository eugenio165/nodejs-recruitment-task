import { JwtPayload } from './jwt-payload.interface';
import { AppConfigService } from './../config/app-config.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly cfg: AppConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: cfg.jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.userId, name: payload.name, role: payload.role };
  }
}
