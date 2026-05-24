import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";
import IndexPage from "~/pages/index.vue";

const { viNavigateTo } = vi.hoisted(() => {
  return { viNavigateTo: vi.fn() };
});

mockNuxtImport("navigateTo", () => viNavigateTo);

describe("Root IndexPage (Landing)", () => {
  // Simplificamos el stub para que emule una etiqueta real con la propiedad personalizada data-to
  const mountOptions = {
    global: {
      stubs: {
        NuxtLink: {
          template: '<div class="nuxt-link-stub" :data-to="to"><slot /></div>',
          props: ["to"],
        },
      },
    },
  };

  beforeEach(() => {
    viNavigateTo.mockClear();
  });

  it("renderiza correctamente el título de bienvenida", () => {
    const wrapper = mount(IndexPage, mountOptions);
    expect(wrapper.text()).toContain("Bienvenido a Ginko");
  });

  it("verifica que las rutas de los NuxtLinks sean correctas", () => {
    const wrapper = mount(IndexPage, mountOptions);

    // Buscamos los elementos por la clase que definimos en el stub
    const links = wrapper.findAll(".nuxt-link-stub");

    expect(links).toHaveLength(2);
    expect(links[0].attributes("data-to")).toBe("/orders");
    expect(links[1].attributes("data-to")).toBe("/orders/create");
  });

  it("el botón de búsqueda está deshabilitado si el input está vacío", () => {
    const wrapper = mount(IndexPage, mountOptions);
    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeDefined();
  });

  it("habilita el botón al escribir un ID y llama a navigateTo al hacer clic", async () => {
    const wrapper = mount(IndexPage, mountOptions);
    const input = wrapper.find("input");
    const button = wrapper.find("button");

    await input.setValue("ORD-123");
    expect(button.attributes("disabled")).toBeUndefined();

    await button.trigger("click");
    expect(viNavigateTo).toHaveBeenCalledWith("/orders/ORD-123");
  });
});
