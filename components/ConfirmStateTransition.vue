<template>
    <div
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
                    <span class="font-bold text-ginko"> {{ targetStatus }}</span
                    >.
                </p>
            </div>
            <div class="flex flex-col gap-2">
                <button
                    @click="handleConfirm"
                    class="w-full py-3 bg-ginko text-white rounded-xl font-bold hover:bg-indigo-700 transition"
                >
                    Sí, confirmar
                </button>
                <button
                    @click="handleCancel"
                    class="w-full py-3 text-gray-500 font-medium hover:bg-gray-50 rounded-xl transition"
                >
                    Cancelar
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
const handleCancel = () => {
    error.value = null;
    emit("cancel");
};
</script>
