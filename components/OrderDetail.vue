<template>
    <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div class="flex justify-between items-start mb-8">
            <div>
                <h2
                    class="text-sm font-semibold text-gray-500 uppercase tracking-wider"
                >
                    Detalle de Orden
                </h2>
                <p class="text-3xl font-bold text-gray-900">#{{ order.id }}</p>
            </div>
            <StatusBadge :status="order.status" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 class="text-sm font-medium text-gray-500">Proveedor</h3>
                <p class="text-lg text-gray-900">{{ order.providerName }}</p>
            </div>

            <div>
                <h3 class="text-sm font-medium text-gray-500">
                    Fecha de creación
                </h3>
                <p class="text-lg text-gray-900">
                    {{ formatDate(order?.createdAt || "") }}
                </p>
            </div>

            <div class="md:col-span-2">
                <h3 class="text-sm font-medium text-gray-500">Concepto</h3>
                <p class="text-lg text-gray-900">{{ order.concept }}</p>
            </div>

            <div>
                <h3 class="text-sm font-medium text-gray-500">Monto total</h3>
                <p class="text-2xl font-bold text-indigo-600">
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
