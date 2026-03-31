import type { ServiceIdentifier } from "../types/serviceIdentifier";
import type { Constructor } from "../types/constructor";
import type { ServiceScope } from "../enums/serviceScope";
import { ServiceLocatorBase } from "../entities/serviceLocatorBase";

export function registerService<T>(serviceIdentifier: ServiceIdentifier<T>, service: Constructor<T>, scope?: ServiceScope): void
{
  ServiceLocatorBase.instance.register(serviceIdentifier, service, scope);
}