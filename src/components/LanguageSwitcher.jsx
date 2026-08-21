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

// Drive the hidden Google Translate <select> to translate the page in place.
const applyLanguage = (code) => {
  const trigger = () => {
    const combo = document.querySelector('.goog-te-combo');
    if (!combo) return false;
    combo.value = code === 'en' ? '' : code;
    combo.dispatchEvent(new Event('change'));
    return true;
  };
  if (trigger()) return;
  // The widget may not have injected the <select> yet — retry briefly.
  let tries = 0;
  const id = setInterval(() => {
    tries += 1;
    if (trigger() || tries > 50) clearInterval(id);
  }, 200);
};

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('en');
  const ref = useRef(null);

  // Re-apply the saved language on load (once Google Translate is ready).
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) || 'en';
    setCurrent(saved);
    if (saved !== 'en') applyLanguage(saved);
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
    setCurrent(code);
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, code);
    if (code === 'en') {
      // Cleanest way back to the untranslated page.
      window.location.reload();
      return;
    }
    applyLanguage(code);
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
