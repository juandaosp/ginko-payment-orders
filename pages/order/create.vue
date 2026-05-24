<template>
    <div class="max-w-2xl mx-auto py-10 px-4">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Crear Nueva Orden</h1>
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
        router.push("/order");
    } catch (error) {
        return;
    }
};
</script>
