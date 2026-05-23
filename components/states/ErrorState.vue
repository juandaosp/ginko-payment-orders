<script setup lang="ts">
defineProps<{ message: string }>();
</script>

<template>
    <div class="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
        <strong>Error:</strong> {{ message }}
    </div>
</template>
