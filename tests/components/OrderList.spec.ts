import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import OrderList from "../../components/OrderList.vue";
import { mockOrderA, mockOrderB } from "../mocks/order";

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

    // En lugar de hacer trigger al componente, busca el elemento que tiene el evento
    await wrapper
      .findComponent({ name: "OrderRow" })
      .vm.$emit("click", mockOrderA);

    expect(wrapper.emitted("order-click")).toBeTruthy();
    expect(wrapper.emitted("order-click")![0]).toEqual([mockOrderA]);
  });
});
