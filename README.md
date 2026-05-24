# Ginko Financial Solutions - Gestión de Pagos

Proyecto desarrollado para la prueba técnica de Ginko. Esta aplicación permite la gestión de órdenes de pago a proveedores con funcionalidades de filtrado, creación y transición de estados.

## 🚀 Tecnologías y Stack
- **Framework:** Nuxt 4
- **Lenguaje:** TypeScript
- **Manejo de Estado:** Pinia
- **Estilos:** Tailwind CSS
- **Testing:** Vitest + Vue Test Utils
- **Mocking:** MSW (Mock Service Worker)

## 📂 Decisiones de Diseño y Arquitectura

### 1. Elección de Framework y manejo de estado: Nuxt 4 y @pinia/nuxt

Aunque inicialmente se consideró una configuración estándar de Vite + Vue, se optó por **Nuxt 4**. 

* **Justificación:** Nuxt proporciona una estructura de carpetas estandarizada que mejora el mantenimiento. El sistema de auto-imports reduce significativamente el *boilerplate*, permitiendo un enfoque directo en la lógica de negocio y la entrega de funcionalidades.

- **Configuración de Estado:** Se instaló `@pinia/nuxt` para gestionar el estado global. La configuración es automática a través del módulo oficial, permitiendo el uso de *stores* con auto-importación.

### 2. Gestión de Estado (Pinia vs. Local) y Formularios
* **Pinia:** Utilizado para el estado global (ej. listado centralizado de órdenes, filtros persistentes en URL).
* **Estado Local:** Aplicado para lógica de componentes (validaciones de formularios, estados de UI efímeros), asegurando que los componentes sean altamente reutilizables y desacoplados.
* **Validación de Formularios:** Se integró vee-validate junto con Zod para definir esquemas de validación tipados. Esto permite validaciones declarativas, feedback en tiempo real y una separación clara entre la interfaz (UI) y la lógica de negocio mediante el composable useOrderForm.

## 🛠 Desarrollo con Mock Service Worker (MSW)
Este proyecto utiliza **MSW** para simular la API de órdenes de pago en el entorno de desarrollo. 

- **Persistencia:** Los datos se guardan en el `localStorage` del navegador con la clave `ginko_orders`.
- **Servicio:** Las llamadas a `/api/orders` son interceptadas automáticamente.
- **Configuración:**
    - Plugin de cliente: `plugins/msw.client.ts`
    - Handlers: `mocks/handlers.ts`
    - Los mocks solo se activan en `process.env.NODE_ENV === 'development'`.

Para limpiar los datos de prueba, puedes borrar la clave `ginko_orders` en la pestaña *Application* de las DevTools de tu navegador.

### 4. Estilos y Diseño
* **Tailwind CSS:** Se integró `@nuxtjs/tailwindcss` para la estilización rápida y consistente de la interfaz, permitiendo un desarrollo de componentes eficiente y mantenible.
### 5. Sincronización de Filtros con la URL (Estado como fuente de verdad)
Se implementó un composable dedicado `useOrderFilters` que utiliza los **query parameters** de la URL como fuente única de verdad para el estado de filtrado (estado y búsqueda).

* **Justificación:** Esto permite que el usuario pueda compartir un enlace específico con filtros aplicados o recargar la página (F5) sin perder su contexto de trabajo.
* **Técnica:** Se evitó el uso de `watchers` complejos mediante el uso de `computed` properties con *getters* y *setters*, logrando una sincronización bidireccional limpia y reactiva entre la URL y la UI.

## 🛠 Instrucciones de Instalación

1. **Clonar el repositorio:**
```bash
   git clone <url-del-repo>
   cd ginko-payment-orders
```
2. **Instalar dependencias:**
```bash
    npm install
```
3. Ejecutar el proyecto en desarrollo:
```bash
    npm run dev
```
La aplicación estará disponible en http://localhost:3000.

## 🧪 Pruebas
Para ejecutar el conjunto de pruebas unitarias y verificar la calidad del código y el coverage:
```bash
    npm run test
```

## 📁 Estructura y Archivos del Proyecto
Esta sección documenta la ubicación y propósito de los archivos principales creados durante el desarrollo:

- `types/index.ts`: Definición de interfaces (`PaymentOrder`) y tipos (`OrderStatus`) para consistencia de datos en toda la aplicación.
- `services/orderService.ts`: Implementación de lógica de Mock para simulación de consumo de API.
- `stores/orders.ts`: Store de Pinia para la gestión del estado global de las órdenes (listado y carga).
- `composables/useApi.ts`: Composable genérico para el manejo unificado de estados de carga, error y datos en llamadas asíncronas.
- `assets/css/main.css`: Archivo de estilos base donde se importan las directivas de Tailwind CSS.
- `composables/`: Lógica de estado compartido y utilidades, incluyendo el manejo unificado de estados de carga y error.
- `composables/useOrderFilters.ts`: Lógica de negocio centralizada para el filtrado de órdenes. Implementa la lógica de filtrado "AND" y asegura la persistencia del estado en los parámetros de la URL.
- `components/`: Componentes de interfaz atómicos y orquestadores (OrderList, OrderRow, OrderCard, StatusBadge, estados de carga/error/vacío).
- `services/`: Simulación de API para órdenes de pago utilizando servicios tipados.
- `pages/create.vue`: Página de acceso /create. Gestiona el layout del formulario y la redirección post-éxito mediante el useRouter.
- `components/OrderForm.vue`: Componente atómico de alta complejidad.
- - Tecnología: vee-validate + zod para validaciones declarativas.

Funcionalidad: Validación en tiempo real, estado loading compartido, contador de caracteres y manejo de errores de API.
## 📁 Estructura de Componentes
Para garantizar la escalabilidad y el testing unitario, hemos desacoplado la interfaz en componentes atómicos:

- `components/OrderList.vue`: Componente orquestador que gestiona la vista de tabla (Desktop) y tarjetas (Mobile).
- `components/OrderRow.vue`: Representación de fila para la tabla de órdenes.
- `components/OrderCard.vue`: Representación de tarjeta para dispositivos móviles.
- `components/StatusBadge.vue`: Componente visual para la representación de estados (`Borrador`, `Aprobada`, etc).
- `components/LoadingState.vue`, `ErrorState.vue`, `EmptyState.vue`: Componentes de estado de UI para mejorar la experiencia de usuario.
