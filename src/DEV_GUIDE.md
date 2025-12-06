Developer notes — flexible-date-format plugin

Purpose
-------
This plugin was refactored to improve reusability and maintainability by extracting two pieces of functionality:

- `src/settingsManager.ts` — provides a typed snapshot of plugin settings so code doesn't directly access `logseq.settings` in many places.
- `src/utils.ts` — contains small, pure helpers for date formatting and DOM icon insertion used by `journalLink.ts`.

How to use
----------
- Prefer `getSettingsSnapshot()` when reading settings in code. This returns a typed object with safe defaults.
- Put pure transformation logic into `src/lib.ts` or `src/utils.ts`. Keep DOM mutations (like `element.prepend`) in small helper functions and keep high-level flow in `journalLink.ts`.

Why
---
Centralizing settings reading and common date helpers reduces duplication, makes small functions easier to unit-test, and keeps the DOM handling thin and readable.
