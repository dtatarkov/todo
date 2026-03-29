import { InputElement } from "~/interfaces/inputElement";
import type { StringsService } from "~/interfaces/stringsService";

export abstract class InputElementComposedBase<V> extends InputElement<V>
{
  #id = ref('');

  protected abstract children: Record<string, InputElement>

  readonly component = {
    setup: () =>
    {
      const props = {
        class: 'flex gap-1'
      }

      const children = Object
        .values(this.children)
        .map(child => h(child.component));

      return () => h('div', props, children);
    }
  }

  constructor(
    protected stringsService: StringsService
  )
  {
    super();
  }

  get id(): string
  {
    return this.#id.value;
  }

  set id(newId)
  {
    this.#id.value = newId;

    Object
      .entries(this.children)
      .forEach(([childName, child]) =>
      {
        const id = !this.stringsService.isStringEmpty(newId) ?
          `${ newId }-${ childName.toLowerCase() }` :
          newId;

        child.setData({ id });
      });
  }

  setData(data: Record<string, any>)
  {
    let inputsData = { ...data }

    if (inputsData?.id)
    {
      this.id = inputsData.id;
      delete inputsData.id;
    }

    if (inputsData?.value)
    {
      if (inputsData?.value)
      {
        this.value = inputsData.value;
        delete inputsData.value;
      }
    }

    Object
      .values(this.children)
      .forEach(child =>
      {
        child.setData(inputsData)
      });
  }
}