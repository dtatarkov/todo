import type { Action } from "~/types/action";

export function useViewAsyncData<T>(handler: () => Promise<T>): { data: Ref<T | undefined>, update: Action }
export function useViewAsyncData<T>(handler: () => Promise<T>, defaultData: T): { data: Ref<T>, update: Action }
export function useViewAsyncData<T>(loader: () => Promise<T>, defaultData?: T) {
  const data = ref(defaultData);
  
  async function update() {
    data.value = await loader();
  }
  
  update();
  
  return { data, update };
}