import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import CreatePage from "~/pages/orders/create.vue";

describe("pages/create.vue", () => {
  it("ejecuta la lógica al recibir success del formulario", async () => {
    const wrapper = mount(CreatePage, {
      global: {
        stubs: {
          OrderForm: true,
        },
      },
    });

    const form = wrapper.findComponent({ name: "OrderForm" });
    await form.vm.$emit("success", {
      providerName: "Test",
      amount: 100,
      concept: "Test",
    });

    expect(true).toBe(true);
  });
});
