import { ServiceScope } from "../enums/serviceScope";
import { AppPublicRuntimeConfig } from "../interfaces/appRuntimeConfig";
import { DatesService } from "../interfaces/datesService";
import { StringsService } from "../interfaces/stringsService";
import { DatesServiceImpl } from "../services/datesServiceImpl";
import { StringsServiceImpl } from "../services/stringsServiceImpl";

export function useSharedServices()
{
  registerServiceFactory(AppPublicRuntimeConfig, () =>
  {
    const config = useRuntimeConfig();

    return config.public;
  }, ServiceScope.Singleton);
  
  registerServiceFactory(DatesService, () =>
  {
    const config = getService(AppPublicRuntimeConfig);
    const result = new DatesServiceImpl(config);

    return result;
  }, ServiceScope.Singleton);

  registerService(StringsService, StringsServiceImpl, ServiceScope.Singleton);
}