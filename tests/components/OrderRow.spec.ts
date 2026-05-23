import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import OrderRow from "../../components/OrderRow.vue";

describe("OrderRow", () => {
  it('emite un evento "click" al ser presionado', async () => {
    const wrapper = mount(OrderRow, {
      props: {
        order: {
          id: "1",
          providerName: "Test",
          status: "BORRADOR",
          amount: 100000,
          concept: "Payment Test",
          createdAt: "2024-12-15",
        },
      },
    });

    await wrapper.trigger("click");

    // Verificamos que el evento haya sido emitido
    expect(wrapper.emitted()).toHaveProperty("click");
  });
});
