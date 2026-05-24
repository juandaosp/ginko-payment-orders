import { useOrderStore } from "~/stores/orders";

export const useOrderFilters = () => {
  const route = useRoute();
  const router = useRouter();
  const store = useOrderStore();

  const status = computed(() => (route.query.status as string) || "Todos");
  const search = computed(() => (route.query.search as string) || "");

  const updateFilters = (newStatus: string, newSearch: string) => {
    router.push({
      query: {
        ...route.query,
        status: newStatus !== "Todos" ? newStatus : undefined,
        search: newSearch || undefined,
      },
    });
  };

  const filteredOrders = computed(() => {
    return store.orders.filter((order) => {
      const matchesStatus =
        status.value === "Todos" || order.status === status.value.toUpperCase(); // Convertimos a UPPERCASE para comparar

      const matchesSearch = (order.providerName || "")
        .toLowerCase()
        .includes(search.value.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  });

  return { status, search, filteredOrders, updateFilters };
};
