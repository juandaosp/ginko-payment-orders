import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import ErrorState from "../../components/ErrorState.vue";

describe("ErrorState", () => {
  it("renderiza el mensaje de error recibido por prop", () => {
    const errorMessage = "Error al cargar los datos";
    const wrapper = mount(ErrorState, {
      props: { message: errorMessage },
    });
    expect(wrapper.text()).toContain(errorMessage);
  });
});
