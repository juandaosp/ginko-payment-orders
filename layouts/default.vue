<template>
    <div class="min-h-screen bg-gray-50">
        <header class="bg-white border-b border-gray-200 p-4">
            <nav class="max-w-7xl mx-auto flex items-center justify-between">
                <NuxtLink to="/" class="font-bold text-indigo-600 text-xl">
                    Ginko
                </NuxtLink>

                <ul class="flex items-center gap-6">
                    <li>
                        <NuxtLink
                            to="/orders"
                            class="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
                            active-class="text-indigo-600 font-bold"
                        >
                            Lista de Órdenes
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink
                            to="/orders/create"
                            class="text-gray-600 hover:text-indigo-600 transition-colors font-medium"
                            active-class="text-indigo-600 font-bold"
                        >
                            Crear Orden
                        </NuxtLink>
                    </li>
                </ul>
            </nav>
        </header>

        <main class="py-6 md:py-10">
            <slot />
        </main>
    </div>
</template>
