<template>
    <div class="order-list-container">
        <table class="hidden md:table min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                        Orden
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                        Proveedor
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                        Estado
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
                <OrderRow
                    v-for="order in orders"
                    :key="order.id"
                    :order="order"
                    @click="onOrderClick(order)"
                />
            </tbody>
        </table>

        <div class="md:hidden space-y-4">
            <OrderCard
                v-for="order in orders"
                :key="order.id"
                :order="order"
                @click="onOrderClick(order)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PaymentOrder } from "~/types";

defineProps<{ orders: PaymentOrder[] }>();
const emit = defineEmits(["order-click"]);

const onOrderClick = (order: PaymentOrder) => {
    emit("order-click", order);
};
</script>
