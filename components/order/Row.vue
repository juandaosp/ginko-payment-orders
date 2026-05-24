<template>
    <tr @click="handleClick" class="cursor-pointer hover:bg-gray-50">
        <td class="px-6 py-4">#{{ order.id }}</td>
        <td class="px-6 py-4">{{ order.providerName }}</td>
        <td class="px-6 py-4"><StatusBadge :status="order.status" /></td>
    </tr>
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
