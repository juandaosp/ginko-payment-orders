import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import LoadingState from "../../components/LoadingState.vue";

describe("LoadingState", () => {
  it("se renderiza correctamente", () => {
    const wrapper = mount(LoadingState);
    expect(wrapper.exists()).toBe(true);
  });
});
