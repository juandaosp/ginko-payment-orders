<script setup lang="ts">
import type { PaymentOrder } from "~/types";
defineProps<{ order: PaymentOrder }>();
defineEmits(["click"]);
</script>

<template>
    <tr @click="$emit('click', order)" class="cursor-pointer hover:bg-gray-50">
        <td class="px-6 py-4">#{{ order.id }}</td>
        <td class="px-6 py-4">{{ order.providerName }}</td>
        <td class="px-6 py-4">{{ order.amount }}</td>
        <td class="px-6 py-4">{{ order.concept }}</td>
        <td class="px-6 py-4">{{ order.createdAt }}</td>
        <td class="px-6 py-4"><StatusBadge :status="order.status" /></td>
    </tr>
</template>
