import { ServiceLocatorImpl } from "@/services/serviceLocatorImpl";

export function useServiceLocator()
{
  let serviceLocator = new ServiceLocatorImpl();
  
  setServiceLocator(serviceLocator);
}