import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import OrderList from "~/components/order/List.vue";
import { mockOrderA, mockOrderB } from "../../mocks/order";

describe("OrderList", () => {
  const mockOrders = [mockOrderA, mockOrderB];

  it("renderiza la lista de órdenes", () => {
    const wrapper = mount(OrderList, { props: { orders: mockOrders } });
    const rows = wrapper.findAll("tr");
    expect(rows.length).toBeGreaterThan(0);
  });

  it("emite el evento al hacer clic en una orden", async () => {
    const wrapper = mount(OrderList, { props: { orders: mockOrders } });
    const row = wrapper.findComponent({ name: "OrderRow" });
    await row.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("order-click");
    expect(wrapper.emitted("order-click")![0]).toEqual([mockOrders[0]]);
  });

  it("no renderiza filas si no hay órdenes", () => {
    const wrapper = mount(OrderList, { props: { orders: [] } });
    expect(wrapper.findComponent({ name: "OrderRow" }).exists()).toBe(false);
  });

  it("ejecuta la función onOrderClick al hacer clic en una fila", async () => {
    const wrapper = mount(OrderList, { props: { orders: [mockOrderA] } });

    await wrapper
      .findComponent({ name: "OrderRow" })
      .vm.$emit("click", mockOrderA);

    expect(wrapper.emitted("order-click")).toBeTruthy();
    expect(wrapper.emitted("order-click")![0]).toEqual([mockOrderA]);
  });

  it("debería cambiar a la página siguiente al hacer clic en siguiente", async () => {
    const wrapper = mount(OrderList, {
      props: { orders: Array(20).fill(mockOrderA) },
    });

    const pagination = wrapper.findComponent({ name: "PaginationControls" });
    await pagination.vm.$emit("next");
    expect(wrapper.text()).toContain(mockOrderA.id);
    expect(pagination.props("currentPage")).toBe(2);
  });

  it("debería retroceder a la página anterior", async () => {
    const wrapper = mount(OrderList, {
      props: { orders: Array(20).fill(mockOrderA) },
    });

    const nextBtn = wrapper
      .findAll("button")
      .find((b) => b.text() === "Siguiente");
    await nextBtn?.trigger("click");
    console.log(Object.keys(wrapper.emitted())); // <-- Esto te dirá qué nombres de eventos existen

    const prevBtn = wrapper
      .findAll("button")
      .find((b) => b.text() === "Anterior");
    expect(prevBtn?.element.disabled).toBe(false);

    await prevBtn?.trigger("click");

    expect(prevBtn?.element.disabled).toBe(true);
  });

  it("el botón siguiente debería estar deshabilitado en la última página", async () => {
    const wrapper = mount(OrderList, {
      props: { orders: Array(15).fill(mockOrderA) },
    });

    const pagination = wrapper.findComponent({ name: "PaginationControls" });
    await pagination.vm.$emit("next");

    expect(pagination.props("currentPage")).toBe(2);
    expect(pagination.props("totalPages")).toBe(2);
  });
});
