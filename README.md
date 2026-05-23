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

### 2. Gestión de Estado (Pinia vs. Local)
* **Pinia:** Utilizado para el estado global (ej. listado centralizado de órdenes, filtros persistentes en URL).
* **Estado Local:** Aplicado para lógica de componentes (validaciones de formularios, estados de UI efímeros), asegurando que los componentes sean altamente reutilizables y desacoplados.

### 3. Consumo de API
* Se implementó un composable centralizado `useApi`. Esto unifica el manejo de los estados `loading`, `error` y `data`, garantizando una experiencia de usuario (UX) consistente en todos los puntos de la aplicación.

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
- `composables/`: (Pendiente) Lógica reutilizable como `useApi`.
- `components/`: (Pendiente) Componentes de UI.
- `services/`: (Pendiente) Configuración del Mock API (MSW).
