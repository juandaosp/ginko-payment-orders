import type { PaymentOrder } from "../types";

// Mock de datos iniciales
const mockOrders: PaymentOrder[] = [
  {
    id: "1",
    providerName: "Proveedor A",
    amount: 500000,
    concept: "Servicios IT",
    createdAt: "2026-05-20",
    status: "BORRADOR",
  },
  {
    id: "2",
    providerName: "Proveedor B",
    amount: 1200000,
    concept: "Licencias",
    createdAt: "2026-05-21",
    status: "APROBADA",
  },
];

export const fetchOrders = async (): Promise<PaymentOrder[]> => {
  // Simulamos una llamada asíncrona
  return new Promise((resolve) => setTimeout(() => resolve(mockOrders), 500));
};
