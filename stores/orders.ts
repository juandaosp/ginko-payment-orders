import { defineStore } from "pinia";
import { orderService } from "../services/orderService"; // Importamos el objeto completo
import type { OrderStatus, PaymentOrder } from "../types";

export const useOrderStore = defineStore("orders", {
  state: () => ({
    orders: [] as PaymentOrder[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async loadOrders() {
      this.loading = true;
      this.error = null;
      try {
        this.orders = await orderService.getOrders();
      } catch (err) {
        this.error = "Error al cargar las órdenes desde el servidor";
      } finally {
        this.loading = false;
      }
    },

    async createOrder(orderData: any) {
      this.loading = true;
      this.error = null;
      try {
        const newOrder = await orderService.createOrder(orderData);
        this.orders.unshift(newOrder);
      } catch (err) {
        this.error = "Error al crear la orden";
        throw err;
      } finally {
        this.loading = false;
      }
    },
    async updateOrderStatus(id: string, status: OrderStatus) {
      this.loading = true;
      this.error = null;
      try {
        const updatedOrder = await orderService.updateOrderStatus(id, status);

        const index = this.orders.findIndex((o) => o.id === id);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
        }
      } catch (err) {
        this.error = "Error al actualizar el estado";
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
