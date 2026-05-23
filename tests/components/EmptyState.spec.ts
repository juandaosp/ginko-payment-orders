import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import EmptyState from "../../components/EmptyState.vue";

describe("EmptyState", () => {
  it("renderiza el mensaje de estado vacío", () => {
    const wrapper = mount(EmptyState);
    expect(wrapper.text()).toContain("No hay órdenes");
  });
});
