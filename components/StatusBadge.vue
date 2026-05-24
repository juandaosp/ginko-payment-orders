<template>
    <span
        :class="[
            'inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors',
            statusColors[status as keyof typeof statusColors] ||
                statusColors.DEFAULT,
        ]"
    >
        {{ status }}
    </span>
</template>

<script setup lang="ts">
defineProps<{ status: string }>();

const statusColors = {
    // En modo claro: Fondo pastel, texto oscuro.
    // En modo oscuro (dark:): Fondo oscuro, texto claro.
    BORRADOR: "bg-gray-100 text-gray-700 dark:bg-gray-500 dark:text-white",
    APROBADA:
        "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400",
    RECHAZADA: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-white",
    PAGADA: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-white",
    DEFAULT:
        "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};
</script>
