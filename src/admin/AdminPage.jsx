import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle, ArrowLeft, Check, Download, Eye, LogOut, RotateCcw, Save, Upload,
} from 'lucide-react';
import { useContentStore } from '../content/ContentContext';
import { AUTH_KEY } from '../content/storage';
import {
  SiteEditor, ThemeEditor, NavEditor, HeroEditor, PartnersEditor, StatsEditor,
  FeaturesEditor, IndustriesEditor, DemoEditor, TechEditor, ProcessEditor,
  ContactEditor, FooterEditor, MembersEditor, CareersEditor, GalleryEditor,
  StatusEditor, SecurityEditor, DocsEditor, BlogEditor, LegalEditor,
} from './editors';

// NOTE: this is a convenience gate, not real security. The site is a static
// bundle with no server, so anyone can read this passcode in the JS or edit
// localStorage directly. It keeps casual visitors out of the editor; it does
// not protect anything. Real auth needs a backend.
const PASSCODE = 'advancx-admin';

const GROUPS = [
  {
    label: 'Global',
    items: [
      { key: 'site', name: 'Site & SEO', Editor: SiteEditor },
      { key: 'theme', name: 'Theme', Editor: ThemeEditor },
      { key: 'nav', name: 'Navigation', Editor: NavEditor },
      { key: 'footer', name: 'Footer', Editor: FooterEditor },
    ],
  },
  {
    label: 'Home page',
    items: [
      { key: 'hero', name: 'Hero', Editor: HeroEditor },
      { key: 'partners', name: 'Partners', Editor: PartnersEditor },
      { key: 'stats', name: 'Stats', Editor: StatsEditor },
      { key: 'features', name: 'Services & About', Editor: FeaturesEditor },
      { key: 'industries', name: 'Industries', Editor: IndustriesEditor },
      { key: 'demo', name: 'Live Demos', Editor: DemoEditor },
      { key: 'tech', name: 'Tech Stack', Editor: TechEditor },
      { key: 'process', name: 'Process', Editor: ProcessEditor },
      { key: 'contact', name: 'Contact', Editor: ContactEditor },
    ],
  },
  {
    label: 'Pages',
    items: [
      { key: 'members', name: 'Members', Editor: MembersEditor },
      { key: 'careers', name: 'Careers', Editor: CareersEditor },
      { key: 'gallery', name: 'Gallery', Editor: GalleryEditor },
      { key: 'systemStatus', name: 'System Status', Editor: StatusEditor },
      { key: 'security', name: 'Security', Editor: SecurityEditor },
    ],
  },
  {
    label: 'Content',
    items: [
      { key: 'docsPage', name: 'Documentation', Editor: DocsEditor },
      { key: 'blogPage', name: 'Tech Blog', Editor: BlogEditor },
      { key: 'legal', name: 'Legal pages', Editor: LegalEditor },
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.items);

const Login = ({ onUnlock }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (code === PASSCODE) {
      sessionStorage.setItem(AUTH_KEY, '1');
      onUnlock();
    } else {
      setError('Incorrect passcode.');
    }
  };

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={submit}>
        <h1>Advancx Admin</h1>
        <p>Enter the passcode to edit site content.</p>
        <input
          className="af-input"
          type="password"
          value={code}
          autoFocus
          placeholder="Passcode"
          onChange={(e) => { setCode(e.target.value); setError(''); }}
        />
        {error && <span className="admin-login-error">{error}</span>}
        <button className="admin-btn admin-btn-primary" type="submit">Unlock</button>
        <Link to="/" className="admin-login-back"><ArrowLeft size={14} /> Back to site</Link>
      </form>
    </div>
  );
};

const AdminPage = () => {
  const store = useContentStore();
  const { content, dirty, updateSection, save, resetAll, resetSection, importContent } = store;

  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1');
  const [active, setActive] = useState('hero');
  const [toast, setToast] = useState('');
  const fileRef = useRef(null);

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  };

  // Warn before losing unsaved edits on refresh or tab close.
  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  // Cmd/Ctrl+S saves, like any editor.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (save()) flash('Saved');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [save]);

  if (!authed) return <Login onUnlock={() => setAuthed(true)} />;

  const current = ALL.find((s) => s.key === active) || ALL[0];
  const Editor = current.Editor;

  const setField = (field, value) =>
    updateSection(current.key, (section) => ({ ...section, [field]: value }));

  const handleSave = () => flash(save() ? 'Saved to this browser' : 'Could not save — storage blocked');

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.json';
    a.click();
    URL.revokeObjectURL(url);
    flash('content.json downloaded');
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importContent(JSON.parse(reader.result));
        flash('Content imported');
      } catch {
        flash('That file is not valid JSON');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="admin-root">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-dot" />
          <div>
            <strong>Advancx Admin</strong>
            <span>Content editor</span>
          </div>
        </div>

        <nav className="admin-nav">
          {GROUPS.map((group) => (
            <div className="admin-nav-group" key={group.label}>
              <span className="admin-nav-label">{group.label}</span>
              {group.items.map((s) => (
                <button
                  key={s.key}
                  className={`admin-nav-item ${active === s.key ? 'active' : ''}`}
                  onClick={() => setActive(s.key)}
                >
                  {s.name}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-foot">
          <Link to="/" className="admin-nav-item"><Eye size={14} /> View site</Link>
          <button
            className="admin-nav-item"
            onClick={() => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false); }}
          >
            <LogOut size={14} /> Lock
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-title">
            <h2>{current.name}</h2>
            {dirty && <span className="admin-dirty">Unsaved changes</span>}
          </div>

          <div className="admin-actions">
            <button className="admin-btn" onClick={() => fileRef.current?.click()}>
              <Upload size={15} /> Import
            </button>
            <input ref={fileRef} type="file" accept="application/json" hidden onChange={handleImport} />

            <button className="admin-btn" onClick={handleExport}>
              <Download size={15} /> Publish
            </button>

            <button
              className="admin-btn"
              onClick={() => {
                if (window.confirm(`Reset "${current.name}" back to its original content?`)) {
                  resetSection(current.key);
                  flash('Section reset');
                }
              }}
            >
              <RotateCcw size={15} /> Reset section
            </button>

            <button className="admin-btn admin-btn-primary" onClick={handleSave}>
              <Save size={15} /> Save
            </button>
          </div>
        </header>

        <div className="admin-scroll">
          <div className="admin-publish-note">
            <AlertTriangle size={16} />
            <p>
              <strong>Save</strong> stores your edits in this browser only. To publish them for real
              visitors, click <strong>Publish</strong> to download <code>content.json</code>, then
              commit it to the repo and redeploy.
            </p>
          </div>

          <Editor value={content[current.key]} set={setField} />

          <div className="admin-danger-zone">
            <div>
              <strong>Reset everything</strong>
              <p>Discards all edits across every section and restores the original site content.</p>
            </div>
            <button
              className="admin-btn admin-btn-danger"
              onClick={() => {
                if (window.confirm('Reset ALL content back to the original? This cannot be undone.')) {
                  resetAll();
                  flash('All content reset');
                }
              }}
            >
              Reset all content
            </button>
          </div>
        </div>
      </main>

      {toast && <div className="admin-toast"><Check size={15} /> {toast}</div>}
    </div>
  );
};

export default AdminPage;
