import type { RenderFunction } from "@/types/renderFunction";

export abstract class ViewElement
{
  abstract getRenderFunction(): RenderFunction;
  abstract getVNode(): { setup: () => RenderFunction };
}