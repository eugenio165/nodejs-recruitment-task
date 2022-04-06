import { JwtModuleAsyncOptions } from "@nestjs/jwt";
import { AppConfigService } from "src/config/app-config.service";

export const JWT_MODULE_CONSTANTS: JwtModuleAsyncOptions = {
  inject: [AppConfigService],
  useFactory: (cfg: AppConfigService) => {
    return { secret: cfg.jwtSecret };
  },
};
