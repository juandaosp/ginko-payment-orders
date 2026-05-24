<template>
    <div class="max-w-4xl mx-auto py-10 px-4">
        <template v-if="order">
            <OrderDetail :order="order" />

            <StateTransitionButtons
                :order="order"
                @transition="handleTransition"
            />
        </template>

        <ErrorState
            v-else
            :message="`La orden con id: ${route.params.id} no existe`"
        />
    </div>
</template>

<script setup lang="ts">
import type { OrderStatus } from "~/types";

const route = useRoute();
const orderStore = useOrderStore();

const order = computed(() =>
    orderStore.orders.find((o) => o.id === route.params.id),
);

const handleTransition = async (newStatus: OrderStatus) => {
    if (order.value) {
        await orderStore.updateOrderStatus(order.value.id, newStatus);
    }
};
</script>
