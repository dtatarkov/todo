import type { VComponent } from "~/types/vcomponent";

export abstract class UIElement<Key extends string | number = string | number>
{
  abstract readonly id: Key;
  abstract readonly component: VComponent;
}