import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

// Short code (for the navbar button) + Google Translate language code + display name.
const LANGUAGES = [
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'zh-CN', short: 'ZH', name: '中文 · Chinese' },
  { code: 'hi', short: 'HI', name: 'हिन्दी · Hindi' },
  { code: 'es', short: 'ES', name: 'Español · Spanish' },
  { code: 'fr', short: 'FR', name: 'Français · French' },
  { code: 'de', short: 'DE', name: 'Deutsch · German' },
  { code: 'ar', short: 'AR', name: 'العربية · Arabic' },
  { code: 'pt', short: 'PT', name: 'Português · Portuguese' },
  { code: 'ru', short: 'RU', name: 'Русский · Russian' },
  { code: 'ja', short: 'JA', name: '日本語 · Japanese' },
  { code: 'ko', short: 'KO', name: '한국어 · Korean' },
  { code: 'bn', short: 'BN', name: 'বাংলা · Bengali' },
  { code: 'it', short: 'IT', name: 'Italiano · Italian' },
  { code: 'id', short: 'ID', name: 'Indonesia · Indonesian' },
  { code: 'tr', short: 'TR', name: 'Türkçe · Turkish' },
  { code: 'vi', short: 'VI', name: 'Tiếng Việt · Vietnamese' },
  { code: 'th', short: 'TH', name: 'ไทย · Thai' },
  { code: 'nl', short: 'NL', name: 'Nederlands · Dutch' },
  { code: 'pl', short: 'PL', name: 'Polski · Polish' },
  { code: 'uk', short: 'UK', name: 'Українська · Ukrainian' },
  { code: 'ta', short: 'TA', name: 'தமிழ் · Tamil' },
  { code: 'te', short: 'TE', name: 'తెలుగు · Telugu' },
  { code: 'ur', short: 'UR', name: 'اردو · Urdu' },
  { code: 'fa', short: 'FA', name: 'فارسی · Persian' },
  { code: 'ms', short: 'MS', name: 'Melayu · Malay' },
  { code: 'fil', short: 'FL', name: 'Filipino' },
];

const STORAGE_KEY = 'advancx_lang';

// Google Translate reads the `googtrans` cookie on load and applies the
// target language. Setting it (on every relevant scope) + reloading is the
// most reliable way to switch and persist the language.
const setGoogTransCookie = (code) => {
  const host = window.location.hostname;
  const scopes = ['', `;domain=${host}`, `;domain=.${host}`];
  // Clear any existing value first.
  scopes.forEach((s) => {
    document.cookie = `googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/${s}`;
  });
  if (code && code !== 'en') {
    const value = `/en/${code}`;
    const expires = new Date(Date.now() + 30 * 864e5).toUTCString();
    scopes.forEach((s) => {
      document.cookie = `googtrans=${value};expires=${expires};path=/${s}`;
    });
  }
};

const getSavedLang = () => {
  // Prefer the cookie (what Google is actually showing), fall back to storage.
  const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
  if (match && match[1]) return decodeURIComponent(match[1]);
  return localStorage.getItem(STORAGE_KEY) || 'en';
};

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('en');
  const ref = useRef(null);

  useEffect(() => {
    setCurrent(getSavedLang());
  }, []);

  // Close the dropdown on outside click / Escape.
  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const select = (code) => {
    setOpen(false);
    if (code === current) return;
    localStorage.setItem(STORAGE_KEY, code);
    setGoogTransCookie(code);
    // Reload so Google Translate re-reads the cookie and applies it cleanly.
    window.location.reload();
  };

  const cur = LANGUAGES.find((l) => l.code === current) || LANGUAGES[0];

  return (
    <div className="lang-switcher notranslate" translate="no" ref={ref}>
      <button
        type="button"
        className="lang-btn"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <Globe size={15} />
        <span className="lang-btn-code">{cur.short}</span>
        <ChevronDown size={13} className={`lang-caret ${open ? 'open' : ''}`} />
      </button>

      {open && (
        <ul className="lang-menu" role="listbox">
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                className={`lang-item ${l.code === current ? 'active' : ''}`}
                onClick={() => select(l.code)}
                role="option"
                aria-selected={l.code === current}
              >
                <span className="lang-item-code">{l.short}</span>
                <span className="lang-item-name">{l.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
