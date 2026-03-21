import type { Constructor } from "@/types/constructor";
import type { AbstractConstructor } from "@/types/abstractConstructor";

export type ServiceIdentifier<T> = Constructor<T> | AbstractConstructor<T>;