import type { ViewModel } from "#shared/interfaces/viewmodel";

export default function useViewModel<D extends Record<string, any>>(viewmodel: ViewModel<D>) {
  const { data, refresh } = useAsyncData(`viewmodel:${viewmodel.name}`, async () =>
  {
    await viewmodel.init();
    const data = viewmodel.getData();
    
    return data;
  }, {
    default: () => viewmodel.getData(),
  });
  
  function handleViewModelChange() {
    refresh();
  }
  
  viewmodel.subscribe(handleViewModelChange);
  
  onUnmounted(() => {
    viewmodel.unsubscribe(handleViewModelChange);
  });
  
  return data;
}