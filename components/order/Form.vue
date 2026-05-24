<template>
    <form @submit.prevent="onSubmit" class="space-y-6 max-w-xl">
        <div class="space-y-2">
            <label
                class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                >Proveedor</label
            >
            <input
                v-model="providerName"
                type="text"
                placeholder="Nombre del proveedor"
                class="w-full bg-slate-50 dark:bg-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-ginko outline-none"
                :class="errors.providerName ? 'border-red-500' : ''"
            />
            <p class="text-xs text-red-500 h-4">{{ errors.providerName }}</p>
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
                class="w-full bg-slate-50 dark:bg-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-ginko outline-none"
                :class="errors.amount ? 'border-red-500' : ''"
            />
            <p class="text-xs text-red-500 h-4">{{ errors.amount }}</p>
        </div>

        <div class="space-y-2">
            <label
                class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                >Concepto</label
            >
            <textarea
                v-model="concept"
                placeholder="Detalles..."
                class="w-full bg-slate-50 dark:bg-slate-900 dark:text-white p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-ginko outline-none h-32"
                :class="errors.concept ? 'border-red-500' : ''"
            ></textarea>
            <p class="text-xs text-red-500 h-4">{{ errors.concept }}</p>
        </div>

        <button
            type="submit"
            :disabled="isSubmitting || !isValid"
            class="w-full bg-ginko text-white py-3.5 rounded-xl font-semibold disabled:bg-slate-300 transition-all"
        >
            {{ isSubmitting ? "Procesando..." : "Crear Orden" }}
        </button>
    </form>
</template>

<script setup lang="ts">
const emit = defineEmits(["success"]);
const {
    providerName,
    amount,
    concept,
    errors,
    isSubmitting,
    isValid,
    onSubmit,
} = useOrderForm((values) => {
    emit("success", values);
});
</script>
