<template>
    <div class="py-10 text-center text-red-600 dark:text-red-400">
        {{ message || "Error al cargar los datos" }}
    </div>
</template>

<script setup lang="ts">
defineProps<{ message?: string }>();
</script>
