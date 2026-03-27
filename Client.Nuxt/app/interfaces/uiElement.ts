import type { RenderFunction } from "~/types/renderFunction";

export abstract class UIElement {
  abstract getVNode(): { setup: () => RenderFunction };
}