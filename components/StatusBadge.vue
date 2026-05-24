<script setup lang="ts">
defineProps<{ status: string }>();

const colors: Record<string, string> = {
    BORRADOR: "bg-gray-100 text-gray-800",
    APROBADA: "bg-green-100 text-gray-800",
    RECHAZADA: "bg-red-100 text-gray-800",
    PAGADA: "bg-blue-100 text-gray-800",
};
</script>

<template>
    <span
        :class="['px-2 py-1 rounded-full text-xs font-medium', colors[status]]"
    >
        {{ status }}
    </span>
</template>
