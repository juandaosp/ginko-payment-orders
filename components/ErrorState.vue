<template>
    <div class="p-4 text-center">
        <p class="text-red-600 mb-4">{{ message }}</p>
        <button
            @click="$emit('retry')"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
            Reintentar
        </button>
    </div>
</template>

<script setup lang="ts">
defineProps<{ message: string }>();
defineEmits(["retry"]);
</script>
