import { mount } from "@vue/test-utils";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { nextTick } from "vue";
import IndexPage from "~/pages/orders/index.vue";
import { useOrderStore } from "~/stores/orders";
import { mockOrderA } from "../../mocks/order";
import FilterBar from "~/components/FilterBar.vue";
import OrderList from "~/components/order/List.vue";
import LoadingState from "~/components/LoadingState.vue";

describe("Index Page", () => {
  const getMountOptions = () => ({
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          stubActions: true,
        }),
      ],
      mocks: {
        useRouter: () => ({ replace: vi.fn() }),
        useRoute: () => ({ query: {} }),
      },
    },
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el componente Loading cuando el store está cargando", async () => {
    const options = getMountOptions();
    const wrapper = mount(IndexPage, options);

    const store = useOrderStore();
    store.loading = true;
    await nextTick();

    expect(wrapper.findComponent(LoadingState).exists()).toBe(true);
  });

  it("ejecuta loadOrders al montar la página", async () => {
    const options = getMountOptions();
    const wrapper = mount(IndexPage, options);

    const store = useOrderStore();
    expect(store.loadOrders).toHaveBeenCalled();
  });

  it("renderiza FilterBar y OrderList cuando hay datos", async () => {
    const options = getMountOptions();
    const wrapper = mount(IndexPage, options);

    const store = useOrderStore();
    store.loading = false;
    store.orders = [mockOrderA];
    await nextTick();

    expect(wrapper.findComponent(FilterBar).exists()).toBe(true);
    expect(wrapper.findComponent(OrderList).exists()).toBe(true);
  });

  it("ejecuta las funciones de manejo de eventos", async () => {
    const options = getMountOptions();
    const wrapper = mount(IndexPage, options);

    const filterBar = wrapper.findComponent(FilterBar);
    await filterBar.vm.$emit("filter-change", {
      status: "Pagada",
      search: "Provee",
    });
  });

  it("renderiza FilterBar y OrderList de forma suspendida con datos", async () => {
    const options = getMountOptions();
    const wrapper = await mountSuspended(IndexPage, options);

    const store = useOrderStore();
    store.loading = false;
    store.orders = [mockOrderA];
    await nextTick();

    expect(wrapper.findComponent(FilterBar).exists()).toBe(true);
    expect(wrapper.findComponent(OrderList).exists()).toBe(true);
  });
});
