<template>
    <div class="mt-8 pt-6 border-t border-gray-100">
        <div v-if="validTransitions.length > 0">
            <h3 class="text-sm font-medium text-gray-500 mb-4">
                Acciones disponibles
            </h3>
            <div class="flex flex-wrap gap-3">
                <button
                    v-for="status in validTransitions"
                    :key="status"
                    @click="confirmTransition(status)"
                    :class="[
                        'px-6 py-2.5 rounded-lg font-semibold transition-all shadow-sm flex items-center gap-2',
                        status === 'RECHAZADA'
                            ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700',
                    ]"
                >
                    <span v-if="status === 'APROBADA'">✅</span>
                    <span v-if="status === 'RECHAZADA'">❌</span>
                    <span v-if="status === 'PAGADA'">💰</span>
                    {{ getLabel(status) }}
                </button>
            </div>
        </div>

        <div v-else class="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <p class="text-gray-500 italic text-sm">
                No hay acciones disponibles para el estado actual.
            </p>
        </div>

        <ConfirmStateTransition
            v-if="selectedStatus"
            :order="order"
            :target-status="selectedStatus"
            @confirm="selectedStatus = null"
            @cancel="selectedStatus = null"
        />
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
