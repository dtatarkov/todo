import type { VComponentRenderFunction } from "#uikit/types/vcomponentRenderFunction";

export type VComponent = {
  setup(): VComponentRenderFunction
}