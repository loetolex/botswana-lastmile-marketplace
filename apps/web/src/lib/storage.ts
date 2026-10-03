import type { StorageAdapter } from "@loetogo/domain";

export class LocalStorageAdapter implements StorageAdapter {
  async get<T>(key: string, fallback: T): Promise<T> {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    try { return JSON.parse(raw) as T; } catch { return fallback; }
  }
  async set<T>(key: string, value: T) { localStorage.setItem(key, JSON.stringify(value)); }
  async remove(key: string) { localStorage.removeItem(key); }
}

/**
 * Future: replace this implementation with a GoogleDriveStorageAdapter.
 * UI code should depend only on StorageAdapter.
 */
export const storage = new LocalStorageAdapter();
