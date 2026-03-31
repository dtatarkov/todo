import type { ServiceIdentifier } from "../types/serviceIdentifier";
import type { ServiceScope } from "../enums/serviceScope";
import { ServiceLocatorBase } from "../entities/serviceLocatorBase";

export function registerServiceFactory<T>(serviceIdentifier: ServiceIdentifier<T>, factory: () => T, scope?: ServiceScope): void
{
  ServiceLocatorBase.instance.registerFactory(serviceIdentifier, factory, scope);
}