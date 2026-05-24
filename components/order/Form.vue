<template>
    <form @submit.prevent="onSubmit" class="space-y-6 max-w-xl">
        <div class="space-y-2">
            <label
                class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                >Proveedor</label
            >
            <input
                v-model="provider"
                type="text"
                placeholder="Nombre del proveedor"
                class="w-full bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                :class="
                    errors.provider ? 'border-red-500 focus:ring-red-500' : ''
                "
            />
            <p class="text-xs text-red-500 h-4">{{ errors.provider }}</p>
        </div>

        <div class="space-y-2">
            <label
                class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                >Monto (COP)</label
            >
            <input
                v-model="amount"
                type="number"
                placeholder="0.00"
                class="w-full bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                :class="
                    errors.amount ? 'border-red-500 focus:ring-red-500' : ''
                "
            />
            <p class="text-xs text-red-500 h-4">{{ errors.amount }}</p>
        </div>

        <div class="space-y-2">
            <div class="flex justify-between items-center">
                <label
                    class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >Concepto</label
                >
                <span class="text-xs text-slate-400"
                    >{{ concept?.length || 0 }}/250</span
                >
            </div>
            <textarea
                v-model="concept"
                placeholder="Detalles de la orden..."
                class="w-full bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white h-32 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                :class="
                    errors.concept ? 'border-red-500 focus:ring-red-500' : ''
                "
            ></textarea>
            <p class="text-xs text-red-500 h-4">{{ errors.concept }}</p>
        </div>

        <div
            v-if="apiError"
            class="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm rounded-xl border border-red-200 dark:border-red-900/50"
        >
            {{ apiError }}
        </div>

        <button
            type="submit"
            :disabled="isSubmitting || !isValid"
            class="w-full bg-ginko hover:bg-indigo-700 text-white py-3.5 rounded-xl font-semibold disabled:bg-slate-300 dark:disabled:bg-slate-700 transition-all shadow-sm"
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
