import type { ViewModel } from "#shared/interfaces/viewmodel";

export default function useViewModel<D extends Record<string, any>>(viewmodel: ViewModel<D>)
{
  const data = reactive(viewmodel.getData());

  const response = useAsyncData(`viewmodel:${ viewmodel.name }`, async () =>
  {
    viewmodel.init();
    await viewmodel.updateData();
    
    const data = viewmodel.getData();

    return data;
  }, {
    default: () => viewmodel.getData(),
  });

  if (import.meta.client)
  {
    const unsubscribe = viewmodel.subscribe(() =>
    {
      Object.assign(data, viewmodel.getData());
    });

    onUnmounted(() =>
    {
      unsubscribe();
    });

    response.then(() =>
    {
      viewmodel.setData(response.data.value as D);
    }).finally(() =>
    {
      viewmodel.init();
    });
  }

  return response.data;
}