import type { ServiceIdentifier } from "#shared/types/serviceIdentifier";
import type { Constructor } from "#shared/types/constructor";

export abstract class ServiceLocator {
  abstract get<T>(serviceIdentifier: ServiceIdentifier<T>): T;
  abstract register<T>(serviceIdentifier: ServiceIdentifier<T>, service: Constructor<T>): void;
}