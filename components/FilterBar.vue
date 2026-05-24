<template>
    <div
        class="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-end"
    >
        <div class="flex-1 w-full">
            <label
                class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2"
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
                placeholder="Filtrar por nombre..."
                class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
        </div>

        <div class="w-full md:w-56">
            <label
                class="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2"
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
                class="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer"
            >
                <option value="Todos">Todos los estados</option>
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
