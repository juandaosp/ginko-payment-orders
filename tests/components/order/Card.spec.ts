import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import OrderCard from "~/components/order/Card.vue";
import { mockOrderA, mockOrderB } from "../../mocks/order";

describe("OrderCard", () => {
  it("muestra la información correcta de la orden", () => {
    const wrapper = mount(OrderCard, { props: { order: mockOrderA } });
    expect(wrapper.text()).toContain("ProveedorA Test");
    expect(wrapper.text()).toContain("#1");
  });

  it("emite evento al hacer clic", async () => {
    const wrapper = mount(OrderCard, { props: { order: mockOrderB } });
    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
  });
});
