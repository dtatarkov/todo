import type { ViewModel } from "#shared/interfaces/viewmodel";

export default function useViewModel<D extends Record<string, any>>(viewmodel: ViewModel<D>) {
  const data = reactive(viewmodel.getData()) as D;
  
  function handleViewModelChange() {
    Object.assign(data, viewmodel.getData());
  }
  
  viewmodel.subscribe(handleViewModelChange);  
  viewmodel.init();
  
  onUnmounted(() => {
    viewmodel.unsubscribe(handleViewModelChange);
  });
  
  return data;
}