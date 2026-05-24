<template>
    <div class="max-w-2xl mx-auto py-6 md:py-12 px-4">
        <NuxtLink
            to="/"
            class="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 mb-6"
        >
            <span class="mr-2">←</span> Cancelar y volver
        </NuxtLink>

        <h1 class="text-2xl font-bold text-gray-900 mb-6">Crear Nueva Orden</h1>

        <div
            class="bg-white p-4 md:p-8 rounded-xl shadow-sm border border-gray-100"
        >
            <OrderForm @success="handleSuccess" />
        </div>
    </div>
</template>

<script setup lang="ts">
const router = useRouter();
const orderStore = useOrderStore();

const handleSuccess = async (values: any) => {
    try {
        await orderStore.createOrder(values);
        router.push("/orders");
    } catch (error) {
        console.error("Error al crear la orden:", error);
    }
};
</script>
