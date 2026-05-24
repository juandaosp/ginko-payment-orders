import { defineStore } from "pinia";
import { orderService } from "../services/orderService"; // Importamos el objeto completo
import type { PaymentOrder } from "../types";

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
  },
});
