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

        <div
            v-if="showModal"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm"
        >
            <div
                class="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-gray-100"
            >
                <div class="text-center">
                    <div
                        class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-4"
                    >
                        <span class="text-2xl">❓</span>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">
                        ¿Confirmar cambio?
                    </h3>
                    <p class="text-gray-600 mb-8">
                        Estás a punto de marcar esta orden como
                        <span class="font-bold text-indigo-600">{{
                            targetStatus
                        }}</span
                        >.
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <button
                        @click="execute"
                        class="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
                    >
                        Sí, confirmar
                    </button>
                    <button
                        @click="showModal = false"
                        class="w-full py-3 text-gray-500 font-medium hover:bg-gray-50 rounded-xl transition"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PaymentOrder, OrderStatus } from "~/types";
import { useOrderStateTransition } from "~/composables/useOrderStateTransition";

const props = defineProps<{ order: PaymentOrder }>();
const emit = defineEmits(["transition"]);

const { getValidTransitions } = useOrderStateTransition();
const showModal = ref(false);
const targetStatus = ref<OrderStatus | null>(null);

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
    targetStatus.value = status;
    showModal.value = true;
};

const execute = () => {
    if (targetStatus.value) {
        emit("transition", targetStatus.value);
        showModal.value = false;
    }
};
</script>
