export abstract class ViewElement
{
  abstract getRenderFunction(): () => object;
  abstract getVNode(): { setup: () => () => object };
}