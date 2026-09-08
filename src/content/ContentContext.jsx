import React, { createContext, useContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { defaultContent, cloneDefaults } from './defaults';
import { activeAdapter, mergeContent } from './storage';

const ContentContext = createContext(null);

// Read the persisted copy once, synchronously, so the first paint already has
// the admin's content — no flash of default copy on load.
const readInitial = () => mergeContent(defaultContent, activeAdapter.load());

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(readInitial);
  const [dirty, setDirty] = useState(false);
  // The published baseline from public/content.json, once it has loaded.
  const publishedRef = useRef(null);

  // Load the published content file, if the site has one. Precedence is
  // defaults < content.json (what visitors see) < localStorage (the admin's
  // own unpublished draft), so publishing works for everyone while an admin
  // keeps their in-progress edits.
  useEffect(() => {
    let cancelled = false;
    fetch('/content.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : null))
      .then((published) => {
        if (cancelled || !published) return;
        publishedRef.current = published;
        const base = mergeContent(defaultContent, published);
        setContent(mergeContent(base, activeAdapter.load()));
      })
      .catch(() => {
        // No content.json published yet — defaults stand.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Keep the live site in sync when content is edited in another tab — the
  // admin usually keeps the panel open beside the public page.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === null || e.key === 'advancx.content.v1') setContent(readInitial());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Apply the admin-chosen accent colour as a CSS variable override.
  useEffect(() => {
    const color = content?.theme?.primaryColor;
    if (color) document.documentElement.style.setProperty('--primary-color', color);
  }, [content?.theme?.primaryColor]);

  // Keep <title> and the meta description in step with the SEO fields.
  useEffect(() => {
    const site = content?.site;
    if (!site) return;
    if (site.seoTitle) document.title = site.seoTitle;
    const setMeta = (selector, value) => {
      const el = document.querySelector(selector);
      if (el && value) el.setAttribute('content', value);
    };
    setMeta('meta[name="description"]', site.seoDescription);
    setMeta('meta[name="keywords"]', site.seoKeywords);
    setMeta('meta[name="author"]', site.seoAuthor);
  }, [content?.site]);

  // Replace one top-level section (hero, footer, members, …).
  const updateSection = useCallback((sectionKey, updater) => {
    setContent((prev) => {
      const next = { ...prev };
      next[sectionKey] =
        typeof updater === 'function' ? updater(prev[sectionKey]) : updater;
      return next;
    });
    setDirty(true);
  }, []);

  // Set a single field inside a section, e.g. setField('hero', 'badge', '…').
  const setField = useCallback(
    (sectionKey, field, value) => {
      updateSection(sectionKey, (section) => ({ ...section, [field]: value }));
    },
    [updateSection]
  );

  const save = useCallback(() => {
    const ok = activeAdapter.save(content);
    if (ok) setDirty(false);
    return ok;
  }, [content]);

  // Reset falls back to the published baseline when there is one, so an admin
  // who resets does not silently revert the live site to the original code copy.
  const baseline = useCallback(
    () => mergeContent(cloneDefaults(), publishedRef.current),
    []
  );

  const resetAll = useCallback(() => {
    activeAdapter.clear();
    setContent(baseline());
    setDirty(false);
  }, [baseline]);

  const resetSection = useCallback(
    (sectionKey) => {
      setContent((prev) => ({ ...prev, [sectionKey]: baseline()[sectionKey] }));
      setDirty(true);
    },
    [baseline]
  );

  const importContent = useCallback((parsed) => {
    const merged = mergeContent(defaultContent, parsed);
    setContent(merged);
    activeAdapter.save(merged);
    setDirty(false);
    return merged;
  }, []);

  const value = useMemo(
    () => ({
      content,
      dirty,
      updateSection,
      setField,
      save,
      resetAll,
      resetSection,
      importContent,
    }),
    [content, dirty, updateSection, setField, save, resetAll, resetSection, importContent]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContentStore = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContentStore must be used inside <ContentProvider>');
  return ctx;
};

// Convenience read-only hook for display components.
// useContent()          → the whole content tree
// useContent('hero')    → just that section
export const useContent = (sectionKey) => {
  const { content } = useContentStore();
  return sectionKey ? content[sectionKey] : content;
};
