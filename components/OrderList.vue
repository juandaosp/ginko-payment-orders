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

const onOrderClick = (order: PaymentOrder) => {
    emit("order-click", order);
};
</script>

<template>
    <div class="order-list-container">
        <table class="hidden md:table min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                        Orden(id)
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                        Proveedor
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                        Monto
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                        Concepto
                    </th>
                    <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                        Fecha
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
                    v-for="order in paginatedOrders"
                    :key="order.id"
                    :order="order"
                    @click="onOrderClick(order)"
                />
            </tbody>
        </table>

        <div class="md:hidden space-y-4">
            <OrderCard
                v-for="order in paginatedOrders"
                :key="order.id"
                :order="order"
                @click="onOrderClick(order)"
            />
        </div>

        <div class="flex justify-center items-center gap-4 mt-6">
            <button
                :disabled="currentPage === 1"
                @click="prevPage"
                class="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
            >
                Anterior
            </button>

            <span class="text-sm"
                >Página {{ currentPage }} de {{ totalPages }}</span
            >

            <button
                :disabled="currentPage === totalPages"
                @click="nextPage"
                class="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
            >
                Siguiente
            </button>
        </div>
    </div>
</template>
