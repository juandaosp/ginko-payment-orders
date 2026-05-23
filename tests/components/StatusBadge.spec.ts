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
});
