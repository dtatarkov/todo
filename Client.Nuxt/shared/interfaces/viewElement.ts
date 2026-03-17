import type { RenderFunction } from "#shared/types/renderFunction";

export abstract class ViewElement
{
  abstract getRenderFunction(): RenderFunction;
  abstract getVNode(): { setup: () => RenderFunction };
}