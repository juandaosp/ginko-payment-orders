<script setup lang="ts">
import { useOrderStore } from "~/stores/orders";

const ordersStore = useOrderStore();
const { status, search, filteredOrders, updateFilters } = useOrderFilters();

const handleOrderClick = (order: any) => {
    console.log("Orden seleccionada:", order);
};

const handleFilterChange = (filters: { status: string; search: string }) => {
    console.log("Evento recibido en index.vue:", filters);
    updateFilters(filters.status, filters.search);
};

onMounted(() => {
    ordersStore.loadOrders();
});
</script>

<template>
    <div class="p-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">
            Gestión de Órdenes de Pago
        </h1>

        <FilterBar
            :status="status"
            :search="search"
            @filter-change="handleFilterChange"
        />

        <ErrorState
            v-if="ordersStore.error"
            :message="ordersStore.error"
            @retry="ordersStore.loadOrders"
        />

        <LoadingState v-else-if="ordersStore.loading" />

        <EmptyState v-else-if="filteredOrders.length === 0" />

        <OrderList
            v-else
            :orders="filteredOrders"
            @order-click="handleOrderClick"
        />
    </div>
</template>
