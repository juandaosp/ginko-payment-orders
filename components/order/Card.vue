<template>
    <div
        @click="handleClick"
        class="p-4 border rounded-lg shadow-sm bg-white cursor-pointer hover:bg-gray-50"
    >
        <div class="flex justify-between items-center mb-2">
            <span class="font-bold">#{{ order.id }}</span>
            <StatusBadge :status="order.status" />
        </div>
        <p class="text-sm text-gray-600">{{ order.providerName }}</p>
    </div>
</template>

<script setup lang="ts">
import type { PaymentOrder } from "~/types";

const props = defineProps<{ order: PaymentOrder }>();
const emit = defineEmits(["order-click"]);

const handleClick = () => {
    emit("order-click", props.order);
    navigateTo(`/orders/${props.order.id}`);
};
</script>
