<template>
    <tr
        @click="handleClick"
        class="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
    >
        <td
            class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white"
        >
            #{{ order.id.slice(-6) }}
        </td>
        <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
            {{ order.providerName }}
        </td>
        <td class="px-6 py-4">
            <StatusBadge class="hidden sm:inline-flex" :status="order.status" />
        </td>
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
