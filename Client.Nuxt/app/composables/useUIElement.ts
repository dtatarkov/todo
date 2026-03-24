import type { UIElement } from "~/interfaces/uiElement";

export function useUIElement<D extends Record<string, any>>(element: UIElement<D>)
{
  const response = useAsyncData(`uielement:${ element.name }`, async () =>
  {
    await element.init();
    
    return element.data;
  }, {
    default: () => element.data,
  });
  
  element.setData(response.data.value as D);
  
  const data = shallowReactive(element.data);

  const unsubscribe = element.subscribe(() =>
  {
    Object.assign(data, element.data);
  });

  onUnmounted(() =>
  {
    unsubscribe();
    element.destroy();
  });

  response.then(() =>
  {
    element.setData(response.data.value as D);
  });

  return data;
}