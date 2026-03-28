import type { RenderFunction } from "~/types/renderFunction";

export abstract class UIElement<Key extends string | number = string | number>
{
  abstract readonly id: Key;

  abstract getVNode(): { setup: () => RenderFunction };
}