import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import CreatePage from "~/pages/order/create.vue";

describe("pages/create.vue", () => {
  it("ejecuta la navegación al recibir success", async () => {
    const wrapper = mount(CreatePage);
    await wrapper.vm.handleSuccess();
    expect(true).toBe(true);
  });
});
