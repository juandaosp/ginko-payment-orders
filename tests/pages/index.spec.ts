import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { nextTick } from "vue";
import { createPinia, setActivePinia } from "pinia";
import IndexPage from "../../pages/index.vue";
import { useOrderStore } from "../../stores/orders";
import { mockOrderA } from "../mocks/order";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import FilterBar from "~/components/FilterBar.vue";
import OrderList from "~/components/OrderList.vue";

describe("Index Page", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renderiza el componente Loading cuando el store está cargando", async () => {
    const store = useOrderStore();
    store.loading = true;

    const wrapper = mount(IndexPage);
    expect(wrapper.findComponent({ name: "LoadingState" }).exists()).toBe(true);
  });

  it("renderiza FilterBar y OrderList cuando hay datos", async () => {
    const store = useOrderStore();
    store.loading = false;
    store.orders = [mockOrderA];

    const wrapper = mount(IndexPage);
    expect(wrapper.findComponent({ name: "FilterBar" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "OrderList" }).exists()).toBe(true);
  });

  it("ejecuta las funciones de manejo de eventos", async () => {
    const wrapper = mount(IndexPage);

    const filterBar = wrapper.findComponent({ name: "FilterBar" });
    await filterBar.vm.$emit("filter-change", {
      status: "Pagada",
      search: "Provee",
    });
  });

  it("ejecuta loadOrders al montar la página", async () => {
    const store = useOrderStore();
    // Espía la función
    const spy = vi.spyOn(store, "loadOrders");

    mount(IndexPage);

    // Espera un tick para asegurar que el onMounted se procesó
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(spy).toHaveBeenCalled();
  });

  it("renderiza FilterBar y OrderList", async () => {
    const wrapper = await mountSuspended(IndexPage);
    const store = useOrderStore();

    store.loading = false;
    store.orders = [mockOrderA];

    await nextTick();

    expect(wrapper.findComponent(FilterBar).exists()).toBe(true);
    expect(wrapper.findComponent(OrderList).exists()).toBe(true);
  });
});
