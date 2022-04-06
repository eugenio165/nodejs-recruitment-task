import { MongooseModuleAsyncOptions } from "@nestjs/mongoose";
import { AppConfigService } from "src/config/app-config.service";

export const MONGOOSE_MODULE_CONSTANTS: MongooseModuleAsyncOptions = {
  inject: [AppConfigService],
  useFactory: (cfg: AppConfigService) => {
    return Promise.resolve({
      uri: cfg.mongo.uri,
      dbName: cfg.mongo.db,
      authSource: 'admin',
      autoCreate: true,
    });
  }
};
