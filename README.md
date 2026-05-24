# 📋 Ginko Payment Orders

Aplicación Vue 3 + Nuxt 4 para gestión de órdenes de pago a proveedores.

---

## 🎯 Características

- ✅ Listado de órdenes con tabla (desktop) y tarjetas (mobile)
- ✅ Filtros por estado y búsqueda de proveedor (sincronizados en URL)
- ✅ Crear nuevas órdenes con validaciones en tiempo real
- ✅ Vista detallada con transición de estados
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Tests unitarios con Vitest + Vue Test Utils

---

## 🏗️ Stack Técnico

- **Framework**: Nuxt 4 (file-based routing, auto-imports)
- **Lenguaje**: TypeScript
- **Estado**: Pinia (global) + composables (local)
- **Validación**: Vee-Validate + Zod
- **Estilos**: Tailwind CSS
- **Mock API**: MSW (datos en localStorage)
- **Testing**: Vitest + Vue Test Utils

---

## 📥 Requisitos Previos

- Node.js 24+ (recomendado 24+)

---

## 🚀 Instalación

```bash
# Clonar
git clone https://github.com/tuusuario/ginko-payment-orders.git
cd ginko-payment-orders

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

Abre http://localhost:3000 en tu navegador.

---

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Modo watch
npm run test -- --watch

# Coverage
npm run test -- --coverage
```

---

## 📂 Estructura del Proyecto

```
src/
├── components/           # Componentes atómicos (OrderList, StatusBadge, etc)
├── pages/               # Rutas (file-based routing)
│   ├── index.vue        # Dashboard
│   └── orders/
│       ├── index.vue    # Listado
│       ├── create.vue   # Crear orden
│       └── [id].vue     # Detalle
├── stores/              # Pinia (estado global)
├── composables/         # Lógica reutilizable
│   ├── useOrderFilters.ts
│   ├── useOrderForm.ts
│   ├── useApi.ts
│   └── useOrderStateTransition.ts
├── services/            # Lógica de negocio
│   └── mocks/           # MSW handlers
├── types/               # Tipos TypeScript
└── assets/              # Estilos y recursos
```

---

## 🎨 Decisiones de Diseño

### 1. **Nuxt 4 vs Vue 3 puro**
- File-based routing automático
- Auto-imports de componentes y composables
- Mejor DX y escalabilidad

### 2. **Estado Global (Pinia) vs Local**
- **Pinia**: órdenes, filtros persistentes
- **Local**: validaciones, modales, estado efímero
- Composables encapsulan lógica sin contaminar store

### 3. **Validación: Vee-Validate + Zod**
- Esquemas TypeScript tipados
- Validaciones declarativas
- Reutilizable cliente/servidor

### 4. **Filtros en URL (Query Parameters)**
- Fuente única de verdad para filtros
- Shareable links con filtros aplicados
- Persistent en recarga (F5)

### 5. **MSW para Mock API**
- Intercepta calls de fetch sin servidor externo
- Persistencia con localStorage (`ginko_orders`)
- Solo activo en desarrollo

### 6. **Componentes Atómicos**
- Responsabilidad única
- Reutilizable (StatusBadge en tabla, cards, detalle)
- Fácil de testear

---

## 🌐 Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Dashboard |
| `/orders` | Listado con filtros |
| `/orders/create` | Crear nueva orden |
| `/orders/:id` | Detalle y transiciones |

---

## 📊 Funcionalidades Implementadas

### Bloque 1: Listado ✅
- Tabla desktop + tarjetas mobile
- Indicadores de estado con colores
- Estados: cargando, error, vacío
- Paginación cliente (10/página)

### Bloque 2: Filtros ✅
- Estado (TODOS, BORRADOR, APROBADA, RECHAZADA, PAGADA)
- Búsqueda por proveedor
- AND logic
- Query params sincronizados

### Bloque 3: Formulario ✅
- Validaciones: proveedor (min 3), monto (>0), concepto (max 250)
- Mensajes de error por campo
- Contador de caracteres
- Submit deshabilitado en estado inválido

### Bloque 4: Detalle ✅
- Vista completa de orden
- Máquina de estados: BORRADOR→[APROBADA,RECHAZADA], APROBADA→PAGADA
- Modal de confirmación
- Manejo de errores

### Bloque 5: Calidad ✅
- Componentes pequeños y reutilizables
- Estado local vs Pinia documentado
- Responsive (mobile, tablet, desktop)
- Tests: OrderForm, OrderList, useOrderFilters

---

## 🟡 Pendientes

Lo que **no** completé y por qué:

| Feature | Razón | Tiempo |
|---------|-------|--------|
| **Optimistic Updates** | Requiere rollback si API falla; preferí confiabilidad | 2h |
| **Atajos de Teclado** | Low priority vs funcionalidades core | 30min |
| **Dark Mode** | Low priority | 1h |
| **Más Tests** | Coverage actual ~60%; necesitaría 80%+ | 2h |
| **Animations** | Polish visual; low priority | 1h |

---

## 🧠 Composables Principales

### `useOrderFilters()`
Sincronización de filtros con URL y cálculo de órdenes filtradas.

### `useOrderForm()`
Validación y submit de formulario con Zod + Vee-Validate.

### `useApi<T>()`
Wrapper genérico para llamadas asíncronas (loading/error/data).

### `useOrderStateTransition()`
Máquina de estados validada para transiciones de órdenes.

---

## 📦 Store Pinia

### State
```typescript
orders: PaymentOrder[]
loading: boolean
error: string | null
```

### Actions
- `fetchOrders()` - GET /api/orders
- `createOrder(payload)` - POST /api/orders
- `updateOrderStatus(id, status)` - PATCH /api/orders/:id

### Getters
- `orderById(id)` - Buscar por ID
- `ordersByStatus(status)` - Filtrar por estado

---

## 🔧 Desarrollo

### Build
```bash
npm run build
npm run preview
```

### Lint (si está configurado)
```bash
npm run lint
```

---

## 📝 Notas Técnicas

### Datos Mock
Los datos se guardan en `localStorage` con clave `ginko_orders`.

**Limpiar datos**:
```javascript
localStorage.removeItem('ginko_orders');
location.reload();
```

### Validación
- **Cliente**: Vee-Validate + Zod (en tiempo real)
- **Servidor**: En producción, validar en backend también

### Responsive Design
- **Mobile**: < 640px (cards full-width, tabla hidden)
- **Tablet**: 640-1023px (grid 2 cols)
- **Desktop**: ≥ 1024px (tabla full, filtros lado a lado)

---

## ✨ Si tuviera más tiempo

1. Optimistic updates (UX mejorado)
2. 80%+ test coverage
3. Dark mode
4. Animations en transiciones
5. Atajos de teclado

---

## 📄 Commits

Historial organizado por features:

```
chore: initial Nuxt 4 scaffold
feat: add TypeScript types and Pinia store
feat: setup MSW mock API
feat: add OrderList component (responsive)
feat: add FilterBar and useOrderFilters
feat: add OrderForm with Vee-Validate + Zod
feat: add OrderDetail with state transitions
test: add unit tests
docs: add README
```

---

## 🎓 Aprendizajes

- Query parameters como estado compartido funciona muy bien
- Máquinas de estado explícitas previenen bugs
- Composables reutilizables > duplicación de código
- TypeScript + Zod = confianza en validaciones

---

#### Index
<img width="1100" height="747" alt="GinkoPaymentsIndex" src="https://github.com/user-attachments/assets/99c41bca-0e41-4334-8123-4bec560047d7" />

#### Index Mobile
<img width="388" height="747" alt="GinkoPaymentsIndex_mobile" src="https://github.com/user-attachments/assets/5f2e01e6-e931-40af-9c84-87151f283cd4" />

#### Order List Dark
<img width="1118" height="878" alt="OrderList_dark" src="https://github.com/user-attachments/assets/1c2a6782-e5f9-4311-b478-700237c6d8fa" />

#### Order List Filter
<img width="1093" height="878" alt="OrdersListWithFilter" src="https://github.com/user-attachments/assets/2e932c51-f79f-4fb5-8ef6-2bb8daaedf2e" />

#### Order List Mobile
<img width="644" height="878" alt="OrderList_mobile" src="https://github.com/user-attachments/assets/a7b2549b-c516-46b5-9d8e-dfbda78f1553" />

#### Order Detail
<img width="1108" height="878" alt="OrderDetail" src="https://github.com/user-attachments/assets/333ca790-1441-477e-8d3d-505d597fc453" />

#### Order Detail Dark Mobile
<img width="479" height="878" alt="orderDetailDarkMobile" src="https://github.com/user-attachments/assets/9b33a4c4-462c-43b9-ae67-f6fbeaaa281f" />

#### Order Detail Dark View
<img width="1108" height="878" alt="orderDetailDark" src="https://github.com/user-attachments/assets/f9f09138-330b-478b-a2f3-abf78ab1026b" />

### Create Order
<img width="1029" height="878" alt="GinkoPayments1CreateOrder" src="https://github.com/user-attachments/assets/e298bd71-9323-451c-b548-6318595d3a82" />

### Create Order Mobile
<img width="438" height="878" alt="GinkoPayments1CreateOrder_mobile" src="https://github.com/user-attachments/assets/b0c88028-d4bc-4c10-9a18-6169f1fc2f58" />


## Autor

Juan David Ospina - Mayo 2026

## Licencia

MIT (implied por la prueba técnica)

**Última actualización**: Mayo 2026  
**Estado**: Completado y listo para evaluación
