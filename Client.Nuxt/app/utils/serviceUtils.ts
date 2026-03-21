import type { ServiceLocator } from "@/interfaces/serviceLocator";
import type { ServiceIdentifier } from "@/types/serviceIdentifier";
import type { Constructor } from "@/types/constructor";
import type { ServiceScope } from "@/enums/serviceScope";

let serviceLocator: ServiceLocator | undefined;

export function setServiceLocator(newServiceLocator: ServiceLocator) {
  serviceLocator = newServiceLocator;
}

export function getService<T>(serviceIdentifier: ServiceIdentifier<T>): T
{
  if(!serviceLocator)
  {
    throw new Error('Service locator is not defined');
  }
  
  let service = serviceLocator.get(serviceIdentifier);
  
  return service;
}

export function registerService<T>(serviceIdentifier: ServiceIdentifier<T>, service: Constructor<T>, scope?: ServiceScope): void {
  if(!serviceLocator)
  {
    throw new Error('Service locator is not defined');
  }

  serviceLocator.register(serviceIdentifier, service, scope);
}

export function registerServiceFactory<T>(serviceIdentifier: ServiceIdentifier<T>, factory: () => T, scope?: ServiceScope): void {
  if(!serviceLocator)
  {
    throw new Error('Service locator is not defined');
  }

  serviceLocator.registerFactory(serviceIdentifier, factory, scope);
}