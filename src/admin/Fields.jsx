import React from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { iconNames } from '../content/icons';

export const Text = ({ label, value, onChange, placeholder, hint }) => (
  <label className="af">
    <span className="af-label">{label}</span>
    <input
      className="af-input"
      type="text"
      value={value ?? ''}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
    {hint && <span className="af-hint">{hint}</span>}
  </label>
);

export const Area = ({ label, value, onChange, rows = 4, hint }) => (
  <label className="af">
    <span className="af-label">{label}</span>
    <textarea
      className="af-input af-textarea"
      rows={rows}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
    />
    {hint && <span className="af-hint">{hint}</span>}
  </label>
);

export const Color = ({ label, value, onChange }) => (
  <label className="af">
    <span className="af-label">{label}</span>
    <div className="af-color-row">
      <input
        className="af-color"
        type="color"
        value={value || '#ff5f1f'}
        onChange={(e) => onChange(e.target.value)}
      />
      <input
        className="af-input"
        type="text"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </label>
);

export const IconPicker = ({ label = 'Icon', value, onChange }) => (
  <label className="af">
    <span className="af-label">{label}</span>
    <select className="af-input" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
      {!iconNames.includes(value) && value ? <option value={value}>{value} (unknown)</option> : null}
      {iconNames.map((n) => (
        <option key={n} value={n}>{n}</option>
      ))}
    </select>
  </label>
);

// A reorderable, add/remove list of objects. `fields` renders one row's editors.
export const Repeater = ({ label, items = [], onChange, blank, fields, titleOf }) => {
  const update = (i, next) => onChange(items.map((it, idx) => (idx === i ? next : it)));
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const copy = [...items];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  };

  return (
    <div className="af-repeater">
      <div className="af-repeater-head">
        <span className="af-label">{label}</span>
        <button type="button" className="admin-btn admin-btn-sm" onClick={() => onChange([...items, structuredClone(blank)])}>
          <Plus size={14} /> Add
        </button>
      </div>

      {items.length === 0 && <p className="af-empty">Nothing here yet — use Add to create the first one.</p>}

      {items.map((item, i) => (
        <div className="af-row" key={i}>
          <div className="af-row-head">
            <span className="af-row-title">{titleOf ? titleOf(item, i) : `Item ${i + 1}`}</span>
            <div className="af-row-actions">
              <button type="button" className="af-icon-btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
                <ChevronUp size={15} />
              </button>
              <button type="button" className="af-icon-btn" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down">
                <ChevronDown size={15} />
              </button>
              <button type="button" className="af-icon-btn af-danger" onClick={() => remove(i)} aria-label="Delete">
                <Trash2 size={15} />
              </button>
            </div>
          </div>
          <div className="af-row-body">{fields(item, (next) => update(i, next))}</div>
        </div>
      ))}
    </div>
  );
};

// Same as Repeater but for a plain array of strings.
export const StringList = ({ label, items = [], onChange, placeholder }) => {
  const update = (i, v) => onChange(items.map((s, idx) => (idx === i ? v : s)));
  return (
    <div className="af-repeater">
      <div className="af-repeater-head">
        <span className="af-label">{label}</span>
        <button type="button" className="admin-btn admin-btn-sm" onClick={() => onChange([...items, ''])}>
          <Plus size={14} /> Add
        </button>
      </div>
      {items.map((s, i) => (
        <div className="af-inline-row" key={i}>
          <input
            className="af-input"
            type="text"
            value={s}
            placeholder={placeholder}
            onChange={(e) => update(i, e.target.value)}
          />
          <button
            type="button"
            className="af-icon-btn af-danger"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            aria-label="Delete"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
    </div>
  );
};

export const Section = ({ title, desc, children }) => (
  <div className="admin-block">
    <div className="admin-block-head">
      <h3>{title}</h3>
      {desc && <p>{desc}</p>}
    </div>
    <div className="admin-block-body">{children}</div>
  </div>
);
