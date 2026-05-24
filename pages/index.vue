<script setup lang="ts">
import { useOrderStore } from "~/stores/orders";

const ordersStore = useOrderStore();

const handleOrderClick = (order: any) => {
    console.log("Orden seleccionada:", order);
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
