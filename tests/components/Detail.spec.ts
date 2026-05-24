import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Detail from "~/components/order/Detail.vue";
import { mockOrderA } from "../mocks/order";
import StatusBadge from "~/components/StatusBadge.vue";

describe("Detail Component", () => {
  it("renderiza correctamente los datos de la orden", () => {
    const wrapper = mount(Detail, {
      props: {
        order: mockOrderA,
      },
      global: {
        components: {
          StatusBadge,
        },
      },
    });

    expect(wrapper.text()).toContain(`#${mockOrderA.id}`);
    expect(wrapper.text()).toContain(mockOrderA.providerName);
    expect(wrapper.text()).toContain(mockOrderA.concept);
    expect(wrapper.text()).toMatch(/\$\s?1\.000\.000/);
    expect(wrapper.text()).toContain("octubre");
  });

  it("renderiza el componente StatusBadge con el estado correcto", () => {
    const wrapper = mount(Detail, {
      props: {
        order: mockOrderA,
      },
      global: {
        components: {
          StatusBadge,
        },
      },
    });

    const badge = wrapper.findComponent(StatusBadge);
    expect(badge.exists()).toBe(true);
    expect(badge.props("status")).toBe(mockOrderA.status);
  });
});
