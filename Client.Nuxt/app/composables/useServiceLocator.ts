import { ServiceLocatorImpl } from "#shared/services/serviceLocatorImpl";

export function useServiceLocator()
{
  let serviceLocator = new ServiceLocatorImpl();
  
  setServiceLocator(serviceLocator);
}