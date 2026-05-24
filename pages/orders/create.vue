<script setup lang="ts">
const orderStore = useOrderStore();
const router = useRouter();

const handleCreateOrder = async (values: any) => {
    const paymentOrder = {
        id: new Date().toISOString(),
        providerName: values.providerName,
        amount: Number(values.amount),
        concept: values.concept,
        status: "BORRADOR" as const,
    };
    await orderStore.createOrder(paymentOrder);
    router.push("/orders");
};
</script>

<template>
    <div class="max-w-xl mx-auto p-4">
        <h1 class="text-2xl font-bold mb-6 dark:text-white">
            Crear nueva orden
        </h1>
        <OrderForm @success="handleCreateOrder" />
    </div>
</template>
