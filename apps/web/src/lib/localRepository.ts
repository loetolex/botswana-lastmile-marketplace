import type { CartLine, RestaurantOrder, StorageAdapter } from "@loetogo/domain";

export type CheckoutDraft = {
  id: string;
  restaurantId: string;
  addressLabel: string;
  paymentMethod: "cash" | "mobile_money" | "card";
  lines: CartLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
};

export class LocalRepository {
  constructor(private storage: StorageAdapter) {}

  async getCart(): Promise<CartLine[]> {
    return this.storage.get<CartLine[]>("loetogo.cart", []);
  }

  async saveCart(lines: CartLine[]) {
    return this.storage.set("loetogo.cart", lines);
  }

  async getOrders(): Promise<RestaurantOrder[]> {
    return this.storage.get<RestaurantOrder[]>("loetogo.orders", []);
  }

  async addOrder(order: RestaurantOrder) {
    const orders = await this.getOrders();
    await this.storage.set("loetogo.orders", [order, ...orders]);
  }

  async saveCheckoutDraft(draft: CheckoutDraft) {
    await this.storage.set("loetogo.checkout", draft);
  }

  async getCheckoutDraft(): Promise<CheckoutDraft | null> {
    return this.storage.get<CheckoutDraft | null>("loetogo.checkout", null);
  }
}
