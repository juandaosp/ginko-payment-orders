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

  async updateOrderStatus(id: string, status: string) {
    // Asegúrate de que esta URL sea exactamente '/api/orders/' + id
    const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) throw new Error("Error en servicio");
    return response.json();
  },
};
