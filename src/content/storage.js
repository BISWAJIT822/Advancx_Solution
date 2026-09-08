// Pluggable persistence for site content.
//
// Today the only adapter is `localAdapter` (browser localStorage + a JSON file
// you export and commit). The indirection is deliberate: swapping in a real
// backend later means writing one more adapter with the same four methods and
// changing `activeAdapter` — no changes anywhere else in the app.

export const STORAGE_KEY = 'advancx.content.v1';
export const AUTH_KEY = 'advancx.admin.session';

const isBrowser = () => typeof window !== 'undefined' && !!window.localStorage;

export const localAdapter = {
  name: 'local',

  load() {
    if (!isBrowser()) return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      // Corrupted JSON or storage blocked — fall back to defaults.
      return null;
    }
  },

  save(content) {
    if (!isBrowser()) return false;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      return true;
    } catch {
      return false;
    }
  },

  clear() {
    if (!isBrowser()) return false;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch {
      return false;
    }
  },
};

export const activeAdapter = localAdapter;

// Merge saved content over defaults so a newly added default key still shows up
// for an admin whose saved copy predates it. Arrays are replaced wholesale —
// they are ordered lists the admin owns, not partial patches.
export const mergeContent = (defaults, saved) => {
  if (saved === undefined || saved === null) return defaults;
  if (Array.isArray(defaults) || Array.isArray(saved)) return saved;
  if (typeof defaults !== 'object' || typeof saved !== 'object') return saved;

  const out = { ...defaults };
  for (const key of Object.keys(saved)) {
    out[key] = key in defaults ? mergeContent(defaults[key], saved[key]) : saved[key];
  }
  return out;
};
