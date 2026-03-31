import type { ServiceIdentifier } from "../types/serviceIdentifier";
import { ServiceLocatorBase } from "../entities/serviceLocatorBase";

export function getService<T>(serviceIdentifier: ServiceIdentifier<T>): T
{
  let service = ServiceLocatorBase.instance.get(serviceIdentifier);

  return service;
}