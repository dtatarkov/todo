export abstract class ViewElement
{
  abstract readonly id: string;
  
  abstract getVNode(): object;
}