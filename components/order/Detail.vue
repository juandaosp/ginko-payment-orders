<template>
    <div class="space-y-8">
        <div class="flex justify-between items-start">
            <div>
                <h2
                    class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1"
                >
                    Detalle de Orden
                </h2>
                <p
                    class="text-3xl font-extrabold text-slate-900 dark:text-white"
                >
                    #{{ order.id }}
                </p>
            </div>
            <StatusBadge class="hidden sm:inline-flex" :status="order.status" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
                class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700"
            >
                <h3
                    class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1"
                >
                    Proveedor
                </h3>
                <p
                    class="text-lg font-medium text-slate-900 dark:text-slate-100"
                >
                    {{ order.providerName }}
                </p>
            </div>

            <div
                class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700"
            >
                <h3
                    class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1"
                >
                    Fecha
                </h3>
                <p
                    class="text-lg font-medium text-slate-900 dark:text-slate-100"
                >
                    {{ formatDate(order?.createdAt || "") }}
                </p>
            </div>

            <div
                class="md:col-span-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700"
            >
                <h3
                    class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1"
                >
                    Concepto
                </h3>
                <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {{ order.concept }}
                </p>
            </div>

            <div
                class="md:col-span-2 bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-900/50"
            >
                <h3
                    class="text-xs font-semibold text-ginko dark:text-indigo-400 uppercase mb-1"
                >
                    Monto total
                </h3>
                <p
                    class="text-4xl font-black text-indigo-700 dark:text-indigo-300"
                >
                    {{ formatCurrency(order.amount) }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PaymentOrder } from "~/types";

defineProps<{
    order: PaymentOrder;
}>();

// Helpers para formato
const formatCurrency = (val: number) =>
    new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    }).format(val);

const formatDate = (val: string) =>
    new Date(val).toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
</script>
