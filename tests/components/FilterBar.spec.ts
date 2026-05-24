import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import FilterBar from "../../components/FilterBar.vue";

describe("FilterBar", () => {
  it("emite evento filter-change al escribir en el buscador", async () => {
    const wrapper = mount(FilterBar);
    const input = wrapper.find('input[type="text"]');

    await input.setValue("Proveedor X");

    expect(wrapper.emitted()).toHaveProperty("filter-change");
    expect(wrapper.emitted("filter-change")![0][0]).toEqual({
      status: "Todos",
      search: "Proveedor X",
    });
  });

  it("emite evento filter-change al cambiar el select", async () => {
    const wrapper = mount(FilterBar);
    const select = wrapper.find("select");

    await select.setValue("Aprobada");

    expect(wrapper.emitted("filter-change")![0][0]).toEqual({
      status: "Aprobada",
      search: "",
    });
  });
});
