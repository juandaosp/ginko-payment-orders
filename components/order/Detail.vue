<template>
    <div class="space-y-8">
        <div
            class="flex justify-between items-start pb-6 border-b border-slate-100 dark:border-slate-800"
        >
            <div>
                <h2
                    class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1"
                >
                    Referencia de Orden
                </h2>
                <p
                    class="text-3xl font-black text-slate-900 dark:text-white font-mono"
                >
                    #{{ order.id.slice(-8) }}
                </p>
            </div>
            <StatusBadge :status="order.status" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
                class="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors"
            >
                <h3
                    class="flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2"
                >
                    <span class="mr-2">🏢</span> Proveedor
                </h3>
                <p
                    class="text-lg font-semibold text-slate-900 dark:text-slate-100"
                >
                    {{ order.providerName }}
                </p>
            </div>

            <div
                class="bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors"
            >
                <h3
                    class="flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2"
                >
                    <span class="mr-2">📅</span> Fecha de Registro
                </h3>
                <p
                    class="text-lg font-semibold text-slate-900 dark:text-slate-100 capitalize"
                >
                    {{ formatDate(order?.createdAt || "") }}
                </p>
            </div>

            <div
                class="md:col-span-2 bg-slate-50/50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800"
            >
                <h3
                    class="flex items-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2"
                >
                    <span class="mr-2">📝</span> Concepto
                </h3>
                <p
                    class="text-slate-700 dark:text-slate-300 leading-relaxed italic"
                >
                    "{{ order.concept }}"
                </p>
            </div>

            <div
                class="md:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl shadow-lg shadow-indigo-500/20"
            >
                <h3
                    class="text-xs font-bold text-indigo-100 uppercase tracking-widest mb-1 opacity-80"
                >
                    Monto Total a Pagar
                </h3>
                <p
                    class="text-5xl font-black text-white tabular-nums tracking-tight"
                >
                    {{ formatCurrency(order.amount) }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PaymentOrder } from "~/types";

defineProps<{ order: PaymentOrder }>();

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
