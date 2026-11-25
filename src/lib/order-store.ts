
import type { Order } from '../domain/types';

type OrderStore = Map<string, Order>;

declare global {
  var elegiftOrderStore: OrderStore | undefined;
}

export const orderStore: OrderStore =
  globalThis.elegiftOrderStore ??
  (globalThis.elegiftOrderStore = new Map());
