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
                <NuxtLink to="/" class="flex items-center gap-2 group">
                    <div
                        class="w-8 h-8 bg-ginko rounded-lg flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform"
                    >
                        G
                    </div>
                    <span
                        class="font-bold text-slate-900 dark:text-white text-lg"
                        >Ginko</span
                    >
                </NuxtLink>

                <ul class="flex items-center gap-1">
                    <li>
                        <NuxtLink
                            to="/orders"
                            class="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-ginko dark:hover:text-indigo-400 transition-all"
                            active-class="bg-indigo-50 dark:bg-indigo-900/20 text-ginko dark:text-indigo-400"
                        >
                            Listado
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/orders/create"
                            class="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-ginko dark:hover:text-indigo-400 transition-all"
                            active-class="bg-indigo-50 dark:bg-indigo-900/20 text-ginko dark:text-indigo-400"
                        >
                            Crear Orden
                        </NuxtLink>
                    </li>

                    <li class="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2" />

                    <li>
                        <ColorModeSwitcher />
                    </li>
                </ul>
            </nav>
        </header>

        <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6">
            <slot />
        </main>
    </div>
</template>
