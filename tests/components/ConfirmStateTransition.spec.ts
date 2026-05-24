import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import ConfirmStateTransition from "~/components/ConfirmStateTransition.vue";
import { useOrderStore } from "~/stores/orders";
import { mockOrderA } from "../mocks/order";

describe("ConfirmStateTransition", () => {
  const targetStatus = "PAGADA";

  const getMountOptions = () => ({
    props: {
      order: mockOrderA,
      targetStatus: targetStatus,
    },
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          stubActions: false,
        }),
      ],
    },
  });

  it("renderiza correctamente el targetStatus", () => {
    const wrapper = mount(ConfirmStateTransition, getMountOptions());
    expect(wrapper.text()).toContain("PAGADA");
  });

  it("emite el evento 'cancel' al hacer clic en cancelar", async () => {
    const wrapper = mount(ConfirmStateTransition, getMountOptions());
    await wrapper.findAll("button")[1].trigger("click");
    expect(wrapper.emitted()).toHaveProperty("cancel");
  });

  it("llama a updateOrderStatus y emite 'confirm' al aceptar", async () => {
    const wrapper = mount(ConfirmStateTransition, getMountOptions());
    const store = useOrderStore();
    store.updateOrderStatus = vi.fn().mockResolvedValue(true);

    await wrapper.find("button").trigger("click");

    expect(store.updateOrderStatus).toHaveBeenCalledWith("1", "PAGADA");
    expect(wrapper.emitted()).toHaveProperty("confirm");
  });

  it("maneja el error si la actualización falla", async () => {
    const wrapper = mount(ConfirmStateTransition, getMountOptions());
    const store = useOrderStore();
    store.updateOrderStatus = vi.fn().mockRejectedValue(new Error("API Error"));

    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted()).not.toHaveProperty("confirm");
  });
});
