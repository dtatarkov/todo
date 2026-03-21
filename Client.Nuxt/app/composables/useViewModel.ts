import type { ViewModel } from "@/interfaces/viewmodel";

export default function useViewModel<D extends Record<string, any>>(viewmodel: ViewModel<D>)
{
  const response = useAsyncData(`viewmodel:${ viewmodel.name }`, async () =>
  {
    viewmodel.init();
    await viewmodel.updateData();
    const data = viewmodel.getData();

    return data;
  }, {
    default: () => viewmodel.getData(),
  });

  const data = reactive(response.data.value as D);

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
    if (import.meta.client)
    {
      viewmodel.init();
    }
  });

  return data;
}