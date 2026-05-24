<template>
    <div class="max-w-3xl mx-auto py-16 px-6">
        <div class="mb-12">
            <h1
                class="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2"
            >
                Bienvenido a Ginko
            </h1>
            <p class="text-lg text-slate-500 dark:text-slate-400">
                Gestiona tus operaciones financieras con total control.
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <NuxtLink
                to="/orders"
                class="group p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-indigo-500/10 hover:border-indigo-500/50 transition-all duration-300"
            >
                <div
                    class="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-ginko dark:text-indigo-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                >
                    <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                        ></path>
                    </svg>
                </div>
                <h2
                    class="text-xl font-bold text-slate-900 dark:text-white mb-2"
                >
                    Ver Órdenes
                </h2>
                <p
                    class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed"
                >
                    Revisa el histórico, aplica filtros y gestiona el estado de
                    tus pagos.
                </p>
            </NuxtLink>

            <NuxtLink
                to="/orders/create"
                class="group p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-emerald-500/10 hover:border-emerald-500/50 transition-all duration-300"
            >
                <div
                    class="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                >
                    <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                </div>
                <h2
                    class="text-xl font-bold text-slate-900 dark:text-white mb-2"
                >
                    Nueva Orden
                </h2>
                <p
                    class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed"
                >
                    Registra una nueva orden de pago con validación en tiempo
                    real.
                </p>
            </NuxtLink>
        </div>

        <div
            class="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700"
        >
            <h3
                class="text-sm font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-4"
            >
                Acceso rápido a una orden
            </h3>
            <div class="relative flex flex-col sm:flex-row gap-3">
                <div class="relative flex-1">
                    <div
                        class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                    >
                        <svg
                            class="w-5 h-5 text-slate-400 dark:text-slate-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                    <input
                        v-model="searchId"
                        type="text"
                        placeholder="Buscar por ID..."
                        class="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-ginko outline-none transition-all"
                        @keyup.enter="handleSearch"
                    />
                </div>

                <button
                    @click="handleSearch"
                    :disabled="!searchId"
                    class="bg-ginko hover:bg-ginko-hover text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center gap-2"
                >
                    Buscar
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const searchId = ref("");
const handleSearch = () => {
    if (searchId.value) {
        navigateTo(`/orders/${searchId.value}`);
    }
};
</script>
