# Loeto Go

Botswana-first last-mile marketplace for customers, drivers, restaurants and platform operations.

## Apps

- `apps/web` — responsive React web experience for all four roles
- `apps/mobile` — Expo/React Native mobile experience
- `packages/domain` — shared domain contracts and persistence interfaces

## Phase 1 status

Implemented foundation:

- Client, driver, restaurant and admin role shells
- Responsive desktop + mobile web layout
- Instagram-style fixed bottom navigation on mobile
- Local-first storage adapter on web
- Dynamic array/chip form primitive to reduce typing
- Google OAuth + Drive storage boundary documented for later connection
- Cloudflare Pages/Workers preview configuration

## Run locally

```bash
npm install
npm run dev:web
```

For Expo:

```bash
npm run dev:mobile
```

## Architecture principle

Today:

```text
UI -> StorageAdapter -> local state/browser storage
```

Later:

```text
UI -> StorageAdapter -> Google Drive
Identity -> Google OAuth
Realtime dispatch/payments -> minimal Cloudflare coordination layer
```

See [docs/architecture.md](docs/architecture.md).
