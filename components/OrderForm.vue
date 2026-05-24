<template>
    <form @submit.prevent="onSubmit" class="space-y-5">
        <div class="flex flex-col gap-1">
            <label class="text-sm font-semibold text-gray-700">Proveedor</label>
            <input
                v-model="provider"
                type="text"
                class="p-2 border rounded-md"
                :class="errors.provider ? 'border-red-500' : 'border-gray-300'"
            />
            <span class="text-xs text-red-500 h-4">{{ errors.provider }}</span>
        </div>

        <div class="flex flex-col gap-1">
            <label class="text-sm font-semibold text-gray-700"
                >Monto (COP)</label
            >
            <input
                v-model="amount"
                type="number"
                class="p-2 border rounded-md"
                :class="errors.amount ? 'border-red-500' : 'border-gray-300'"
            />
            <span class="text-xs text-red-500 h-4">{{ errors.amount }}</span>
        </div>

        <div class="flex flex-col gap-1">
            <div class="flex justify-between">
                <label class="text-sm font-semibold text-gray-700"
                    >Concepto</label
                >
                <span class="text-xs text-gray-500"
                    >{{ concept?.length || 0 }}/250</span
                >
            </div>
            <textarea
                v-model="concept"
                class="p-2 border rounded-md h-24"
                :class="errors.concept ? 'border-red-500' : 'border-gray-300'"
            ></textarea>
            <span class="text-xs text-red-500 h-4">{{ errors.concept }}</span>
        </div>

        <div
            v-if="apiError"
            class="p-2 bg-red-50 text-red-700 text-sm rounded border border-red-200"
        >
            {{ apiError }}
        </div>
        <button
            type="submit"
            :disabled="isSubmitting || !isValid"
            class="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
        >
            {{ isSubmitting ? "Procesando..." : "Crear Orden" }}
        </button>
    </form>
</template>

<script setup lang="ts">
const emit = defineEmits(["success"]);

const {
    provider,
    amount,
    concept,
    errors,
    isSubmitting,
    isValid,
    apiError,
    onSubmit,
} = useOrderForm((values) => {
    emit("success", values);
});
</script>
