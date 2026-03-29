import { InputElement } from "@/interfaces/inputElement";
import { ValueMapper } from "~/interfaces/valueMapper";

type InputElementPropertyConfig = {
  data?: string;
  mapper?: ValueMapper<any, any>
  vmodel?: boolean
}

export abstract class InputElementBase<V = any> extends InputElement<V>
{
  protected data: Record<string, any> = reactive({
    id       : '',
    name     : '',
    autofocus: false,
  });

  protected staticData: Record<string, any> = reactive({
    class: 'w-full'
  });

  protected propertiesScheme: Record<string, InputElementPropertyConfig> = {
    id        : {},
    name      : {},
    autofocus : {},
    class     : {},
    modelValue: { data: 'value' }
  }

  get id(): string
  {
    return this.data.id;
  }

  set id(value: string)
  {
    this.data.id = value;
  }

  get value(): V
  {
    return this.data.value;
  }

  set value(value: V)
  {
    this.data.value = value;
  }

  override setData(data: Record<string, any>)
  {
    updatePropertiesWithData(this.data, data);
  }

  protected getProps(): Record<string, any>
  {
    const props = Object.entries(this.propertiesScheme).reduce((result, [propertyName, propertyConfig]) =>
    {
      this.defineProperty(result, propertyName, propertyConfig);

      if (propertyConfig.vmodel)
      {
        this.defineEmit(result, propertyName, propertyConfig);
      }

      return result;
    }, <Record<string, any>>{});

    return props;
  }

  private defineProperty(properties: Record<string, any>, propertyName: string, propertyConfig: InputElementPropertyConfig)
  {
    const dataKey        = this.getPropertyRelatedDataKey(propertyName, propertyConfig);
    const dataCollection = this.getDataCollectionByKey(dataKey);

    let propValue = dataCollection[dataKey];

    if (propertyConfig.mapper)
    {
      propValue = propertyConfig.mapper.map(propValue);
    }

    properties[propertyName] = propValue;
  }

  private defineEmit(properties: Record<string, any>, propertyName: string, propertyConfig: InputElementPropertyConfig)
  {
    const dataKey         = this.getPropertyRelatedDataKey(propertyName, propertyConfig);
    const dataCollection  = this.getDataCollectionByKey(dataKey);
    const emitHandlerName = `update:${ propertyName }`;

    properties[emitHandlerName] = (propertyValue: any) =>
    {
      let dataValue = propertyValue;

      if (propertyConfig.mapper)
      {
        dataValue = propertyConfig.mapper.mapReverse(dataValue);
      }

      dataCollection[dataKey] = dataValue;
    }
  }

  private getPropertyRelatedDataKey(propName: string, propConfig: InputElementPropertyConfig)
  {
    const dataKey = propConfig.data ?? propName;

    return dataKey;
  }

  private getDataCollectionByKey(key: string)
  {
    if (key in this.data)
    {
      return this.data;
    }

    if (key in this.staticData)
    {
      return this.staticData;
    }

    throw new Error('Unknown key');
  }
}