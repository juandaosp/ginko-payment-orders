<template>
    <div class="max-w-2xl mx-auto py-10 px-4">
        <div v-if="order">
            <h1 class="text-2xl font-bold mb-6">
                Detalle de la Orden #{{ order.id }}
            </h1>

            <div
                class="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
                <p class="mb-2">
                    <strong>Proveedor:</strong> {{ order.providerName }}
                </p>
                <p class="mb-2">
                    <strong>Monto:</strong> ${{ order.amount.toLocaleString() }}
                </p>
                <p class="mb-2">
                    <strong>Concepto:</strong> {{ order.concept }}
                </p>
                <p class="mb-2">
                    <strong>Fecha:</strong> {{ order.createdAt }}
                </p>
                <p class="mb-2"><strong>Estado:</strong> {{ order.status }}</p>
            </div>

            <button
                @click="navigateTo('/orders')"
                class="mt-6 text-blue-600 hover:underline"
            >
                ← Volver al listado
            </button>
        </div>

        <div v-else class="text-center py-10">
            <h2 class="text-xl font-semibold text-red-600">
                Orden no encontrada
            </h2>
            <p class="text-gray-500">
                La orden con ID {{ route.params.id }} no existe.
            </p>
            <button
                @click="navigateTo('/orders')"
                class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Volver al listado
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
const orderStore = useOrderStore();

// Buscamos la orden directamente en el store
const order = computed(() => {
    const paramId = String(route.params.id);
    // Nos aseguramos de convertir el id de la orden a string también
    return orderStore.orders.find((o) => String(o.id) === paramId);
});

onMounted(async () => {
    if (orderStore.orders.length === 0) {
        await orderStore.loadOrders();
    }
});
</script>
