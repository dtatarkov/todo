import type { PropsScheme } from "../types/propsScheme";

export abstract class PropsFactory
{
  abstract create(data: Record<string, any>, propsScheme: PropsScheme): Record<string, any>;
}