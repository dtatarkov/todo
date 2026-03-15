import type { ViewModel } from "#shared/interfaces/viewmodel";

export default function useViewModel<D extends Record<string, any>>(viewmodel: ViewModel<D>)
{
  const response = useAsyncData(`viewmodel:${ viewmodel.name }`, async () =>
  {
    if(import.meta.server)
    {
      await viewmodel.updateData();
    }
    
    const data = viewmodel.getData();
    
    return data;
  }, {
    default: () => viewmodel.getData(),
  });  
  
  if (import.meta.client)
  {
    response.then(() => {
      viewmodel.setData(response.data.value as D);
      viewmodel.init();
    });

    const unsubscribe = viewmodel.subscribe(() =>
    {
      response.refresh();
    });

    onUnmounted(() =>
    {
      unsubscribe();
    });
  }

  return response.data;
}