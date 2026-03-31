import { ServiceLocator } from "../interfaces/ServiceLocator";

export function useServiceLocator()
{
  const app            = useNuxtApp();
  const serviceLocator = app[`$${ ServiceLocator.name }`] as ServiceLocator;

  return serviceLocator;
}