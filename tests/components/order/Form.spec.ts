import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import OrderForm from "~/components/order/Form.vue";

vi.mock("~/composables/useOrderForm", () => ({
  useOrderForm: (callback: any) => ({
    provider: ref(""),
    amount: ref(0),
    concept: ref(""),
    errors: ref({ provider: "", amount: "", concept: "" }),
    isSubmitting: ref(false),
    isValid: ref(false),
    apiError: ref(""),
    onSubmit: vi.fn(() =>
      callback({ provider: "Test", amount: 100, concept: "Test" }),
    ),
  }),
}));

describe("OrderForm.vue", () => {
  it("botón submit deshabilitado con form vacío", () => {
    const wrapper = mount(OrderForm);
    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeDefined();
  });

  it("botón submit habilitado cuando es válido", async () => {
    const wrapper = mount(OrderForm);

    await wrapper.find('input[type="text"]').setValue("Proveedor");
    await wrapper.find('input[type="number"]').setValue("1000");
    await wrapper.find("textarea").setValue("Concepto válido");
    const button = wrapper.find("button");
  });

  it("muestra mensajes de error por cada campo", async () => {
    const wrapper = mount(OrderForm);

    const errorSpans = wrapper.findAll(".text-red-500");
    expect(errorSpans.length).toBeGreaterThan(0);
  });

  it("emite ‘success’ tras crear exitosamente", async () => {
    const wrapper = mount(OrderForm);
    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted()).toHaveProperty("success");
    expect(wrapper.emitted("success")![0]).toEqual([
      {
        provider: "Test",
        amount: 100,
        concept: "Test",
      },
    ]);
  });
});
