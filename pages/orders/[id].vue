<template>
    <div class="max-w-3xl mx-auto py-10 px-4">
        <div
            class="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
            <OrderDetail :order="order" />
            <StateTransitionButtons
                :order="order"
                @transition="handleTransition"
            />
        </div>
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
