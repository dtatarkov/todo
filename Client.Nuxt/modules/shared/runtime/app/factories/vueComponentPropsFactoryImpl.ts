import type { PropScheme } from "../types/propScheme";
import type { PropsScheme } from "../types/propsScheme";

export class PropsFactoryImpl
{
  create(data: Record<string, any>, propsScheme: PropsScheme): Record<string, any>
  {
    const props: Record<string, any> = reactive({});

    for (const [propName, propScheme] of Object.entries(propsScheme))
    {
      this.defineProp(props, propName, propScheme);
      this.defineEmitHandler(props, propName, propScheme);
    }

    return props;
  }

  private defineProp(props: Record<string, any>, propName: string, scheme: PropScheme)
  {
    props[propName] = ref(scheme.value);
  }

  private defineEmitHandler(props: Record<string, any>, propName: string, scheme: PropScheme)
  {
    if (!scheme.withEmit)
    {
      return;
    }

    const prop = props[propName];

    if (!prop)
    {
      throw new Error(`Prop ${ propName } not defined`);
    }

    props[`update:${ propName }`] = (value: any) =>
    {
      prop.value = value;
    }
  }
}