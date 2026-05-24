<template>
    <div class="max-w-4xl mx-auto py-10 px-4">
        <div v-if="order">
            <OrderDetail :order="order" />

            <div class="mt-8 flex gap-3">
                <button
                    v-for="status in getValidTransitions(order.status)"
                    :key="status"
                    @click="transitionTo(status)"
                    class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                    {{ status }}
                </button>
            </div>
        </div>

        <ErrorState v-else message="La orden no existe" />
    </div>
</template>

<script setup lang="ts">
import { useOrderStateTransition } from "~/composables/useOrderStateTransition";
import type { OrderStatus } from "~/types";

const { canTransitionTo, getValidTransitions } = useOrderStateTransition();
const orderStore = useOrderStore();
const route = useRoute();

const order = computed(() =>
    orderStore.orders.find((o) => o.id === route.params.id),
);

const transitionTo = (newStatus: OrderStatus) => {
    if (order.value && canTransitionTo(order.value.status, newStatus)) {
        orderStore.updateOrderStatus(order.value.id, newStatus);
    }
};
</script>
