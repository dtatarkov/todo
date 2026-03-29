let lastElementId = 0;

export class UIElementId
{
  readonly value: string;

  constructor(prefix = '')
  {
    this.value = [prefix, lastElementId++].join('-');
  }
}