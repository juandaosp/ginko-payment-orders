import { useOrderStore } from "~/stores/orders";

export const useOrderFilters = () => {
  const route = useRoute();
  const router = useRouter();
  const store = useOrderStore();

  const status = ref((route.query.status as string) || "Todos");
  const search = ref((route.query.search as string) || "");

  const updateFilters = (newStatus: string, newSearch: string) => {
    status.value = newStatus;
    search.value = newSearch;

    router.push({
      query: {
        status: newStatus !== "Todos" ? newStatus : undefined,
        search: newSearch || undefined,
      },
    });
  };

  const filteredOrders = computed(() => {
    // CORRECCIÓN: Usamos el operador de coalescencia nula (??) para asegurar
    // que siempre trabajamos con un array, aunque sea vacío.
    const orders = store.orders ?? [];

    return orders.filter((order) => {
      const matchesStatus =
        status.value === "Todos" || order.status === status.value.toUpperCase();
      const matchesSearch = (order.providerName || "")
        .toLowerCase()
        .includes(search.value.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  });

  return { status, search, filteredOrders, updateFilters };
};
