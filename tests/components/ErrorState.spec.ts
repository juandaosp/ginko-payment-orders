import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ErrorState from "../../components/ErrorState.vue";

describe("ErrorState", () => {
  it("renderiza el mensaje de error recibido por prop", () => {
    const wrapper = mount(ErrorState, {
      props: { message: "Error al cargar los datos" },
    });
    expect(wrapper.text()).toContain("Error al cargar los datos");
  });
});
