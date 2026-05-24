<template>
    <div class="max-w-3xl mx-auto py-8 px-4">
        <NuxtLink
            to="/orders"
            class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-6 transition-colors"
        >
            <svg
                class="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                />
            </svg>
            Volver a mis órdenes
        </NuxtLink>

        <div v-if="!order" class="text-center py-20">
            <div
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"
            ></div>
            <p class="mt-4 text-slate-500 dark:text-slate-400">
                Cargando detalles de la orden...
            </p>
        </div>

        <div
            v-else
            class="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300"
            :class="{ 'opacity-60 grayscale cursor-wait': isProcessing }"
        >
            <div class="flex justify-between items-start mb-8">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">
                    Detalle de Orden
                </h2>
                <span
                    class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                    ID: {{ order.id }}
                </span>
            </div>

            <OrderDetail :order="order" />

            <div
                class="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800"
            >
                <StateTransitionButtons
                    :order="order"
                    @transition="handleTransition"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { OrderStatus } from "~/types";

definePageMeta({ layout: "default" });

const route = useRoute();
const orderStore = useOrderStore();
const isProcessing = ref(false);

onMounted(() => {
    if (!orderStore.orders.length) {
        orderStore.loadOrders();
    }
});

const order = computed(() =>
    orderStore.orders.find((o) => o.id === route.params.id),
);

const handleTransition = async (newStatus: OrderStatus) => {
    if (!order.value) return;

    try {
        isProcessing.value = true;
        await orderStore.updateOrderStatus(order.value.id, newStatus);
    } catch (error) {
        console.error("Error al actualizar estado:", error);
        alert("No se pudo actualizar el estado. Inténtalo de nuevo.");
    } finally {
        isProcessing.value = false;
    }
};
</script>
