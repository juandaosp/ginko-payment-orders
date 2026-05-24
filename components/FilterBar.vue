<template>
    <div
        class="filter-bar flex flex-col md:flex-row gap-4 p-4 bg-white border-b border-gray-200"
    >
        <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1"
                >Proveedor</label
            >
            <input
                type="text"
                :value="search"
                @input="
                    $emit('filter-change', {
                        status,
                        search: ($event.target as HTMLInputElement).value,
                    })
                "
                placeholder="Buscar por proveedor..."
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            />
        </div>

        <div class="w-full md:w-64">
            <label class="block text-sm font-medium text-gray-700 mb-1"
                >Estado</label
            >
            <select
                :value="status"
                @change="
                    $emit('filter-change', {
                        status: ($event.target as HTMLSelectElement).value,
                        search,
                    })
                "
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
            >
                <option value="Todos">Todos</option>
                <option value="Borrador">Borrador</option>
                <option value="Aprobada">Aprobada</option>
                <option value="Rechazada">Rechazada</option>
                <option value="Pagada">Pagada</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    status?: string;
    search?: string;
}>();

defineEmits(["filter-change"]);
</script>
