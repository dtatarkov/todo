export class SSRLoaderImpl implements SSRLoader
{
  async loadAsync<T>(key: string, handler: () => Promise<T>): Promise<T>
  {
    const response = await useAsyncData(key, handler);
    return response.data.value as T;
  }
}