<script setup lang="ts">
import { useOrderStore } from "../stores/orders";

const ordersStore = useOrderStore();

// Cargamos los datos al montar la página
onMounted(() => {
    ordersStore.loadOrders();
});
</script>

<template>
    <div class="p-8">
        <h1 class="text-2xl font-bold text-gray-800">
            Gestión de Órdenes de Pago
        </h1>
        <LoadingState v-if="ordersStore.loading" />
        <ErrorState
            v-else-if="ordersStore.error"
            :message="ordersStore.error"
        />
        <EmptyState v-else-if="ordersStore.orders.length === 0" />

        <ul v-else class="mt-6 space-y-4">
            <li
                v-for="order in ordersStore.orders"
                :key="order.id"
                class="p-4 border rounded shadow-sm"
            >
                <p class="font-semibold">Orden #{{ order.id }}</p>
                <p class="text-sm text-gray-600">
                    Proveedor: {{ order.providerName }}
                </p>
                <p class="text-sm font-bold">Estado: {{ order.status }}</p>
            </li>
        </ul>
    </div>
</template>
