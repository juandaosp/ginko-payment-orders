<template>
    <div class="flex justify-between items-center py-4">
        <button
            @click="$emit('prev')"
            :disabled="currentPage === 1"
            class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700"
        >
            Anterior
        </button>

        <span class="text-sm text-slate-500 dark:text-slate-400"
            >Página {{ currentPage }} de {{ totalPages }}</span
        >

        <button
            @click="$emit('next')"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-50 hover:bg-slate-50 dark:hover:bg-slate-700"
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
