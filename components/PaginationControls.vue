<template>
    <div class="flex justify-center items-center gap-4 mt-6">
        <button
            :disabled="currentPage === 1"
            @click="$emit('prev')"
            class="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
        >
            Anterior
        </button>
        <span class="text-sm"
            >Página {{ currentPage }} de {{ totalPages }}</span
        >
        <button
            :disabled="currentPage === totalPages"
            @click="$emit('next')"
            class="px-4 py-2 bg-gray-100 rounded disabled:opacity-50"
        >
            Siguiente
        </button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    currentPage: number;
    totalPages: number;
}>();

defineEmits(["prev", "next"]);
</script>
