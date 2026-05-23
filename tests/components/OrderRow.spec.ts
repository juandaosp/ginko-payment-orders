import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import OrderRow from "../../components/OrderRow.vue";
import { mockOrderA } from "../mocks/order";

describe("OrderRow", () => {
  it('emite un evento "click" al ser presionado', async () => {
    const wrapper = mount(OrderRow, {
      props: {
        order: mockOrderA,
      },
    });

    await wrapper.trigger("click");

    // Verificamos que el evento haya sido emitido
    expect(wrapper.emitted()).toHaveProperty("click");
  });
});
