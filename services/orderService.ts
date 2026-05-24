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
  {
    id: "3",
    providerName: "Proveedor C",
    amount: 4156456,
    concept: "Licencias",
    createdAt: "2026-05-21",
    status: "RECHAZADA",
  },
  {
    id: "4",
    providerName: "Proveedor D",
    amount: 454551,
    concept: "Licencias",
    createdAt: "2026-05-21",
    status: "PAGADA",
  },
  {
    id: "5",
    providerName: "Proveedor E",
    amount: 622959,
    concept: "Licencias",
    createdAt: "2026-05-21",
    status: "APROBADA",
  },
  {
    id: "6",
    providerName: "Proveedor F",
    amount: 454551,
    concept: "Licencias",
    createdAt: "2026-05-21",
    status: "APROBADA",
  },
  {
    id: "7",
    providerName: "Proveedor G",
    amount: 892147,
    concept: "Licencias",
    createdAt: "2026-05-21",
    status: "APROBADA",
  },
  {
    id: "8",
    providerName: "Proveedor H",
    amount: 1457812,
    concept: "Licencias",
    createdAt: "2026-05-21",
    status: "APROBADA",
  },
  {
    id: "9",
    providerName: "Proveedor I",
    amount: 21448624,
    concept: "Licencias",
    createdAt: "2026-05-21",
    status: "APROBADA",
  },
  {
    id: "10",
    providerName: "Proveedor J",
    amount: 899314174,
    concept: "Licencias",
    createdAt: "2026-05-21",
    status: "APROBADA",
  },
  {
    id: "11",
    providerName: "Proveedor K",
    amount: 1457812,
    concept: "Licencias",
    createdAt: "2026-05-21",
    status: "APROBADA",
  },
  {
    id: "12",
    providerName: "Proveedor L",
    amount: 1457812,
    concept: "Licencias",
    createdAt: "2026-05-21",
    status: "APROBADA",
  },
];

export const fetchOrders = async (): Promise<PaymentOrder[]> => {
  // Simulamos una llamada asíncrona
  return new Promise((resolve) => setTimeout(() => resolve(mockOrders), 500));
};
