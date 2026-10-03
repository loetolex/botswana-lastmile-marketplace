# Phase 2 — Role workflows

## Client
- delivery area and landmark capture foundation
- dynamic quick filters
- restaurant discovery
- menu browsing
- local cart state
- mobile cart CTA

## Driver
- online/offline state
- transparent delivery offers
- distance, ETA and earnings before acceptance
- active delivery state
- vehicle type arrays
- daily earnings summary

## Restaurant
- live kitchen queue
- order state controls
- dynamic cuisines
- dynamic menu categories

## Admin
- marketplace KPI cards
- live order operations table
- dynamic moderation filters

## Shared implementation rules
- all monetary values use BWP domain objects
- role models live in packages/domain
- local persistence stays behind StorageAdapter
- Google OAuth + Drive will replace local persistence through adapters
- mobile remains bottom-nav-first
- browser mobile shares the same role structure
- shadcn-style primitives live under apps/web/src/components/ui
- no remote backend is required in this phase

## Verification
GitHub Actions installs dependencies, runs workspace typechecks and builds the web app.
A successful CI run is required before this phase is called runtime-verified.
