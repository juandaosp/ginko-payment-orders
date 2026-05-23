📋 User Stories Completas — Ginko Payment Orders
EPIC 1: Setup & Architecture
Scaffolding, tipos, mock API, Pinia store

US-1.1: Configurar proyecto Nuxt 3 con Vite

Epic: Setup & Architecture
Priority: 🔴 High
Story Points: 2
Status: Not Started
Assigned: Tú
Estimated Hours: 1

Description:
Crear un nuevo proyecto Nuxt 3 con Vite como bundler. Establecer la estructura de carpetas según estándares de proyecto. Instalar dependencias base necesarias.
Acceptance Criteria:

 Proyecto Nuxt 3 creado con npx nuxi init
 npm run dev ejecuta sin errores
 Carpetas creadas: /components, /pages, /composables, /stores, /services, /types, /assets
 nuxt.config.ts configurado básicamente
 Git inicializado con primer commit

Technical Notes:
bashnpx nuxi@latest init ginko-payment-orders
cd ginko-payment-orders
npm install
mkdir -p src/{components,pages,composables,stores,services,types,assets}
git init
git add .
git commit -m "chore: initial Nuxt 3 scaffold with Vite"
Dependencies to Install:

vue (autoinstalled with Nuxt)
pinia
vue-router (autoinstalled with Nuxt)
axios (or use native fetch)
msw (for mocking)
tailwindcss
vitest
@vue/test-utils


US-1.2: Definir tipos TypeScript para órdenes

Epic: Setup & Architecture
Priority: 🔴 High
Story Points: 2
Status: Not Started
Assigned: Tú
Estimated Hours: 1

Description:
Crear archivo de tipos TypeScript que defina la estructura de datos para órdenes de pago. Incluir interfaces para Order, estado de orden, y posibles respuestas de API.
Acceptance Criteria:

 Archivo src/types/order.ts creado
 Interfaz Order con propiedades: id, providerName, amount, concept, createdAt, status
 Type OrderStatus como unión: 'BORRADOR' | 'APROBADA' | 'RECHAZADA' | 'PAGADA'
 Tipos documentados con JSDoc
 TypeScript compila sin errores

Code Template:
typescript// src/types/order.ts

/**
 * Representa el estado de una orden de pago
 */
export type OrderStatus = 'BORRADOR' | 'APROBADA' | 'RECHAZADA' | 'PAGADA';

/**
 * Interfaz principal para una orden de pago a proveedor
 */
export interface Order {
  /** Identificador único de la orden */
  id: string;

  /** Nombre del proveedor */
  providerName: string;

  /** Monto en pesos colombianos */
  amount: number;

  /** Descripción del concepto/motivo del pago */
  concept: string;

  /** Fecha de creación (ISO string) */
  createdAt: string;

  /** Estado actual de la orden */
  status: OrderStatus;
}

/**
 * Respuesta de la API para listado de órdenes
 */
export interface FetchOrdersResponse {
  data: Order[];
  total: number;
  page: number;
}

/**
 * Payload para crear una nueva orden
 */
export interface CreateOrderPayload {
  providerName: string;
  amount: number;
  concept: string;
}

/**
 * Payload para actualizar estado de una orden
 */
export interface UpdateOrderStatusPayload {
  status: OrderStatus;
}
Technical Notes:

Ubicación: src/types/order.ts
Estos tipos serán usados en Pinia store, composables y componentes
TypeScript strict mode habilitado en tsconfig.json


US-1.3: Instalar y configurar MSW (Mock Service Worker)

Epic: Setup & Architecture
Priority: 🔴 High
Story Points: 3
Status: Not Started
Assigned: Tú
Estimated Hours: 1.5

Description:
Instalar MSW para mockear las API calls. Crear handlers para endpoints: GET /api/orders, POST /api/orders, PATCH /api/orders/:id. Generar datos mock realistas de órdenes de ejemplo.
Acceptance Criteria:

 MSW instalado: npm install msw
 Carpeta src/services/mocks/ creada
 Archivo handlers.ts con handlers para:

GET /api/orders → retorna array de órdenes
POST /api/orders → crea nueva orden
PATCH /api/orders/:id → actualiza estado


 Archivo server.ts configurando MSW server
 Data mock: 8-10 órdenes con estados variados
 MSW starts sin errores cuando app inicia

Code Template:
typescript// src/services/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import type { Order, OrderStatus } from '@/types/order';

const mockOrders: Order[] = [
  {
    id: '1',
    providerName: 'Proveedor A - Servicios',
    amount: 1500000,
    concept: 'Servicios de hosting y mantenimiento servidor',
    createdAt: new Date(2026, 4, 15).toISOString(),
    status: 'BORRADOR',
  },
  {
    id: '2',
    providerName: 'Proveedor B - Software',
    amount: 2500000,
    concept: 'Licencia de software anual',
    createdAt: new Date(2026, 4, 12).toISOString(),
    status: 'APROBADA',
  },
  {
    id: '3',
    providerName: 'Proveedor C - Consultoría',
    amount: 5000000,
    concept: 'Servicios de consultoría tecnológica',
    createdAt: new Date(2026, 4, 10).toISOString(),
    status: 'PAGADA',
  },
  // 5-7 órdenes más con estados variados
];

let orders = [...mockOrders];
let nextId = orders.length + 1;

export const handlers = [
  // GET /api/orders
  http.get('/api/orders', () => {
    return HttpResponse.json(orders, { status: 200 });
  }),

  // POST /api/orders
  http.post('/api/orders', async ({ request }) => {
    const body = await request.json() as {
      providerName: string;
      amount: number;
      concept: string;
    };

    const newOrder: Order = {
      id: String(nextId++),
      ...body,
      createdAt: new Date().toISOString(),
      status: 'BORRADOR',
    };

    orders.push(newOrder);
    return HttpResponse.json(newOrder, { status: 201 });
  }),

  // PATCH /api/orders/:id
  http.patch('/api/orders/:id', async ({ request, params }) => {
    const { id } = params;
    const body = await request.json() as { status: OrderStatus };

    const order = orders.find(o => o.id === id);
    if (!order) {
      return HttpResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    order.status = body.status;
    return HttpResponse.json(order, { status: 200 });
  }),
];
typescript// src/services/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
Vitest Setup (agregar a vitest.config.ts):
typescriptimport { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './src/services/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
Browser Setup (agregar a src/main.ts):
typescriptif (import.meta.env.DEV) {
  const { worker } = await import('./services/mocks/browser');
  await worker.start();
}
Technical Notes:

MSW intercepta calls de fetch() y axios
No requiere servidor real
Fácil de desactivar en producción
Puedes simular delays y errores si necesitas


US-1.4: Crear Pinia store para órdenes

Epic: Setup & Architecture
Priority: 🔴 High
Story Points: 3
Status: Not Started
Assigned: Tú
Estimated Hours: 1.5

Description:
Crear store de Pinia para manejar estado global de órdenes. Incluir estado (orders, loading, error), acciones (fetch, create, update), y getters útiles.
Acceptance Criteria:

 Archivo src/stores/orderStore.ts creado
 Store configurado con composables (setup syntax)
 State: orders (Order[]), loading (boolean), error (string | null)
 Actions: fetchOrders(), createOrder(), updateOrderStatus()
 Getters: orderById(), ordersByStatus()
 Store registrado en main.ts
 TypeScript sin errores

Code Template:
typescript// src/stores/orderStore.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Order, CreateOrderPayload, OrderStatus } from '@/types/order';

export const useOrderStore = defineStore('orders', () => {
  // State
  const orders = ref<Order[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Actions
  const fetchOrders = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      orders.value = await response.json();
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error';
    } finally {
      loading.value = false;
    }
  };

  const createOrder = async (payload: CreateOrderPayload) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to create order');
      const newOrder = await response.json();
      orders.value.push(newOrder);
      return newOrder;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error';
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update order');
      const updatedOrder = await response.json();
      const index = orders.value.findIndex(o => o.id === orderId);
      if (index >= 0) {
        orders.value[index] = updatedOrder;
      }
      return updatedOrder;
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error';
      throw e;
    } finally {
      loading.value = false;
    }
  };

  // Getters
  const orderById = computed(() => (id: string) =>
    orders.value.find(o => o.id === id)
  );

  const ordersByStatus = computed(() => (status: OrderStatus) =>
    orders.value.filter(o => o.status === status)
  );

  return {
    // State
    orders,
    loading,
    error,
    // Actions
    fetchOrders,
    createOrder,
    updateOrderStatus,
    // Getters
    orderById,
    ordersByStatus,
  };
});
typescript// src/main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);

app.use(createPinia());
app.mount('#app');
Technical Notes:

Usa Composition API en Pinia (más moderno)
Acciones manejan loading y error internamente
Getters computados para búsquedas frecuentes
Estado reactivo automáticamente


EPIC 2: Bloque 1 — Vista de Listado de Órdenes
Tabla desktop, tarjetas mobile, indicadores de estado, paginación

US-2.1: Crear componente OrderList con tabla (desktop)

Epic: Bloque 1 — Listado
Priority: 🔴 High
Story Points: 3
Status: Not Started
Assigned: Tú
Estimated Hours: 2

Description:
Crear componente OrderList.vue que renderiza una tabla con todas las órdenes en vista desktop. La tabla debe mostrar: ID, Nombre Proveedor, Monto, Concepto, Fecha Creación, Estado. Debe ser responsive y ocultarse en mobile.
Acceptance Criteria:

 Componente src/components/OrderList.vue creado
 Tabla renderiza órdenes desde Pinia store
 Columnas: id, providerName, amount (formateado COP), concept (truncado), createdAt (formateado), status (badge)
 Tabla visible solo en desktop (media query min-w-1024 o similar)
 Rows son clickables, emiten evento @click:row con orden
 Headers tienen padding/styling adecuado
 Amount formateado como moneda COP (ej: $1.500.000)
 Dates formateado (ej: 23 de mayo, 2026)
 Concept truncado a 50 chars + "..."

Code Template:
vue<!-- src/components/OrderList.vue -->
<template>
  <div class="hidden lg:block">
    <table class="min-w-full border-collapse">
      <thead class="bg-gray-50 border-b border-gray-200">
        <tr>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Proveedor</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Monto</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Concepto</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fecha</th>
          <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
          class="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition"
          @click="$emit('select', order)"
        >
          <td class="px-4 py-3 text-sm text-gray-900">{{ order.id }}</td>
          <td class="px-4 py-3 text-sm text-gray-900">{{ order.providerName }}</td>
          <td class="px-4 py-3 text-sm text-gray-900">{{ formatCOP(order.amount) }}</td>
          <td class="px-4 py-3 text-sm text-gray-600">{{ truncate(order.concept, 50) }}</td>
          <td class="px-4 py-3 text-sm text-gray-600">{{ formatDate(order.createdAt) }}</td>
          <td class="px-4 py-3">
            <StatusBadge :status="order.status" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useOrderStore } from '@/stores/orderStore';
import StatusBadge from './StatusBadge.vue';
import type { Order } from '@/types/order';

defineEmits<{ select: [order: Order] }>();

const store = useOrderStore();
const orders = computed(() => store.orders);

const formatCOP = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));
};

const truncate = (text: string, length: number) =>
  text.length > length ? text.substring(0, length) + '...' : text;
</script>
Technical Notes:

Usa Tailwind CSS para estilos (hidden/lg:block para responsividad)
Emite evento 'select' cuando se clickea una fila
Integra componente StatusBadge (US-2.3)
Formatos de fecha y moneda localizados a es-CO


US-2.2: Crear componente OrderCard para mobile

Epic: Bloque 1 — Listado
Priority: 🔴 High
Story Points: 2
Status: Not Started
Assigned: Tú
Estimated Hours: 1.5

Description:
Crear componente OrderCard.vue que renderiza información de una orden en formato tarjeta. Usado en mobile para mostrar lista de órdenes apiladas. Debe ser clickable.
Acceptance Criteria:

 Componente src/components/OrderCard.vue creado
 Tarjeta muestra: proveedor, monto, estado (badge), fecha
 Diseño limpio con padding/border radius
 Visible solo en mobile (<lg)
 Clickable, emite evento 'click'
 Responsive, full-width en mobile

Code Template:
vue<!-- src/components/OrderCard.vue -->
<template>
  <div
    class="bg-white border border-gray-200 rounded-lg p-4 mb-3 cursor-pointer hover:shadow-md transition"
    @click="$emit('select', order)"
  >
    <div class="flex justify-between items-start mb-3">
      <div>
        <p class="text-sm text-gray-600">Proveedor</p>
        <p class="text-lg font-semibold text-gray-900">{{ order.providerName }}</p>
      </div>
      <StatusBadge :status="order.status" />
    </div>

    <div class="grid grid-cols-2 gap-3 mb-3">
      <div>
        <p class="text-xs text-gray-600">Monto</p>
        <p class="font-semibold text-gray-900">{{ formatCOP(order.amount) }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-600">Fecha</p>
        <p class="text-sm text-gray-700">{{ formatDate(order.createdAt) }}</p>
      </div>
    </div>

    <div>
      <p class="text-xs text-gray-600">Concepto</p>
      <p class="text-sm text-gray-700 line-clamp-2">{{ order.concept }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order } from '@/types/order';
import StatusBadge from './StatusBadge.vue';

defineProps<{ order: Order }>();
defineEmits<{ select: [order: Order] }>();

const formatCOP = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
};
</script>
Technical Notes:

Props: order (Order)
Emits: select con la orden
Tailwind: line-clamp para truncar concepto
Padding y espacios optimizados para mobile


US-2.3: Crear componente StatusBadge con indicadores de color

Epic: Bloque 1 — Listado
Priority: 🔴 High
Story Points: 1
Status: Not Started
Assigned: Tú
Estimated Hours: 0.5

Description:
Crear componente reutilizable StatusBadge.vue que muestra el estado de una orden con color distintivo. Colores: BORRADOR=gris, APROBADA=verde, RECHAZADA=rojo, PAGADA=azul.
Acceptance Criteria:

 Componente src/components/StatusBadge.vue creado
 Props: status (OrderStatus)
 BORRADOR: fondo gris, texto gris oscuro
 APROBADA: fondo verde, texto verde oscuro
 RECHAZADA: fondo rojo, texto rojo oscuro
 PAGADA: fondo azul, texto azul oscuro
 Texto legible, padding adecuado

Code Template:
vue<!-- src/components/StatusBadge.vue -->
<template>
  <span
    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
    :class="badgeClasses"
  >
    {{ statusLabel }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { OrderStatus } from '@/types/order';

const props = defineProps<{ status: OrderStatus }>();

const statusLabel = computed(() => {
  const labels: Record<OrderStatus, string> = {
    BORRADOR: 'Borrador',
    APROBADA: 'Aprobada',
    RECHAZADA: 'Rechazada',
    PAGADA: 'Pagada',
  };
  return labels[props.status];
});

const badgeClasses = computed(() => {
  const classes: Record<OrderStatus, string> = {
    BORRADOR: 'bg-gray-100 text-gray-800',
    APROBADA: 'bg-green-100 text-green-800',
    RECHAZADA: 'bg-red-100 text-red-800',
    PAGADA: 'bg-blue-100 text-blue-800',
  };
  return classes[props.status];
});
</script>
Technical Notes:

Reutilizable en tabla, cards y detail
Tailwind para estilos
Labels en español


US-2.4: Crear componentes de estados (Loading, Error, Empty)

Epic: Bloque 1 — Listado
Priority: 🔴 High
Story Points: 2
Status: Not Started
Assigned: Tú
Estimated Hours: 1.5

Description:
Crear tres componentes para manejar estados de carga, error y lista vacía. Cada uno con mensaje claro y apropiado al usuario.
Acceptance Criteria:

 Componente src/components/LoadingState.vue creado
 Componente src/components/ErrorState.vue creado
 Componente src/components/EmptyState.vue creado
 LoadingState: spinner + "Cargando órdenes..."
 ErrorState: ícono de error + mensaje + botón "Reintentar"
 EmptyState: ícono vacío + "No hay órdenes"
 Cada uno emite evento 'retry' cuando corresponde

Code Templates:
vue<!-- src/components/LoadingState.vue -->
<template>
  <div class="flex flex-col items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
    <p class="text-gray-600">Cargando órdenes...</p>
  </div>
</template>
vue<!-- src/components/ErrorState.vue -->
<template>
  <div class="flex flex-col items-center justify-center py-12 bg-red-50 rounded-lg p-6">
    <div class="text-4xl mb-4">⚠️</div>
    <p class="text-gray-700 font-semibold mb-2">Error al cargar órdenes</p>
    <p class="text-gray-600 mb-4">{{ message || 'Ocurrió un problema. Intenta de nuevo.' }}</p>
    <button
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      @click="$emit('retry')"
    >
      Reintentar
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message?: string }>();
defineEmits<{ retry: [] }>();
</script>
vue<!-- src/components/EmptyState.vue -->
<template>
  <div class="flex flex-col items-center justify-center py-12">
    <div class="text-5xl mb-4">📋</div>
    <p class="text-gray-700 font-semibold">No hay órdenes</p>
    <p class="text-gray-600 text-sm">Crea una nueva orden para empezar</p>
  </div>
</template>
Technical Notes:

Componentes sin props (salvo ErrorState que puede tomar message)
Emiten 'retry' para reintentar fetch
Estilos con Tailwind
Iconos con emojis por simplicidad


US-2.5: Implementar paginación del lado del cliente

Epic: Bloque 1 — Listado
Priority: 🔴 High
Story Points: 2
Status: Not Started
Assigned: Tú
Estimated Hours: 1.5

Description:
Implementar paginación cliente con 10 items por página. Mostrar botones Anterior/Siguiente, indicador de página actual, y controlar qué órdenes se muestran.
Acceptance Criteria:

 Composable src/composables/usePagination.ts creado
 Parámetros: items array, itemsPerPage (default 10)
 Retorna: currentPage, totalPages, paginatedItems, next(), previous()
 Botones Anterior/Siguiente en OrderList
 Indicador "Página X de Y"
 Botones deshabilitados en límites (primera/última página)
 Paginación funciona con tabla y cards

Code Template:
typescript// src/composables/usePagination.ts
import { ref, computed } from 'vue';

export function usePagination<T>(items: T[], itemsPerPage = 10) {
  const currentPage = ref(1);

  const totalPages = computed(() =>
    Math.ceil(items.length / itemsPerPage)
  );

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  });

  const next = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const previous = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  const reset = () => {
    currentPage.value = 1;
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    next,
    previous,
    reset,
  };
}
Integration in OrderList:
vue<script setup lang="ts">
import { usePagination } from '@/composables/usePagination';

const store = useOrderStore();
const { currentPage, totalPages, paginatedItems, next, previous } =
  usePagination(store.orders, 10);
</script>

<template>
  <!-- tabla con paginatedItems en lugar de orders -->

  <!-- Pagination controls -->
  <div class="flex items-center justify-between mt-4 px-4">
    <button
      :disabled="currentPage === 1"
      @click="previous"
      class="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
    >
      ← Anterior
    </button>

    <span class="text-sm text-gray-600">
      Página {{ currentPage }} de {{ totalPages }}
    </span>

    <button
      :disabled="currentPage === totalPages"
      @click="next"
      class="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
    >
      Siguiente →
    </button>
  </div>
</template>
Technical Notes:

Composable genérico, reutilizable
currentPage es ref para ser reactivo
paginatedItems computed para eficiencia
Validación de límites en next/previous


EPIC 3: Bloque 2 — Filtros
Estado, búsqueda, URL sync, AND logic

US-3.1: Crear componente FilterBar con selects y búsqueda

Epic: Bloque 2 — Filtros
Priority: 🔴 High
Story Points: 2
Status: Not Started
Assigned: Tú
Estimated Hours: 1

Description:
Crear componente FilterBar.vue con dos controles: select para filtrar por estado y input para búsqueda de proveedor. Emitir eventos cuando cambian valores.
Acceptance Criteria:

 Componente src/components/FilterBar.vue creado
 Select con opciones: "Todos", "Borrador", "Aprobada", "Rechazada", "Pagada"
 Input text para búsqueda por proveedor
 Emite evento 'filter-change' con { status, search }
 Responsive: flex-col en mobile, flex-row en desktop
 Labels claros

Code Template:
vue<!-- src/components/FilterBar.vue -->
<template>
  <div class="flex flex-col lg:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
      <select
        :value="status"
        @change="handleStatusChange"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="todos">Todos</option>
        <option value="BORRADOR">Borrador</option>
        <option value="APROBADA">Aprobada</option>
        <option value="RECHAZADA">Rechazada</option>
        <option value="PAGADA">Pagada</option>
      </select>
    </div>

    <div class="flex-1">
      <label class="block text-sm font-medium text-gray-700 mb-2">Proveedor</label>
      <input
        type="text"
        :value="search"
        @input="handleSearchChange"
        placeholder="Buscar por nombre..."
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  status: string;
  search: string;
}>();

const emit = defineEmits<{
  'filter-change': [{ status: string; search: string }];
}>();

const handleStatusChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emit('filter-change', { status: target.value, search: search });
};

const handleSearchChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('filter-change', { status: status, search: target.value });
};
</script>
Technical Notes:

Props: status, search (para inicializar valores)
Emite 'filter-change' con objeto { status, search }
Tailwind responsive design


US-3.2: Crear composable useOrderFilters() con sync a URL

Epic: Bloque 2 — Filtros
Priority: 🔴 High
Story Points: 3
Status: Not Started
Assigned: Tú
Estimated Hours: 1.5

Description:
Crear composable que maneja lógica de filtros. Lee query params de URL, mantiene estado de filtros, y sincroniza cambios a URL usando Vue Router. Retorna órdenes filtradas con AND logic.
Acceptance Criteria:

 Composable src/composables/useOrderFilters.ts creado
 Lee ?status=X&search=Y desde URL
 Retorna: status, search, filteredOrders
 Función: updateFilters(status, search) sincroniza a URL
 Recarga de página conserva filtros
 Filtrado con AND: status Y search deben coincidir ambos
 'todos' en status ignora filtro de estado
 Search es case-insensitive

Code Template:
typescript// src/composables/useOrderFilters.ts
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/orderStore';
import type { OrderStatus } from '@/types/order';

export function useOrderFilters() {
  const route = useRoute();
  const router = useRouter();
  const store = useOrderStore();

  // Lecturas de URL
  const status = computed(() => {
    const param = route.query.status as string;
    return param || 'todos';
  });

  const search = computed(() => {
    return (route.query.search as string) || '';
  });

  // Filtrado con AND logic
  const filteredOrders = computed(() => {
    let result = store.orders;

    // Filtro por estado
    if (status.value !== 'todos') {
      result = result.filter(o => o.status === status.value);
    }

    // Filtro por búsqueda (case-insensitive)
    if (search.value) {
      const searchLower = search.value.toLowerCase();
      result = result.filter(o =>
        o.providerName.toLowerCase().includes(searchLower)
      );
    }

    return result;
  });

  // Actualizar filtros (sincroniza a URL)
  const updateFilters = async (
    newStatus: string,
    newSearch: string
  ) => {
    const query: Record<string, string | undefined> = {};

    if (newStatus !== 'todos') {
      query.status = newStatus;
    }

    if (newSearch) {
      query.search = newSearch;
    }

    await router.push({ query });
  };

  return {
    status,
    search,
    filteredOrders,
    updateFilters,
  };
}
Technical Notes:

Lee query params reactivamente
Usa router.push() para cambiar URL sin reload
AND logic explícito en filtrado
search es case-insensitive


US-3.3: Integrar FilterBar en OrderList con sincronización

Epic: Bloque 2 — Filtros
Priority: 🔴 High
Story Points: 1
Status: Not Started
Assigned: Tú
Estimated Hours: 0.5

Description:
Integrar composable useOrderFilters() en el componente OrderList. Mostrar FilterBar, conectar eventos de filtros a composable, y renderizar órdenes filtradas.
Acceptance Criteria:

 OrderList usa useOrderFilters()
 FilterBar visible arriba de lista/tabla
 Cambios en filtros actualizan URL
 Tabla/cards muestran filteredOrders en lugar de orders
 Paginación funciona sobre órdenes filtradas
 Recarga de página restaura filtros

Integration Code:
vue<!-- Modificar pages/orders.vue o components/OrderList.vue -->
<script setup lang="ts">
import { onMounted } from 'vue';
import { useOrderStore } from '@/stores/orderStore';
import { useOrderFilters } from '@/composables/useOrderFilters';
import { usePagination } from '@/composables/usePagination';
import FilterBar from '@/components/FilterBar.vue';
import OrderList from '@/components/OrderList.vue';

const store = useOrderStore();
const { status, search, filteredOrders, updateFilters } = useOrderFilters();
const { paginatedItems, currentPage, totalPages, next, previous } =
  usePagination(filteredOrders.value, 10);

onMounted(() => {
  store.fetchOrders();
});

const handleFilterChange = async (filters: { status: string; search: string }) => {
  await updateFilters(filters.status, filters.search);
};
</script>

<template>
  <div class="container mx-auto p-4">
    <FilterBar :status="status" :search="search" @filter-change="handleFilterChange" />

    <!-- Aquí van tabla/cards con paginatedItems -->
  </div>
</template>
Technical Notes:

Paginación se aplica después de filtrado
Filtros persisten en URL
Workflow: fetch → filter → paginate


EPIC 4: Bloque 3 — Formulario de Creación
Validaciones, errores por campo, submit habilitado/deshabilitado, redirect

US-4.1: Crear página CreateOrder y layout

Epic: Bloque 3 — Formulario
Priority: 🔴 High
Story Points: 1
Status: Not Started
Assigned: Tú
Estimated Hours: 0.5

Description:
Crear página /create en Nuxt (archivo pages/create.vue). Layout con título, formulario centrado, y estilos básicos.
Acceptance Criteria:

 Página pages/create.vue creada
 Accesible en /create (Nuxt file-based routing)
 Título: "Crear Nueva Orden"
 Layout centrado, max-width 600px
 Componente OrderForm renderizado

Code Template:
vue<!-- pages/create.vue -->
<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Crear Nueva Orden</h1>
      <OrderForm @success="handleSuccess" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import OrderForm from '@/components/OrderForm.vue';

const router = useRouter();

const handleSuccess = () => {
  router.push('/orders');
};
</script>
Technical Notes:

Usa Nuxt file-based routing (pages/)
Escucha evento 'success' del formulario


US-4.2: Crear componente OrderForm con validaciones completas

Epic: Bloque 3 — Formulario
Priority: 🔴 High
Story Points: 3
Status: Not Started
Assigned: Tú
Estimated Hours: 1.5

Description:
Crear componente OrderForm.vue con campos (proveedor, monto, concepto), validaciones de cliente, mensajes de error por campo, contador de caracteres, y botón de envío.
Acceptance Criteria:

 Componente src/components/OrderForm.vue creado
 Campo proveedor: required, min 3 chars
 Campo monto: required, tipo number, > 0
 Campo concepto: required, max 250 chars
 Contador visible en concepto (ej: "120/250")
 Mensajes de error debajo de cada campo
 Botón submit deshabilitado si form inválido o loading
 Emite evento 'success' tras crear exitosamente
 Maneja errores de API (muestra mensaje)

Code Template:
vue<!-- src/components/OrderForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Proveedor -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Proveedor *
      </label>
      <input
        v-model="form.providerName"
        type="text"
        placeholder="Nombre del proveedor"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        @blur="validateProviderName"
      />
      <p v-if="errors.providerName" class="text-red-600 text-sm mt-1">
        {{ errors.providerName }}
      </p>
    </div>

    <!-- Monto -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Monto (COP) *
      </label>
      <input
        v-model.number="form.amount"
        type="number"
        placeholder="0"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        @blur="validateAmount"
      />
      <p v-if="errors.amount" class="text-red-600 text-sm mt-1">
        {{ errors.amount }}
      </p>
    </div>

    <!-- Concepto -->
    <div>
      <div class="flex justify-between items-center mb-1">
        <label class="block text-sm font-medium text-gray-700">
          Concepto *
        </label>
        <span class="text-xs text-gray-600">
          {{ form.concept.length }}/250
        </span>
      </div>
      <textarea
        v-model="form.concept"
        placeholder="Descripción de la orden"
        maxlength="250"
        rows="4"
        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        @blur="validateConcept"
      ></textarea>
      <p v-if="errors.concept" class="text-red-600 text-sm mt-1">
        {{ errors.concept }}
      </p>
    </div>

    <!-- Botón submit -->
    <button
      type="submit"
      :disabled="!isValid || loading"
      class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg disabled:bg-gray-400 hover:bg-blue-700 transition"
    >
      {{ loading ? 'Enviando...' : 'Crear Orden' }}
    </button>

    <!-- Mensaje de error general -->
    <div v-if="apiError" class="bg-red-50 border border-red-200 rounded-lg p-3">
      <p class="text-red-700 text-sm">{{ apiError }}</p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useOrderStore } from '@/stores/orderStore';
import type { CreateOrderPayload } from '@/types/order';

defineEmits<{ success: [] }>();

const store = useOrderStore();
const loading = ref(false);
const apiError = ref<string | null>(null);

const form = reactive({
  providerName: '',
  amount: null as number | null,
  concept: '',
});

const errors = reactive({
  providerName: '',
  amount: '',
  concept: '',
});

// Validaciones
const validateProviderName = () => {
  if (!form.providerName.trim()) {
    errors.providerName = 'El proveedor es requerido';
  } else if (form.providerName.length < 3) {
    errors.providerName = 'Mínimo 3 caracteres';
  } else {
    errors.providerName = '';
  }
};

const validateAmount = () => {
  if (form.amount === null || form.amount === undefined) {
    errors.amount = 'El monto es requerido';
  } else if (form.amount <= 0) {
    errors.amount = 'El monto debe ser mayor a 0';
  } else {
    errors.amount = '';
  }
};

const validateConcept = () => {
  if (!form.concept.trim()) {
    errors.concept = 'El concepto es requerido';
  } else if (form.concept.length > 250) {
    errors.concept = 'Máximo 250 caracteres';
  } else {
    errors.concept = '';
  }
};

const isValid = computed(() => {
  return (
    form.providerName.length >= 3 &&
    form.amount !== null &&
    form.amount > 0 &&
    form.concept.length > 0 &&
    form.concept.length <= 250
  );
});

const handleSubmit = async () => {
  validateProviderName();
  validateAmount();
  validateConcept();

  if (!isValid.value) return;

  loading.value = true;
  apiError.value = null;

  try {
    const payload: CreateOrderPayload = {
      providerName: form.providerName,
      amount: form.amount!,
      concept: form.concept,
    };

    await store.createOrder(payload);

    // Reset form
    form.providerName = '';
    form.amount = null;
    form.concept = '';

    // Emitir éxito
    emit('success');
  } catch (error) {
    apiError.value =
      error instanceof Error ? error.message : 'Error al crear la orden';
  } finally {
    loading.value = false;
  }
};
</script>
Technical Notes:

Validaciones on blur y en submit
isValid computed para deshabilitar botón
maxlength en textarea + contador
Mensajes de error específicos
Emite 'success' al crear


US-4.3: Crear composable useOrderForm() (opcional, si no está en componente)

Epic: Bloque 3 — Formulario
Priority: 🟡 Medium
Story Points: 2
Status: Not Started
Assigned: Tú
Estimated Hours: 1

Description:
Si prefieres separar lógica de formulario, crear composable useOrderForm() reutilizable. Contener state, validaciones y submit logic.
Acceptance Criteria:

 Composable src/composables/useOrderForm.ts creado
 Exporta: form, errors, isValid, validateField(), handleSubmit()
 OrderForm lo usa
 Testeable

Code Template:
typescript// src/composables/useOrderForm.ts
import { reactive, ref, computed } from 'vue';
import { useOrderStore } from '@/stores/orderStore';
import type { CreateOrderPayload } from '@/types/order';

export function useOrderForm() {
  const store = useOrderStore();
  const loading = ref(false);
  const apiError = ref<string | null>(null);

  const form = reactive({
    providerName: '',
    amount: null as number | null,
    concept: '',
  });

  const errors = reactive({
    providerName: '',
    amount: '',
    concept: '',
  });

  const validateProviderName = () => {
    if (!form.providerName.trim()) {
      errors.providerName = 'El proveedor es requerido';
    } else if (form.providerName.length < 3) {
      errors.providerName = 'Mínimo 3 caracteres';
    } else {
      errors.providerName = '';
    }
  };

  const validateAmount = () => {
    if (form.amount === null || form.amount === undefined) {
      errors.amount = 'El monto es requerido';
    } else if (form.amount <= 0) {
      errors.amount = 'El monto debe ser mayor a 0';
    } else {
      errors.amount = '';
    }
  };

  const validateConcept = () => {
    if (!form.concept.trim()) {
      errors.concept = 'El concepto es requerido';
    } else if (form.concept.length > 250) {
      errors.concept = 'Máximo 250 caracteres';
    } else {
      errors.concept = '';
    }
  };

  const isValid = computed(() => {
    return (
      form.providerName.length >= 3 &&
      form.amount !== null &&
      form.amount > 0 &&
      form.concept.length > 0 &&
      form.concept.length <= 250
    );
  });

  const handleSubmit = async () => {
    validateProviderName();
    validateAmount();
    validateConcept();

    if (!isValid.value) return;

    loading.value = true;
    apiError.value = null;

    try {
      const payload: CreateOrderPayload = {
        providerName: form.providerName,
        amount: form.amount!,
        concept: form.concept,
      };

      await store.createOrder(payload);
      return true;
    } catch (error) {
      apiError.value =
        error instanceof Error ? error.message : 'Error al crear la orden';
      return false;
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    form.providerName = '';
    form.amount = null;
    form.concept = '';
    errors.providerName = '';
    errors.amount = '';
    errors.concept = '';
    apiError.value = null;
  };

  return {
    form,
    errors,
    isValid,
    loading,
    apiError,
    validateProviderName,
    validateAmount,
    validateConcept,
    handleSubmit,
    reset,
  };
}

US-4.4: Redirigir al listado sin reload tras crear orden

Epic: Bloque 3 — Formulario
Priority: 🔴 High
Story Points: 1
Status: Not Started
Assigned: Tú
Estimated Hours: 0.5

Description:
Tras crear orden exitosamente, redirigir a página de listado /orders usando router.push() (sin reload de página). Nueva orden debe estar visible en el listado.
Acceptance Criteria:

 Tras POST exitoso, llama router.push('/orders')
 NO hay reload de página (F5)
 Nueva orden visible en listado
 Pinia store ya tiene la orden (POST la agregó)
 URL cambia a /orders

Integration:
typescript// En OrderForm.vue o composable
const emit = defineEmits<{ success: [] }>();

const handleSubmit = async () => {
  // ... validación y submit
  try {
    await store.createOrder(payload);
    reset();
    emit('success'); // Componente padre maneja redirect
  } catch (error) {
    // ... error handling
  }
};

// En pages/create.vue
const handleSuccess = () => {
  router.push('/orders');
};
Technical Notes:

router.push() cambio URL sin reload
Store ya contiene orden (POST agregó)
Componente padre maneja navegación


EPIC 5: Bloque 4 — Detalle & Transiciones de Estado
Detalle, máquina de estados, confirmación, errores

US-5.1: Crear página OrderDetail con parámetro de ruta

Epic: Bloque 4 — Detalle
Priority: 🔴 High
Story Points: 2
Status: Not Started
Assigned: Tú
Estimated Hours: 1

Description:
Crear página /orders/[id].vue en Nuxt. Leer ID desde parámetro de ruta, buscar orden en store, mostrar toda su información.
Acceptance Criteria:

 Página pages/orders/[id].vue creada
 Accesible en /orders/123 (file-based routing)
 Lee ID desde $route.params.id
 Busca orden en store usando ID
 Renderiza componente OrderDetail
 Si orden no existe, muestra error

Code Template:
vue<!-- pages/orders/[id].vue -->
<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <button
        @click="goBack"
        class="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
      >
        ← Volver
      </button>

      <OrderDetail v-if="order" :order="order" />
      <div v-else class="bg-white rounded-lg shadow p-8 text-center">
        <p class="text-gray-600">Orden no encontrada</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/orderStore';
import OrderDetail from '@/components/OrderDetail.vue';

const route = useRoute();
const router = useRouter();
const store = useOrderStore();

const orderId = computed(() => route.params.id as string);
const order = computed(() => store.orderById(orderId.value));

const goBack = () => {
  router.back();
};
</script>
Technical Notes:

Nuxt file-based: pages/orders/[id].vue → /orders/:id
Usa getter orderById del store
Botón "Volver" usa router.back()


US-5.2: Crear máquina de estados para transiciones válidas

Epic: Bloque 4 — Detalle
Priority: 🔴 High
Story Points: 2
Status: Not Started
Assigned: Tú
Estimated Hours: 1

Description:
Crear composable useOrderStateTransition() que define y valida transiciones de estado. Encapsula lógica de máquina de estados.
Acceptance Criteria:

 Composable src/composables/useOrderStateTransition.ts creado
 Define transiciones válidas:

BORRADOR → [APROBADA, RECHAZADA]
APROBADA → [PAGADA]
RECHAZADA → [] (terminal)
PAGADA → [] (terminal)


 Método: getPossibleActions(status) retorna array de estados válidos
 Método: canTransitionTo(from, to) valida si transición es legal

Code Template:
typescript// src/composables/useOrderStateTransition.ts
import type { OrderStatus } from '@/types/order';

export function useOrderStateTransition() {
  const transitionMap: Record<OrderStatus, OrderStatus[]> = {
    BORRADOR: ['APROBADA', 'RECHAZADA'],
    APROBADA: ['PAGADA'],
    RECHAZADA: [],
    PAGADA: [],
  };

  /**
   * Retorna estados a los que se puede transicionar desde el estado actual
   */
  const getPossibleActions = (currentStatus: OrderStatus): OrderStatus[] => {
    return transitionMap[currentStatus] || [];
  };

  /**
   * Valida si una transición es permitida
   */
  const canTransitionTo = (
    from: OrderStatus,
    to: OrderStatus
  ): boolean => {
    return getPossibleActions(from).includes(to);
  };

  /**
   * Retorna descripción legible de una transición
   */
  const getTransitionLabel = (from: OrderStatus, to: OrderStatus): string => {
    const labels: Record<string, string> = {
      BORRADOR_APROBADA: 'Aprobar orden',
      BORRADOR_RECHAZADA: 'Rechazar orden',
      APROBADA_PAGADA: 'Marcar como pagada',
    };
    return labels[`${from}_${to}`] || `Cambiar a ${to}`;
  };

  return {
    getPossibleActions,
    canTransitionTo,
    getTransitionLabel,
    transitionMap,
  };
}
Technical Notes:

Record de transiciones explícito
Métodos puros para validación
Labels de transición legibles


US-5.3: Crear componente OrderDetail con información completa

Epic: Bloque 4 — Detalle
Priority: 🔴 High
Story Points: 1
Status: Not Started
Assigned: Tú
Estimated Hours: 0.5

Description:
Crear componente OrderDetail.vue que muestra toda la información de una orden: ID, proveedor, monto, concepto, fecha, estado.
Acceptance Criteria:

 Componente src/components/OrderDetail.vue creado
 Props: order (Order)
 Muestra todos los campos de orden
 StatusBadge para estado
 Monto formateado COP
 Fecha formateada legiblemente

Code Template:
vue<!-- src/components/OrderDetail.vue -->
<template>
  <div class="bg-white rounded-lg shadow-lg p-8">
    <div class="flex justify-between items-start mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Detalle de Orden</h1>
      <StatusBadge :status="order.status" />
    </div>

    <div class="grid grid-cols-2 gap-6 mb-8">
      <div>
        <p class="text-sm text-gray-600 mb-1">ID de Orden</p>
        <p class="text-lg font-semibold text-gray-900">{{ order.id }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-600 mb-1">Fecha de Creación</p>
        <p class="text-lg font-semibold text-gray-900">{{ formatDate(order.createdAt) }}</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-6 mb-8">
      <div>
        <p class="text-sm text-gray-600 mb-1">Proveedor</p>
        <p class="text-lg font-semibold text-gray-900">{{ order.providerName }}</p>
      </div>
      <div>
        <p class="text-sm text-gray-600 mb-1">Monto</p>
        <p class="text-lg font-semibold text-green-600">{{ formatCOP(order.amount) }}</p>
      </div>
    </div>

    <div class="mb-8">
      <p class="text-sm text-gray-600 mb-1">Concepto</p>
      <p class="text-base text-gray-900 whitespace-pre-wrap">{{ order.concept }}</p>
    </div>

    <!-- Acciones (botones de transición) -->
    <StateTransitionButtons :order="order" />
  </div>
</template>

<script setup lang="ts">
import type { Order } from '@/types/order';
import StatusBadge from './StatusBadge.vue';
import StateTransitionButtons from './StateTransitionButtons.vue';

defineProps<{ order: Order }>();

const formatCOP = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
};
</script>
Technical Notes:

Props: order (Order)
Usa StatusBadge y StateTransitionButtons
Formatos localizados
whitespace-pre-wrap para concepto (respeta saltos)


US-5.4: Crear componente StateTransitionButtons

Epic: Bloque 4 — Detalle
Priority: 🔴 High
Story Points: 1
Status: Not Started
Assigned: Tú
Estimated Hours: 0.5

Description:
Crear componente StateTransitionButtons.vue que renderiza botones para transiciones permitidas. Usa composable useOrderStateTransition() para determinar qué botones mostrar.
Acceptance Criteria:

 Componente src/components/StateTransitionButtons.vue creado
 Props: order (Order)
 Renderiza solo botones para transiciones permitidas
 Cada botón emite evento con estado destino
 Botones con etiquetas claras (ej: "Aprobar", "Rechazar", "Pagar")
 Si no hay acciones, muestra "No hay acciones disponibles"

Code Template:
vue<!-- src/components/StateTransitionButtons.vue -->
<template>
  <div class="border-t pt-6">
    <h3 class="text-sm font-semibold text-gray-700 mb-4">Acciones</h3>

    <div v-if="possibleActions.length === 0" class="text-gray-600 text-sm">
      No hay acciones disponibles para este estado
    </div>

    <div v-else class="flex gap-3">
      <button
        v-for="action in possibleActions"
        :key="action"
        @click="openConfirmation(action)"
        :class="getButtonClass(action)"
        class="px-4 py-2 rounded-lg font-medium transition"
      >
        {{ getButtonLabel(action) }}
      </button>
    </div>
  </div>

  <!-- Modal de confirmación -->
  <ConfirmStateTransition
    v-if="showConfirmation"
    :order="order"
    :target-status="targetStatus!"
    @confirm="handleConfirm"
    @cancel="closeConfirmation"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Order, OrderStatus } from '@/types/order';
import { useOrderStateTransition } from '@/composables/useOrderStateTransition';
import ConfirmStateTransition from './ConfirmStateTransition.vue';

const props = defineProps<{ order: Order }>();

const { getPossibleActions, getTransitionLabel } = useOrderStateTransition();
const showConfirmation = ref(false);
const targetStatus = ref<OrderStatus | null>(null);

const possibleActions = computed(() =>
  getPossibleActions(props.order.status)
);

const openConfirmation = (status: OrderStatus) => {
  targetStatus.value = status;
  showConfirmation.value = true;
};

const closeConfirmation = () => {
  showConfirmation.value = false;
  targetStatus.value = null;
};

const handleConfirm = () => {
  // ConfirmStateTransition maneja la lógica
  closeConfirmation();
};

const getButtonLabel = (status: OrderStatus): string => {
  const labels: Record<OrderStatus, string> = {
    BORRADOR: 'Borrador',
    APROBADA: 'Aprobar',
    RECHAZADA: 'Rechazar',
    PAGADA: 'Marcar como Pagada',
  };
  return labels[status];
};

const getButtonClass = (status: OrderStatus): string => {
  const classes: Record<OrderStatus, string> = {
    BORRADOR: 'bg-gray-600 text-white hover:bg-gray-700',
    APROBADA: 'bg-green-600 text-white hover:bg-green-700',
    RECHAZADA: 'bg-red-600 text-white hover:bg-red-700',
    PAGADA: 'bg-blue-600 text-white hover:bg-blue-700',
  };
  return classes[status];
};
</script>
Technical Notes:

Usa composable para obtener acciones válidas
Abre modal de confirmación
Labels y colores por estado
Modal maneja la lógica de transición


US-5.5: Crear modal ConfirmStateTransition con manejo de errores

Epic: Bloque 4 — Detalle
Priority: 🔴 High
Story Points: 2
Status: Not Started
Assigned: Tú
Estimated Hours: 1.5

Description:
Crear componente modal ConfirmStateTransition.vue que pide confirmación antes de cambiar estado. Maneja loading, success y errores de API. Permite reintentar si falla.
Acceptance Criteria:

 Componente src/components/ConfirmStateTransition.vue creado
 Props: order (Order), targetStatus (OrderStatus)
 Muestra confirmación: "¿Cambiar de {currentStatus} a {targetStatus}?"
 Botones: Cancelar, Confirmar
 En confirmar: llama a API (PATCH /api/orders/:id)
 Loading state en botón confirmación
 Si éxito: emite 'confirm' y cierra
 Si error: muestra mensaje + opción reintentar
 Cancelar cierra modal sin cambios

Code Template:
vue<!-- src/components/ConfirmStateTransition.vue -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
      <h2 class="text-xl font-bold text-gray-900 mb-4">
        Cambiar Estado de Orden
      </h2>

      <!-- Confirmación -->
      <div v-if="!apiError" class="mb-6">
        <p class="text-gray-700 mb-4">
          ¿Cambiar estado de
          <strong>{{ getStatusLabel(order.status) }}</strong> a
          <strong>{{ getStatusLabel(targetStatus) }}</strong>?
        </p>
        <p class="text-sm text-gray-600">
          Esta acción no se puede deshacer.
        </p>
      </div>

      <!-- Error -->
      <div v-else class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-700 text-sm font-semibold mb-2">Error</p>
        <p class="text-red-600 text-sm">{{ apiError }}</p>
      </div>

      <!-- Botones -->
      <div class="flex gap-3 justify-end">
        <button
          @click="$emit('cancel')"
          :disabled="loading"
          class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:bg-gray-100 transition"
        >
          {{ apiError ? 'Cancelar' : 'Cancelar' }}
        </button>
        <button
          @click="handleConfirm"
          :disabled="loading"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {{ loading ? 'Procesando...' : apiError ? 'Reintentar' : 'Confirmar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useOrderStore } from '@/stores/orderStore';
import type { Order, OrderStatus } from '@/types/order';

const props = defineProps<{
  order: Order;
  targetStatus: OrderStatus;
}>();

defineEmits<{
  confirm: [];
  cancel: [];
}>();

const store = useOrderStore();
const loading = ref(false);
const apiError = ref<string | null>(null);

const handleConfirm = async () => {
  loading.value = true;
  apiError.value = null;

  try {
    await store.updateOrderStatus(props.order.id, props.targetStatus);
    loading.value = false;
    emit('confirm');
  } catch (error) {
    apiError.value =
      error instanceof Error ? error.message : 'Error al cambiar estado';
    loading.value = false;
  }
};

const getStatusLabel = (status: OrderStatus): string => {
  const labels: Record<OrderStatus, string> = {
    BORRADOR: 'Borrador',
    APROBADA: 'Aprobada',
    RECHAZADA: 'Rechazada',
    PAGADA: 'Pagada',
  };
  return labels[status];
};
</script>
Technical Notes:

Fixed positioning para modal overlay
Loading state desactiva botones
Error permite reintentar sin cerrar
Emite 'confirm' para actualizar UI padre


EPIC 6: Bloque 5 — Pruebas & Pulido
Tests unitarios, responsividad, refactor

US-6.1: Escribir tests unitarios para OrderForm

Epic: Bloque 5 — Pruebas
Priority: 🔴 High
Story Points: 2
Status: Not Started
Assigned: Tú
Estimated Hours: 1

Description:
Crear tests con Vitest y Vue Test Utils para componente OrderForm. Probar validaciones, submit, y manejo de errores.
Acceptance Criteria:

 Archivo src/__tests__/components/OrderForm.spec.ts creado
 Test: botón submit deshabilitado con form vacío
 Test: botón submit habilitado cuando válido
 Test: mensajes de error por cada campo
 Test: submit llama a store.createOrder()
 Test: emite 'success' tras crear exitosamente
 Todos los tests pasan

Code Template:
typescript// src/__tests__/components/OrderForm.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import OrderForm from '@/components/OrderForm.vue';

describe('OrderForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('disables submit button when form is empty', () => {
    const wrapper = mount(OrderForm);
    const button = wrapper.find('button[type="submit"]');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('enables submit button when all fields are valid', async () => {
    const wrapper = mount(OrderForm);

    const providerInput = wrapper.find('input[type="text"]');
    await providerInput.setValue('Test Provider Inc');

    const amountInput = wrapper.find('input[type="number"]');
    await amountInput.setValue(1000000);

    const conceptInput = wrapper.find('textarea');
    await conceptInput.setValue('Test concept');

    const button = wrapper.find('button[type="submit"]');
    expect(button.attributes('disabled')).toBeUndefined();
  });

  it('shows error when provider name is too short', async () => {
    const wrapper = mount(OrderForm);
    const input = wrapper.find('input[type="text"]');

    await input.setValue('AB');
    await input.trigger('blur');

    expect(wrapper.text()).toContain('Mínimo 3 caracteres');
  });

  it('shows error when amount is zero or negative', async () => {
    const wrapper = mount(OrderForm);
    const input = wrapper.find('input[type="number"]');

    await input.setValue(0);
    await input.trigger('blur');

    expect(wrapper.text()).toContain('debe ser mayor a 0');
  });

  it('shows error when concept exceeds 250 characters', async () => {
    const wrapper = mount(OrderForm);
    const textarea = wrapper.find('textarea');

    const longText = 'a'.repeat(251);
    await textarea.setValue(longText);
    await textarea.trigger('blur');

    expect(wrapper.text()).toContain('Máximo 250 caracteres');
  });

  it('emits success event after successful submission', async () => {
    const wrapper = mount(OrderForm);

    // Fill valid form
    await wrapper.find('input[type="text"]').setValue('Test Provider');
    await wrapper.find('input[type="number"]').setValue(1000000);
    await wrapper.find('textarea').setValue('Test concept');

    // Submit
    await wrapper.find('form').trigger('submit');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('success')).toBeTruthy();
  });
});
Technical Notes:

Usa Vitest (ya en dependencias)
Vue Test Utils para montar componentes
Mock Pinia store
Prueba flujo válido e inválido


US-6.2: Escribir tests unitarios para OrderList

Epic: Bloque 5 — Pruebas
Priority: 🔴 High
Story Points: 1
Status: Not Started
Assigned: Tú
Estimated Hours: 0.5

Description:
Crear tests para OrderList. Probar renderizado de tabla/cards, emisión de eventos, y manejo de órdenes vacías.
Acceptance Criteria:

 Archivo src/__tests__/components/OrderList.spec.ts creado
 Test: tabla renderiza órdenes
 Test: clickear fila emite evento 'select'
 Test: muestra loading state
 Test: muestra empty state cuando no hay órdenes
 Todos los tests pasan

Code Template:
typescript// src/__tests__/components/OrderList.spec.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import OrderList from '@/components/OrderList.vue';
import { useOrderStore } from '@/stores/orderStore';
import type { Order } from '@/types/order';

describe('OrderList', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders table rows for each order', () => {
    const store = useOrderStore();
    store.orders = [
      {
        id: '1',
        providerName: 'Provider A',
        amount: 1000000,
        concept: 'Test',
        createdAt: new Date().toISOString(),
        status: 'BORRADOR',
      },
    ] as Order[];

    const wrapper = mount(OrderList);
    expect(wrapper.find('table').exists()).toBe(true);
    expect(wrapper.text()).toContain('Provider A');
  });

  it('emits select event when row is clicked', async () => {
    const store = useOrderStore();
    const order: Order = {
      id: '1',
      providerName: 'Provider A',
      amount: 1000000,
      concept: 'Test',
      createdAt: new Date().toISOString(),
      status: 'BORRADOR',
    };
    store.orders = [order];

    const wrapper = mount(OrderList);
    await wrapper.find('tbody tr').trigger('click');

    expect(wrapper.emitted('select')).toBeTruthy();
    expect(wrapper.emitted('select')?.[0]).toEqual([order]);
  });
});
Technical Notes:

Prueba dos escenarios clave: renderizado y eventos
Mock store con órdenes de test


US-6.3: Revisar y mejorar responsive design

Epic: Bloque 5 — Pruebas
Priority: 🔴 High
Story Points: 2
Status: Not Started
Assigned: Tú
Estimated Hours: 1.5

Description:
Revisar responsive design en 3 breakpoints. Verificar que tabla se oculta en mobile, cards apiladas en mobile, filtros adaptados, etc.
Acceptance Criteria:

 Mobile (<640px): cards visible, table hidden, filtros stacked
 Tablet (640-1023px): grid 2 cols, filtros lado a lado
 Desktop (1024px+): tabla full, filtros row
 Sin scroll horizontal
 Buttons/inputs con altura mínima 44px (touch-friendly)
 Padding/margin apropriados en cada breakpoint
 Fonts legibles en cada tamaño

Breakpoints a probar:
Mobile:   375px (iPhone SE)
Tablet:   768px (iPad)
Desktop:  1440px (desktop)
Testing:
bash# En DevTools (F12):
# Device Toolbar → seleccionar dispositivos predefinidos
# Probar: iPhone SE, iPad, Desktop
# Verificar: no horizontal scroll, legibilidad
Tailwind Classes Reference:
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px

US-6.4: Refactorizar y limpiar código

Epic: Bloque 5 — Pruebas
Priority: 🔴 High
Story Points: 1
Status: Not Started
Assigned: Tú
Estimated Hours: 0.5

Description:
Revisar código en busca de mejoras: imports innecesarios, variables no usadas, nombres poco claros, formateo inconsistente.
Acceptance Criteria:

 No hay imports sin usar
 No hay variables/funciones no usadas
 Nombres descriptivos (ej: validateProviderName en lugar de validate)
 Composables documentados con JSDoc
 Formateo consistente (prettier o similar)
 Sin comentarios obvios o redundantes

Checklist:

 Ejecutar linter: npm run lint (si lo hay)
 Revisar cada componente
 Revisar composables
 Revisar stores


EPIC 7: Documentación & Entrega
README, screenshots, sección pendientes

US-7.1: Escribir README completo

Epic: Documentación
Priority: 🔴 High
Story Points: 3
Status: Not Started
Assigned: Tú + Gemini
Estimated Hours: 1.5

Description:
Crear archivo README.md en raíz del proyecto con toda la documentación necesaria. Debe permitir ejecutar el proyecto siguiendo solo el README.
Acceptance Criteria:

 Sección "Descripción": qué es el proyecto
 Sección "Stack técnico": tecnologías usadas
 Sección "¿Por qué Nuxt?": justificación
 Sección "Requisitos previos": Node.js version, etc
 Sección "Cómo ejecutar":

 npm install
 npm run dev
 URL donde corre (http://localhost:3000)


 Sección "Cómo ejecutar tests": npm run test
 Sección "Decisiones de diseño": 4-5 decisiones principales documentadas
 Sección "Estructura de carpetas": breve explicación
 Sección "Pendientes": lo que no completé y por qué
 Sección "Si tuviera más tiempo": qué haría

README Template:
markdown# Ginko Payment Orders

## Descripción

Aplicación Vue 3 para gestión de pagos a proveedores. Prueba técnica para Ginko Financial Solutions.

Permite:
- Listar órdenes de pago con filtros
- Crear nuevas órdenes
- Ver detalle y cambiar estado de órdenes
- Transiciones de estado validadas

## Stack técnico

- **Frontend**: Vue 3 (Composition API)
- **Framework**: Nuxt 3
- **Bundler**: Vite
- **Estado global**: Pinia
- **Routing**: Vue Router (integrado en Nuxt)
- **Styling**: Tailwind CSS
- **Mock API**: MSW (Mock Service Worker)
- **Testing**: Vitest + Vue Test Utils
- **Lenguaje**: TypeScript

## ¿Por qué Nuxt en lugar de Vue 3 puro?

Nuxt 3 proporciona:
- **File-based routing**: `/pages/create.vue` → ruta `/create`
- **Auto-imports**: componentes y composables se importan automáticamente
- **Mejor DX**: menos configuración, más convención
- **Preparado para SSR**: aunque no se usa en esta prueba

## Requisitos previos

- Node.js 18+ (recomendado 20+)
- npm o yarn

## Cómo ejecutar

### 1. Instalar dependencias

\`\`\`bash
npm install
\`\`\`

### 2. Ejecutar en desarrollo

\`\`\`bash
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 3. Ejecutar tests

\`\`\`bash
npm run test
\`\`\`

o modo watch:

\`\`\`bash
npm run test -- --watch
\`\`\`

## Estructura de carpetas

\`\`\`
src/
├── components/          # Componentes reutilizables (OrderList, OrderForm, etc)
├── pages/              # Páginas/vistas (automáticamente rutas)
├── composables/        # Composables (useOrderFilters, usePagination, etc)
├── stores/             # Pinia stores (orderStore)
├── services/
│   └── mocks/          # MSW handlers y setup
├── types/              # Tipos TypeScript (order.ts)
└── assets/             # Estilos globales
\`\`\`

## Decisiones de diseño

### 1. MSW para mock API

**Decisión**: Usar MSW en lugar de json-server

**Justificación**:
- MSW intercepta calls de `fetch()` sin servidor externo
- Funciona en tests sin overhead adicional
- Permite simular delays y errores fácilmente
- Fácil de desactivar en producción

### 2. Estado global (Pinia) vs local

**Decisión**:
- **Pinia**: órdenes, filtros aplicados
- **Local (ref/reactive)**: modales abiertos/cerrados, estado de formulario

**Justificación**:
- Órdenes necesitan ser compartidas por múltiples vistas
- Filtros deben persistir en URL y reflejarse globalmente
- Estado efímero (modales) no merece Pinia

### 3. Paginación cliente

**Decisión**: Paginación del lado del cliente (10 items/page)

**Justificación**:
- Simple para dataset pequeño
- No requiere server-side logic
- Suficiente para demo

### 4. Máquina de estados explícita

**Decisión**: Usar composable `useOrderStateTransition()` con transiciones hardcoded

**Justificación**:
- Validaciones centralizadas
- Fácil de testear
- Evita bugs de transiciones inválidas

### 5. Validación de formulario en composable

**Decisión**: Lógica de validación en `useOrderForm()` (o en componente)

**Justificación**:
- Reutilizable si se necesita en otro lugar
- Separación de concerns
- Testeable

## Estructura de rutas

- `/orders` - Listado de órdenes con filtros
- `/create` - Crear nueva orden
- `/orders/[id]` - Detalle de orden y transiciones

## Testing

Tests con Vitest + Vue Test Utils:

```bash
npm run test
```

Cubierto:
- ✅ OrderForm (validaciones, submit)
- ✅ OrderList (renderizado, emisión de eventos)
- ⏳ OrderDetail, modals (pendientes por time-box)

## Pendientes

Lo que **no** completé y por qué:

- **Composable useApi()** para fetch reutilizable
  - Tiempo: hubiera tomado 1 hora
  - Alternativa: implementar cuando sea necesario refactorizar

- **Optimistic updates** en transiciones de estado
  - Complejidad: requiere rollback si API falla
  - Trade-off: preferí confiabilidad a UX flashy

- **Atajos de teclado** (Escape, Enter)
  - Tiempo: 30 min
  - Prioridad baja comparado con funcionalidades core

- **Dark mode**
  - Tiempo: 1 hora (Tailwind dark mode + toggle)
  - Prioridad baja

- **Más tests** (OrderDetail, StateTransitionButtons, modals)
  - Tiempo: 2+ horas
  - Decidí priorizar funcionalidad core
  - Cobertura de componentes críticos cubierta

## Si tuviera más tiempo (priorizado)

1. **Composable useApi()** (1 hora)
   - Unificar lógica de fetch en componentes
   - Loading/error handling centralizado

2. **Más cobertura de tests** (2 horas)
   - OrderDetail, modals, composables
   - Edge cases

3. **Dark mode** (1 hora)
   - Tailwind dark mode
   - Toggle en navbar

4. **Atajos de teclado** (30 min)
   - Escape cierra modales
   - Enter confirma acciones

5. **Animaciones** (1 hora)
   - Vue Transition en cambios de estado
   - Skeleton loading

## Decisiones técnicas importantes

### ¿Por qué Composition API?

Composition API es el estándar moderno en Vue 3. Ofrece:
- Mejor reutilización de lógica (composables)
- Type-safety más fácil con TypeScript
- Mejor performance en componentes grandes

### ¿Por qué no usar Vuetify/PrimeVue?

Decidí usar Tailwind CSS puro porque:
- El requirement de UX es "limpieza, no estilo"
- Tailwind es más flexible
- Menos dependencias
- Aprendizaje más valioso para una prueba técnica

### Validación cliente vs servidor

Implementé validación **cliente** completa. En producción:
- Validación cliente para UX inmediato
- Validación servidor para seguridad
- Manejo de errores de servidor en modal ConfirmStateTransition

## Commits

Histórico de commits sigue estructura de User Stories:
\`\`\`
chore: initial Nuxt 3 scaffold
feat: add TypeScript types and MSW mock API
feat: initialize Pinia order store
feat: add OrderList component with table and cards
feat: add FilterBar and useOrderFilters composable
feat: add CreateOrder form with validations
feat: add OrderDetail and state transitions
test: add unit tests for OrderForm and OrderList
docs: add comprehensive README
\`\`\`

Cada commit es atómico y describa una unidad de trabajo.

## Autor

Juan David Ospina - Mayo 2026

## Licencia

MIT (implied por la prueba técnica)
Technical Notes:

README debe ser ejecutable siguiendo solo sus instrucciones
Decisiones de diseño justificadas brevemente
Sección Pendientes es crítica para evaluación


US-7.2: Agregar screenshots al README (opcional pero suma)

Epic: Documentación
Priority: 🟡 Medium
Story Points: 1
Status: Not Started
Assigned: Tú
Estimated Hours: 0.5

Description:
Capturar 3-4 screenshots de las vistas principales en desktop y mobile. Agregarlas al README.
Acceptance Criteria:

 Screenshot listado ordenes (desktop con tabla)
 Screenshot listado ordenes (mobile con cards)
 Screenshot formulario crear orden
 Screenshot detalle orden con botones de transición
 Imágenes embebidas en README con ![alt](./path)
 Captions descriptivas

How to:
markdown## Screenshots

### Listado - Desktop
![Listado en desktop con tabla](./docs/screenshots/list-desktop.png)

### Listado - Mobile
![Listado en mobile con cards](./docs/screenshots/list-mobile.png)

### Crear Orden
![Formulario de creación con validaciones](./docs/screenshots/create-form.png)

### Detalle y Transiciones
![Detalle de orden con botones de estado](./docs/screenshots/detail.png)

US-7.3: Preparar repositorio para entrega

Epic: Documentación
Priority: 🔴 High
Story Points: 1
Status: Not Started
Assigned: Tú
Estimated Hours: 0.5

Description:
Verificar que repo está limpio y listo para entrega. Revisar que README es suficiente para ejecutar, últimos commits, etc.
Acceptance Criteria:

 .gitignore está correcto (excluye node_modules, .env, dist)
 No hay archivos basura (.DS_Store, debug logs)
 Commits limpios y descriptivos
 npm install && npm run dev funciona sin errores (probado)
 npm run test ejecuta sin errores
 README probado: otra persona puede ejecutar solo leyéndolo
 Último commit antes de la entrega

Checklist:
bash# Verificar build
npm run build

# Verificar que el dev server inicia
npm run dev
# (presionar Ctrl+C para detener)

# Verificar tests
npm run test

# Verificar que no hay errores en logs
# Verificar .gitignore
cat .gitignore

# Último commit
git log --oneline -5
Final Commit:
bashgit add .
git commit -m "chore: final review and ready for delivery"
git push origin main

EPIC 8: Funcionalidades Adicionales (Optional)
Bloque 6: si sobra tiempo

US-8.1: Composable useApi() para consumo unificado

Epic: Adicionales
Priority: 🟡 Medium
Story Points: 2
Status: Not Started
Assigned: Tú
Estimated Hours: 1

Description:
Crear composable genérico useApi() que reutilice lógica de fetch con manejo automático de loading y error.
Code Template:
typescript// src/composables/useApi.ts
import { ref } from 'vue';

export function useApi<T>(fn: () => Promise<T>) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const execute = async () => {
    loading.value = true;
    error.value = null;
    try {
      data.value = await fn();
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error';
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, error, execute };
}

US-8.2: Optimistic updates en transiciones

Epic: Adicionales
Priority: 🟡 Medium
Story Points: 3
Status: Not Started
Assigned: Tú
Estimated Hours: 1.5

Description:
Cambiar estado inmediatamente en UI, luego sincronizar con servidor. Si falla, rollback.
Complexity: Alta — requiere gestión cuidadosa de estado.

US-8.3: Atajos de teclado

Epic: Adicionales
Priority: 🟡 Medium
Story Points: 1
Status: Not Started
Assigned: Tú
Estimated Hours: 0.5

Atajos:

Escape: Cierra modales de confirmación
Enter: Confirma acciones en modales


US-8.4: Dark mode

Epic: Adicionales
Priority: 🟡 Medium
Story Points: 2
Status: Not Started
Assigned: Tú
Estimated Hours: 1

Implementación:

Tailwind dark mode (dark: prefix)
Toggle en navbar/header
Persistir en localStorage


📊 Resumen
Total User Stories: ~40+
Horas estimadas:

Bloques 1-5 (obligatorios): ~20 horas
Bloque 6 (adicionales): ~3-5 horas
Buffer: ~2-3 horas
Total: 25 horas (dentro del presupuesto de 6-10 horas efectivas)
