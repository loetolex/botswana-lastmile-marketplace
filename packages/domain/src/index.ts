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
  label: string;
  area: string;
  plot?: string;
  landmark?: string;
  note?: string;
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
