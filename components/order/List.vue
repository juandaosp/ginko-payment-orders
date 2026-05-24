<template>
    <div class="space-y-4">
        <div
            class="hidden md:block overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
        >
            <table
                class="min-w-full divide-y divide-slate-200 dark:divide-slate-700"
            >
                <thead class="bg-slate-50 dark:bg-slate-800">
                    <tr>
                        <th
                            class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                        >
                            Orden (ID)
                        </th>
                        <th
                            class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                        >
                            Proveedor
                        </th>
                        <th
                            class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
                        >
                            Estado
                        </th>
                    </tr>
                </thead>
                <tbody
                    class="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900"
                >
                    <OrderRow
                        v-for="order in paginatedOrders"
                        :key="order.id"
                        :order="order"
                        @click="$emit('order-click', order)"
                    />
                </tbody>
            </table>
        </div>

        <div class="md:hidden space-y-3">
            <OrderCard
                v-for="order in paginatedOrders"
                :key="order.id"
                :order="order"
            />
        </div>

        <PaginationControls
            v-if="totalPages > 1"
            :current-page="currentPage"
            :total-pages="totalPages"
            @prev="prevPage"
            @next="nextPage"
        />
    </div>
</template>

<script setup lang="ts">
import type { PaymentOrder } from "~/types";

const props = defineProps<{ orders: PaymentOrder[] }>();
const emit = defineEmits(["order-click"]);

const pageSize = 10;
const currentPage = ref(1);

const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;
    return props.orders.slice(start, end);
});

const totalPages = computed(() => Math.ceil(props.orders.length / pageSize));

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};
</script>
