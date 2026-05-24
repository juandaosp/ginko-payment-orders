import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import OrderForm from "~/components/OrderForm.vue";

describe("OrderForm.vue", () => {
  it("deshabilita el botón al intentar enviar sin datos", async () => {
    const wrapper = mount(OrderForm);
    await wrapper.find("form").trigger("submit");

    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeDefined();
  });

  it("emite evento success al completar campos válidos", async () => {
    const wrapper = mount(OrderForm);

    await wrapper.find('input[type="text"]').setValue("Proveedor Test");
    await wrapper.find('input[type="number"]').setValue("50000");
    await wrapper.find("textarea").setValue("Concepto válido");

    await wrapper.find("form").trigger("submit");

    // Esperar al procesamiento de la promesa en el submit
    await new Promise((resolve) => setTimeout(resolve, 1100));

    expect(wrapper.emitted()).toHaveProperty("success");
  });
});
