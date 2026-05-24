export type OrderStatus = "BORRADOR" | "APROBADA" | "RECHAZADA" | "PAGADA";

export interface PaymentOrder {
  id: string;
  providerName: string;
  amount: number; // En pesos colombianos
  concept: string;
  createdAt?: string; // ISO Date string
  status: OrderStatus;
}
