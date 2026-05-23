import { ref } from "vue";

export function useApi<T>(fn: () => Promise<T>) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const execute = async () => {
    loading.value = true;
    error.value = null;
    try {
      data.value = await fn();
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Error desconocido";
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, error, execute };
}
