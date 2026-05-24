import type { OrderStatus } from "~/types";

export const useOrderStateTransition = () => {
  const transitions: Record<OrderStatus, OrderStatus[]> = {
    BORRADOR: ["APROBADA", "RECHAZADA"],
    APROBADA: ["PAGADA"],
    RECHAZADA: [],
    PAGADA: [],
  };

  const canTransitionTo = (
    currentStatus: OrderStatus,
    nextStatus: OrderStatus,
  ) => {
    return transitions[currentStatus].includes(nextStatus);
  };

  const getValidTransitions = (currentStatus: OrderStatus) => {
    return transitions[currentStatus];
  };

  return {
    canTransitionTo,
    getValidTransitions,
  };
};
