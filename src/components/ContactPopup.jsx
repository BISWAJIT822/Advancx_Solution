import React, { useState, useEffect } from 'react';
import { Mail, Phone, X, ArrowUpRight } from 'lucide-react';

const LinkedInIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
  </svg>
);

const options = [
  {
    icon: Mail,
    label: 'Email',
    value: 'advancxsolution@gmail.com',
    href: 'mailto:advancxsolution@gmail.com',
  },
  {
    icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'Connect with us',
    href: 'https://www.linkedin.com/company/advancx-solution',
  },
  {
    icon: Phone,
    label: 'Call',
    value: '+91 93483 86856',
    href: 'tel:+919348386856',
  },
];

const ContactPopup = ({ triggerLabel = 'Talk to our team' }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button type="button" className="contact-popup-trigger" onClick={() => setOpen(true)}>
        {triggerLabel} <ArrowUpRight size={14} />
      </button>

      {open && (
        <div className="contact-popup-overlay" onClick={() => setOpen(false)}>
          <div
            className="contact-popup-card"
            role="dialog"
            aria-modal="true"
            aria-label="Contact options"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="contact-popup-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <h3>Talk to our team</h3>
            <p>Reach out through whatever works best for you.</p>

            <div className="contact-popup-options">
              {options.map(({ icon: Icon, label, value, href }) => {
                const external = href.startsWith('http');
                return (
                  <a
                    key={label}
                    href={href}
                    className="contact-popup-option"
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                  >
                    <span className="contact-popup-icon">
                      <Icon size={18} />
                    </span>
                    <span className="contact-popup-text">
                      <strong>{label}</strong>
                      <span>{value}</span>
                    </span>
                    <ArrowUpRight size={15} className="contact-popup-arrow" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactPopup;
