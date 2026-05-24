import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import StateTransitionButtons from "~/components/StateTransitionButtons.vue";
import { mockOrderA } from "../mocks/order";
import ConfirmStateTransition from "~/components/ConfirmStateTransition.vue";

describe("StateTransitionButtons", () => {
  const getMountOptions = (order = mockOrderA) => ({
    props: { order },
  });

  it("renderiza los botones según las transiciones válidas", () => {
    const wrapper = mount(StateTransitionButtons, getMountOptions(mockOrderA));
    expect(wrapper.findAll("button").length).toBeGreaterThan(0);
    expect(wrapper.text()).toContain("Aprobar Orden");
  });

  it("muestra mensaje de 'no hay acciones' cuando no hay transiciones", () => {
    const noTransitionOrder = { ...mockOrderA, status: "PAGADA" as any };
    const wrapper = mount(StateTransitionButtons, {
      props: { order: noTransitionOrder },
    });

    expect(wrapper.text()).toContain("No hay acciones disponibles");
    expect(wrapper.findComponent(ConfirmStateTransition).exists()).toBe(false);
  });

  it("abre ConfirmStateTransition al hacer clic en un botón", async () => {
    const wrapper = mount(StateTransitionButtons, getMountOptions(mockOrderA));
    await wrapper.find("button").trigger("click");
    const modal = wrapper.findComponent(ConfirmStateTransition);
    expect(modal.exists()).toBe(true);
    expect(modal.props("targetStatus")).toBeDefined();
  });

  it("cierra el modal al emitir 'cancel' desde ConfirmStateTransition", async () => {
    const wrapper = mount(StateTransitionButtons, getMountOptions(mockOrderA));
    await wrapper.find("button").trigger("click");
    await wrapper.findComponent(ConfirmStateTransition).vm.$emit("cancel");
    expect(wrapper.findComponent(ConfirmStateTransition).exists()).toBe(false);
  });
});
