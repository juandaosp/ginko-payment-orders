import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import StateTransitionButtons from "~/components/StateTransitionButtons.vue";
import { mockOrderA } from "../mocks/order";

describe("StateTransitionButtons", () => {
  const getMountOptions = (order = mockOrderA) => ({
    props: { order },
  });

  it("renderiza los botones según las transiciones válidas", () => {
    const wrapper = mount(StateTransitionButtons, getMountOptions(mockOrderA));
    expect(wrapper.findAll("button").length).toBeGreaterThan(0);
    expect(wrapper.text()).toContain("Aprobar Orden");
  });

  it("muestra nada cuando no hay transiciones", () => {
    const noTransitionOrder = { ...mockOrderA, status: "PAGADA" as any };
    const wrapper = mount(StateTransitionButtons, {
      props: { order: noTransitionOrder },
    });

    const container = wrapper.find("h3");
    expect(container.exists()).toBe(false);

    expect(wrapper.find("button").exists()).toBe(false);
  });

  it("emite el evento 'transition' al hacer clic", async () => {
    const wrapper = mount(StateTransitionButtons, getMountOptions(mockOrderA));
    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("transition");
  });
});
