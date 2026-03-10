import { DatesServiceImpl } from "#shared/services/datesServiceImpl";
import { DatesService } from "#shared/interfaces/datesService";

export function useApplicationServices()
{
  registerService(DatesService, DatesServiceImpl);
}