export abstract class ViewElement
{
  abstract readonly id: number;
  
  abstract getRenderFunction(): () => object;
  abstract getVNode(): { setup: () => () => object };
}