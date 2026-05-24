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
                v-model="localSearch"
                placeholder="Buscar por proveedor..."
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                @input="emitFilterChange"
            />
        </div>

        <div class="w-full md:w-64">
            <label class="block text-sm font-medium text-gray-700 mb-1"
                >Estado</label
            >
            <select
                v-model="localStatus"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                @change="emitFilterChange"
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
const props = defineProps<{
    status?: string;
    search?: string;
}>();

const emit = defineEmits(["filter-change"]);

// Estados locales inicializados con props
const localStatus = ref(props.status || "Todos");
const localSearch = ref(props.search || "");

const emitFilterChange = () => {
    emit("filter-change", {
        status: localStatus.value,
        search: localSearch.value,
    });
};
</script>
