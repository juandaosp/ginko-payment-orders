import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import FilterBar from "../../components/FilterBar.vue";

describe("FilterBar", () => {
  it("emite evento filter-change al escribir en el buscador", async () => {
    const wrapper = mount(FilterBar, {
      props: { status: "Todos", search: "" },
    });

    const input = wrapper.find('input[type="text"]');
    await input.setValue("Proveedor X");

    expect(wrapper.emitted()).toHaveProperty("filter-change");
    const emittedEvents = wrapper.emitted("filter-change");

    expect(Array.isArray(emittedEvents)).toBe(true);
    expect(emittedEvents?.length).toBeGreaterThan(0);
    const eventArgs = emittedEvents?.[0];
    expect(eventArgs).toBeDefined();
    const payload = eventArgs![0];

    expect(payload).toMatchObject({
      status: "Todos",
      search: "Proveedor X",
    });
  });

  it("emite evento filter-change al cambiar el select", async () => {
    const wrapper = mount(FilterBar, {
      props: { status: "Todos", search: "" },
    });

    const select = wrapper.find("select");
    await select.setValue("Aprobada");

    const emitted = wrapper.emitted("filter-change") ?? [];
    const payload = emitted[0]?.[0];

    expect(payload).toMatchObject({
      status: "Aprobada",
      search: "",
    });
  });
});
