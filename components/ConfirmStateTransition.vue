<template>
    <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm"
    >
        <div class="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full">
            <h3 class="text-lg font-bold text-gray-900 mb-2">
                Confirmar cambio de estado
            </h3>
            <p class="text-gray-600 mb-6">
                ¿Cambiar de <span class="font-bold">{{ order.status }}</span> a
                <span class="font-bold text-indigo-600">{{ targetStatus }}</span
                >?
            </p>

            <div
                v-if="error"
                class="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200"
            >
                {{ error }}
            </div>

            <div class="flex justify-end gap-3">
                <button
                    @click="$emit('cancel')"
                    :disabled="loading"
                    class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                    Cancelar
                </button>
                <button
                    @click="handleConfirm"
                    :disabled="loading"
                    class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                >
                    <span v-if="loading">Procesando...</span>
                    <span v-else>Confirmar</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PaymentOrder, OrderStatus } from "~/types";

const props = defineProps<{ order: PaymentOrder; targetStatus: OrderStatus }>();
const emit = defineEmits(["confirm", "cancel"]);

const store = useOrderStore();
const loading = ref(false);
const error = ref<string | null>(null);

const handleConfirm = async () => {
    loading.value = true;
    error.value = null;

    try {
        await store.updateOrderStatus(props.order.id, props.targetStatus);
        emit("confirm");
    } catch (err) {
        error.value =
            "Hubo un error al actualizar el estado. Por favor, intenta de nuevo.";
    } finally {
        loading.value = false;
    }
};
</script>
