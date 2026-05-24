import { mount } from "@vue/test-utils";
import { expect, describe, it } from "vitest";
import { mockOrderA } from "../../mocks/order";
import Row from "~/components/order/Row.vue";

describe("OrderRow", () => {
  it('emite un evento "order-click" al ser presionado', async () => {
    const wrapper = mount(Row, {
      props: {
        order: mockOrderA,
      },
    });

    await wrapper.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("order-click");
  });
});
