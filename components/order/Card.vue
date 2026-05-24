<template>
    <div
        @click="handleClick"
        class="p-4 border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-900 shadow-sm hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer flex flex-col gap-2"
    >
        <div class="flex justify-between items-center">
            <span class="font-bold text-slate-900 dark:text-white truncate">
                #{{ order.id }}
            </span>

            <StatusBadge class="hidden sm:block" :status="order.status" />
        </div>

        <p class="text-sm text-slate-500 dark:text-slate-400 truncate">
            {{ order.providerName }}
        </p>

        <div class="sm:hidden pt-1">
            <StatusBadge :status="order.status" class="w-full text-center" />
        </div>
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
