<script setup lang="ts">
import { useOrderStore } from "~/stores/orders";

const ordersStore = useOrderStore();

const handleOrderClick = (order: any) => {
    console.log("Orden seleccionada:", order);
};

const handleFilterChange = (filters: { status: string; search: string }) => {
    console.log("Filtros aplicados:", filters);
    // AQUÍ es donde en el futuro llamaremos a la lógica de filtrado del store
    // Ejemplo: ordersStore.applyFilters(filters);
};

// Usamos onMounted para disparar la acción del store
onMounted(() => {
    ordersStore.loadOrders();
});
</script>

<template>
    <div class="p-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">
            Gestión de Órdenes de Pago
        </h1>

        <FilterBar @filter-change="handleFilterChange" />

        <ErrorState
            v-if="ordersStore.error"
            :message="ordersStore.error"
            @retry="ordersStore.loadOrders"
        />

        <LoadingState v-else-if="ordersStore.loading" />

        <EmptyState v-else-if="ordersStore.orders.length === 0" />

        <OrderList
            v-else
            :orders="ordersStore.orders"
            @order-click="handleOrderClick"
        />
    </div>
</template>
