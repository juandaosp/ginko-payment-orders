<template>
    <div class="max-w-4xl mx-auto py-12 px-6">
        <h1 class="text-3xl font-bold mb-8">Bienvenido a Ginko</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NuxtLink
                to="/orders"
                class="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
            >
                <h2 class="text-xl font-semibold mb-2">Ver Órdenes</h2>
                <p class="text-gray-600">
                    Gestiona y revisa el histórico de todas tus órdenes de pago.
                </p>
            </NuxtLink>

            <NuxtLink
                to="/orders/create"
                class="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
            >
                <h2 class="text-xl font-semibold mb-2">Nueva Orden</h2>
                <p class="text-gray-600">
                    Registra una nueva orden de pago en el sistema.
                </p>
            </NuxtLink>
        </div>
        <div class="mt-8">
            <h3 class="text-lg font-medium mb-4">Acceso rápido a una orden</h3>
            <div class="flex gap-4">
                <input
                    v-model="searchId"
                    type="text"
                    placeholder="Escribe el ID (ej: 1)"
                    class="border rounded px-4 py-2 w-full max-w-xs"
                />
                <button
                    @click="navigateTo(`/orders/${searchId}`)"
                    :disabled="!searchId"
                    class="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
                >
                    Ir
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const searchId = ref("");
</script>
