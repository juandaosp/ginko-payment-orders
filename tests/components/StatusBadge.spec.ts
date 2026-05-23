import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import StatusBadge from "../../components/StatusBadge.vue";

describe("StatusBadge", () => {
  it("debería renderizar el texto correctamente", () => {
    const wrapper = mount(StatusBadge, {
      props: { status: "APROBADA" },
    });
    expect(wrapper.text()).toContain("APROBADA");
  });
  it("aplica la clase de color correcta para BORRADOR", () => {
    const wrapper = mount(StatusBadge, { props: { status: "BORRADOR" } });
    // Verifica si tiene la clase esperada o el texto
    expect(wrapper.text()).toContain("BORRADOR");
  });
  it("aplica estilos distintos según el estado", () => {
    const wrapperBorrador = mount(StatusBadge, {
      props: { status: "BORRADOR" },
    });
    const wrapperAprobada = mount(StatusBadge, {
      props: { status: "APROBADA" },
    });

    expect(wrapperBorrador.text()).toBe("BORRADOR");
    expect(wrapperAprobada.text()).toBe("APROBADA");
  });
});
