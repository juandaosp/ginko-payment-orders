import { defineStore } from "pinia";
import { fetchOrders } from "../services/orderService";
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

      try {
        this.orders = await fetchOrders();
      } catch (err) {
        this.error = "Error al cargar las órdenes";
      } finally {
        this.loading = false;
      }
    },
  },
});
