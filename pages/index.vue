<script setup lang="ts">
import { useOrderStore } from "../stores/orders";

const ordersStore = useOrderStore();

onMounted(() => {
    ordersStore.loadOrders();
});
</script>

<template>
    <div class="p-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">
            Gestión de Órdenes de Pago
        </h1>

        <LoadingState v-if="ordersStore.loading" />
        <ErrorState
            v-else-if="ordersStore.error"
            :message="ordersStore.error"
        />
        <EmptyState v-else-if="ordersStore.orders.length === 0" />

        <OrderList
            v-else
            :orders="ordersStore.orders"
            @order-click="(order) => console.log('Click en:', order)"
        />
    </div>
</template>
