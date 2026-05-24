<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <h1
            class="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-5"
        >
            Gestión de Órdenes
        </h1>

        <FilterBar
            :status="status"
            :search="search"
            @filter-change="onFilterChange"
        />

        <div class="transition-opacity duration-500">
            <ErrorState
                v-if="ordersStore.error"
                :message="ordersStore.error"
                @retry="ordersStore.loadOrders"
            />
            <LoadingState v-else-if="ordersStore.loading" />
            <EmptyState v-else-if="filteredOrders.length === 0" />
            <OrderList v-else :orders="filteredOrders" />
        </div>
    </div>
</template>

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
