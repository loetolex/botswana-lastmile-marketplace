# Loeto Go architecture

Loeto Go is a Botswana-first last-mile marketplace with four experiences:

- Client
- Driver
- Restaurant
- Admin / operations

## Phase 1 foundation

- Responsive React/Vite web shell
- Expo React Native shell
- Shared TypeScript domain contracts
- Role-aware navigation
- Instagram-style fixed bottom navigation on mobile widths
- Local-first persistence boundary
- Dynamic array-based form primitive
- Cloudflare preview configuration

## Persistence boundary

UI and domain code must not call Google Drive or future platform services directly.

```text
UI
  -> StorageAdapter
       -> LocalStorageAdapter          (Phase 1)
       -> NativeLocalStorageAdapter    (next)
       -> GoogleDriveStorageAdapter    (future)
```

Google OAuth will become the identity boundary and Google Drive the user-owned durable storage path.

Live delivery coordination, payment callbacks, dispatch and driver presence are deliberately outside the storage adapter. Those will later use a minimal Cloudflare coordination layer.

## UX rules

1. Mobile navigation remains reachable with one thumb.
2. Responsive web becomes a browser-ready equivalent of each role app.
3. Forms prefer selectable arrays, chips, defaults and reusable lists over repeated typing.
4. Shared domain contracts come before role-specific duplication.
5. Current local persistence is replaceable rather than embedded in page components.
