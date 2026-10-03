import type { StorageAdapter } from "@loetogo/domain";

/**
 * Phase 2 memory adapter.
 * Keeps native screens behind the same contract as web.
 * Phase 3 can swap this for AsyncStorage without changing UI code,
 * and later Google Drive can implement the same interface.
 */
export class MemoryStorageAdapter implements StorageAdapter {
  private values = new Map<string,string>();

  async get<T>(key:string,fallback:T):Promise<T> {
    const raw=this.values.get(key);
    if(!raw) return fallback;
    try { return JSON.parse(raw) as T; } catch { return fallback; }
  }

  async set<T>(key:string,value:T) {
    this.values.set(key,JSON.stringify(value));
  }

  async remove(key:string) {
    this.values.delete(key);
  }
}

export const storage = new MemoryStorageAdapter();
