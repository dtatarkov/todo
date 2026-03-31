import type { ServiceIdentifier } from "@@/modules/shared/runtime/app/types/serviceIdentifier";
import type { Constructor } from "@@/modules/shared/runtime/app/types/constructor";
import { ServiceScope } from "@@/modules/shared/runtime/app/enums/serviceScope";

export abstract class ServiceLocator
{
  abstract get<T>(serviceIdentifier: ServiceIdentifier<T>): T

  abstract register<T>(serviceIdentifier: ServiceIdentifier<T>, service: Constructor<T>, scope?: ServiceScope): void

  abstract registerFactory<T>(serviceIdentifier: ServiceIdentifier<T>, factory: () => T, scope?: ServiceScope): void
}