import type { PaymentOrder } from "~/types";

export const orderService = {
  async getOrders() {
    const response = await fetch("/api/orders");
    return response.json();
  },

  async createOrder(order: Partial<PaymentOrder>): Promise<PaymentOrder> {
    const response = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  },
};
