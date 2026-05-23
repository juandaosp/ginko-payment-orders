import type { PaymentOrder } from "~/types";

export const mockOrderA: PaymentOrder = {
  id: "1",
  providerName: "ProveedorA Test",
  status: "BORRADOR",
  amount: 1000000,
  concept: "Mock Concept",
  createdAt: "2024-10-10",
};

export const mockOrderB: PaymentOrder = {
  id: "2",
  providerName: "ProveedorB Test",
  status: "APROBADA",
  amount: 205000,
  concept: "Mock Concept",
  createdAt: "2024-10-10",
};
