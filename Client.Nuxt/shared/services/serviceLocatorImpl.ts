import { Container } from "inversify";
import type { ServiceIdentifier } from "#shared/types/serviceIdentifier";
import { ServiceLocator } from "#shared/interfaces/serviceLocator";
import type { Constructor } from "#shared/types/constructor";

export class ServiceLocatorImpl extends ServiceLocator {
  private container = new Container();

  get<T>(serviceIdentifier: ServiceIdentifier<T>): T {
    return this.container.get(serviceIdentifier);
  }

  register<T>(serviceIdentifier: ServiceIdentifier<T>, service: Constructor<T>): void {
    this.container.bind(serviceIdentifier).to(service);
  }
}