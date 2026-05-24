<script setup lang="ts">
import { useOrderStore } from "~/stores/orders";

const ordersStore = useOrderStore();
const { status, search, filteredOrders, updateFilters } = useOrderFilters();

const onFilterChange = (payload: { status: string; search: string }) => {
    updateFilters(payload.status, payload.search);
};

onMounted(() => {
    ordersStore.loadOrders();

    const router = useRouter();
    const route = useRoute();

    if (Object.keys(route.query).length > 0) {
        router.replace({ query: {} });
        updateFilters("Todos", "");
    }
});
</script>

<template>
    <div class="px-4 md:px-8 max-w-7xl mx-auto">
        <h1 class="text-xl md:text-2xl font-bold text-gray-800 mb-6">
            Gestión de Órdenes de Pago
        </h1>

        <FilterBar
            :status="status"
            :search="search"
            @filter-change="onFilterChange"
        />

        <ErrorState
            v-if="ordersStore.error"
            :message="ordersStore.error"
            @retry="ordersStore.loadOrders"
        />

        <LoadingState v-else-if="ordersStore.loading" />

        <EmptyState v-else-if="filteredOrders.length === 0" />

        <OrderList v-else :orders="filteredOrders" />
    </div>
</template>
