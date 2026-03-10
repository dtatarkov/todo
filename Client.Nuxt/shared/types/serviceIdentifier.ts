import type { Constructor } from "#shared/types/constructor";
import type { AbstractConstructor } from "#shared/types/abstractConstructor";

export type ServiceIdentifier<T> = Constructor<T> | AbstractConstructor<T>;