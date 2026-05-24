import { useOrderStore } from "~/stores/orders";

export const useOrderFilters = () => {
  const route = useRoute();
  const router = useRouter();
  const store = useOrderStore();

  // Al usar ref con el valor de la query, el estado se inicializa
  // correctamente al recargar la página.
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
    return store.orders.filter((order) => {
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
