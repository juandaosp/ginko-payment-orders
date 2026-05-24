<template>
    <div class="max-w-4xl mx-auto px-4">
        <NuxtLink
            to="/orders"
            class="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 mb-6 transition-colors"
        >
            <span class="mr-2">←</span> Volver al listado
        </NuxtLink>

        <div v-if="orderStore.loading" class="flex justify-center py-20">
            <LoadingState />
        </div>

        <template v-else-if="order">
            <div
                class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-8 space-y-6"
            >
                <OrderDetail :order="order" />
                <StateTransitionButtons
                    :order="order"
                    @transition="handleTransition"
                />
            </div>
        </template>

        <ErrorState
            v-else
            :message="`La orden con id: ${route.params.id} no existe`"
        />
    </div>
</template>

<script setup lang="ts">
import type { OrderStatus } from "~/types";

definePageMeta({
    layout: "default",
});

const route = useRoute();
const orderStore = useOrderStore();

onMounted(() => {
    if (!orderStore.orders.length) {
        orderStore.loadOrders();
    }
});

const order = computed(() =>
    orderStore.orders.find((o) => o.id === route.params.id),
);

const handleTransition = async (newStatus: OrderStatus) => {
    if (order.value) {
        await orderStore.updateOrderStatus(order.value.id, newStatus);
    }
};
</script>
