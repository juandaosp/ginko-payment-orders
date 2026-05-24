import { http, HttpResponse } from "msw";
import type { PaymentOrder } from "~/types";

const STORAGE_KEY = "ginko_orders";

const initializeDb = (): PaymentOrder[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);

  const initialData: PaymentOrder[] = [
    {
      id: "1",
      providerName: "Ginko",
      amount: 50000,
      concept: "Pago inicial",
      status: "APROBADA",
      createdAt: "1998-10-15",
    },
    {
      id: "2",
      providerName: "Test Provider 1",
      amount: 10000,
      concept: "Pago 1",
      status: "RECHAZADA",
      createdAt: "2018-12-12",
    },
    {
      id: "3",
      providerName: "Test Provider 2",
      amount: 5690000,
      concept: "Pago 2",
      status: "BORRADOR",
      createdAt: "2019-08-20",
    },
    {
      id: "4",
      providerName: "Test Provider 3",
      amount: 5690000,
      concept: "Pago 3",
      status: "PAGADA",
      createdAt: "2015-05-15",
    },

    {
      id: "6",
      providerName: "Test Provider 5",
      amount: 965425,
      concept: "Pago 5",
      status: "BORRADOR",
      createdAt: "2015-05-15",
    },

    {
      id: "7",
      providerName: "Test Provider 6",
      amount: 5690000,
      concept: "Pago 7",
      status: "APROBADA",
      createdAt: "2015-12-15",
    },

    {
      id: "8",
      providerName: "Test Provider 2",
      amount: 5999200,
      concept: "Pago 9",
      status: "RECHAZADA",
      createdAt: "2015-05-15",
    },

    {
      id: "9",
      providerName: "Test Provider 9",
      amount: 5690000,
      concept: "Pago 9",
      status: "PAGADA",
      createdAt: "2015-05-15",
    },

    {
      id: "10",
      providerName: "Test Provider 10",
      amount: 958710,
      concept: "Pago 10",
      status: "PAGADA",
      createdAt: "2015-05-15",
    },

    {
      id: "4",
      providerName: "Test Provider 3",
      amount: 5690000,
      concept: "Pago 3",
      status: "PAGADA",
      createdAt: "2015-05-15",
    },

    {
      id: "4",
      providerName: "Test Provider 3",
      amount: 5690000,
      concept: "Pago 3",
      status: "PAGADA",
      createdAt: "2015-05-15",
    },

    {
      id: "4",
      providerName: "Test Provider 3",
      amount: 5690000,
      concept: "Pago 3",
      status: "PAGADA",
      createdAt: "2015-05-15",
    },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

const getStoredOrders = (): PaymentOrder[] =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
const saveStoredOrders = (orders: PaymentOrder[]) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));

initializeDb();

export const handlers = [
  http.get("/api/orders", () => {
    return HttpResponse.json(getStoredOrders());
  }),

  http.post("/api/orders", async ({ request }) => {
    const body = (await request.json()) as any;
    const orders = getStoredOrders();

    const newOrder: PaymentOrder = {
      id: Date.now().toString(),
      providerName: body.providerName,
      amount: body.amount,
      concept: body.concept,
      status: "BORRADOR",
      createdAt: new Date().toISOString().split("T")[0],
    };

    orders.unshift(newOrder);
    saveStoredOrders(orders);

    return HttpResponse.json(newOrder, { status: 201 });
  }),

  http.patch("/api/orders/:id", async ({ params, request }) => {
    const { id } = params;
    const { status } = await request.json();
    const orders = getStoredOrders();

    const orderIndex = orders.findIndex((o) => o.id === id);
    if (orderIndex > -1) {
      orders[orderIndex].status = status;
      saveStoredOrders(orders);
      return HttpResponse.json(orders[orderIndex]);
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
