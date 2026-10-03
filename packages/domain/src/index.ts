export type UserRole = "client" | "driver" | "restaurant" | "admin";

export type LoetoUser = {
  id: string;
  role: UserRole;
  name: string;
  phone?: string;
  email?: string;
};

export type OrderStatus =
  | "draft"
  | "placed"
  | "accepted"
  | "preparing"
  | "ready"
  | "assigned"
  | "picked_up"
  | "arriving"
  | "delivered"
  | "cancelled";

export type Address = {
  id?: string;
  label: string;
  area: string;
  plot?: string;
  landmark?: string;
  note?: string;
};

export type Money = { amount: number; currency: "BWP" };

export type Restaurant = {
  id: string;
  name: string;
  cuisines: string[];
  area: string;
  etaMinutes: number;
  deliveryFee: Money;
  rating: number;
  open: boolean;
};

export type MenuModifier = {
  id: string;
  name: string;
  options: { id: string; label: string; priceDelta: Money }[];
  required?: boolean;
  maxSelections?: number;
};

export type MenuItem = {
  id: string;
  restaurantId: string;
  name: string;
  description?: string;
  category: string;
  price: Money;
  available: boolean;
  modifiers?: MenuModifier[];
};

export type CartLine = {
  id: string;
  itemId: string;
  name: string;
  quantity: number;
  unitPrice: Money;
};

export type DeliveryOffer = {
  id: string;
  restaurant: string;
  pickupArea: string;
  dropoffArea: string;
  estimatedKm: number;
  estimatedMinutes: number;
  earnings: Money;
};

export type RestaurantOrder = {
  id: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  total: Money;
  status: OrderStatus;
  promisedMinutes: number;
};

export interface StorageAdapter {
  get<T>(key: string, fallback: T): Promise<T>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
}

export const futureIntegrations = {
  auth: "google-oauth",
  storage: "google-drive",
  maps: "maplibre",
  runtime: "cloudflare"
} as const;
