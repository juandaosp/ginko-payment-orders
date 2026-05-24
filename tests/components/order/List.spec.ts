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

    // En lugar de hacer trigger al componente, busca el elemento que tiene el evento
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

    // Asumiendo que el botón "Siguiente" tiene un identificador o es el último botón
    const buttons = wrapper.findAll("button");
    const nextBtn = buttons.find((b) => b.text() === "Siguiente");

    await nextBtn?.trigger("click");
    expect(wrapper.vm.currentPage).toBe(2); // Validamos que el estado interno cambió
  });

  it("no debería permitir ir a una página mayor al total", async () => {
    const wrapper = mount(OrderList, {
      props: { orders: Array(15).fill(mockOrderA) },
    });
    // Forzamos la navegación hasta el final
    await wrapper.setData({ currentPage: 2 });

    const nextBtn = wrapper
      .findAll("button")
      .find((b) => b.text() === "Siguiente");
    expect(nextBtn?.element.disabled).toBe(true);
  });
  it("debería retroceder a la página anterior", async () => {
    const wrapper = mount(OrderList, {
      props: { orders: Array(20).fill(mockOrderA) },
    });

    // Primero vamos a la página 2
    await wrapper.setData({ currentPage: 2 });

    // Ahora buscamos el botón "Anterior"
    const prevBtn = wrapper
      .findAll("button")
      .find((b) => b.text() === "Anterior");

    await prevBtn?.trigger("click");
    expect(wrapper.vm.currentPage).toBe(1);
  });
});
