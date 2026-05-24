<template>
    <div class="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700">
        <div v-if="validTransitions.length > 0">
            <h3
                class="text-sm font-semibold text-slate-900 dark:text-white mb-4"
            >
                Acciones disponibles
            </h3>
            <div class="flex flex-wrap gap-3">
                <button
                    v-for="status in validTransitions"
                    :key="status"
                    @click="confirmTransition(status)"
                    :class="[
                        'px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 border',
                        status === 'RECHAZADA'
                            ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/50 hover:bg-red-100'
                            : 'bg-ginko text-white border-transparent hover:bg-indigo-700 shadow-sm',
                    ]"
                >
                    <svg
                        v-if="status === 'APROBADA'"
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                        ></path>
                    </svg>
                    <svg
                        v-if="status === 'RECHAZADA'"
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                    <svg
                        v-if="status === 'PAGADA'"
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        ></path>
                    </svg>

                    {{ getLabel(status) }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PaymentOrder, OrderStatus } from "~/types";
import { useOrderStateTransition } from "~/composables/useOrderStateTransition";

const props = defineProps<{ order: PaymentOrder }>();

const selectedStatus = ref<OrderStatus | null>(null);

const { getValidTransitions } = useOrderStateTransition();

const validTransitions = computed(() =>
    getValidTransitions(props.order.status),
);

const getLabel = (status: OrderStatus) => {
    const labels: Record<string, string> = {
        APROBADA: "Aprobar Orden",
        RECHAZADA: "Rechazar Orden",
        PAGADA: "Registrar Pago",
    };
    return labels[status] || status;
};

const confirmTransition = (status: OrderStatus) => {
    selectedStatus.value = status;
};
</script>
