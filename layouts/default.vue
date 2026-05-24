<script setup lang="ts">
const isMenuOpen = ref(false);
const route = useRoute();

watch(
    () => route.path,
    () => {
        isMenuOpen.value = false;
    },
);
</script>

<template>
    <div
        class="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
        <header
            class="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800"
        >
            <nav
                class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between"
            >
                <NuxtLink to="/" class="flex items-center gap-2">
                    <div
                        class="w-8 h-8 bg-ginko rounded-lg flex items-center justify-center text-white font-bold"
                    >
                        G
                    </div>
                    <span
                        class="font-bold text-slate-900 dark:text-white text-lg"
                        >Ginko</span
                    >
                </NuxtLink>

                <ul class="hidden md:flex items-center gap-1">
                    <li>
                        <NuxtLink to="/orders" class="nav-link"
                            >Listado</NuxtLink
                        >
                    </li>
                    <li>
                        <NuxtLink to="/orders/create" class="nav-link"
                            >Crear Orden</NuxtLink
                        >
                    </li>
                    <li class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2" />
                    <li><ColorModeSwitcher /></li>
                </ul>

                <button
                    @click="isMenuOpen = !isMenuOpen"
                    class="md:hidden p-2 text-slate-600 dark:text-slate-400"
                >
                    <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            v-if="!isMenuOpen"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                        <path
                            v-else
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </nav>
        </header>

        <div
            v-if="isMenuOpen"
            class="fixed inset-0 z-40 bg-white dark:bg-slate-950 pt-20 px-6 md:hidden transition-opacity"
        >
            <ul class="flex flex-col gap-4 text-center">
                <li>
                    <NuxtLink
                        to="/orders"
                        class="block py-4 text-lg font-medium text-slate-900 dark:text-white"
                        >Listado</NuxtLink
                    >
                </li>
                <li>
                    <NuxtLink
                        to="/orders/create"
                        class="block py-4 text-lg font-medium text-slate-900 dark:text-white"
                        >Crear Orden</NuxtLink
                    >
                </li>
                <li class="mt-8 flex justify-center">
                    <ColorModeSwitcher />
                </li>
            </ul>
        </div>

        <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6">
            <slot />
        </main>
    </div>
</template>

<style scoped>
.nav-link {
    @apply px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-ginko transition-all;
}
</style>
