import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, ArrowUpRight, CheckCircle2, Upload } from 'lucide-react';

// Same Web3Forms key as the contact form — applications land in advancxsolution@gmail.com.
const WEB3FORMS_ACCESS_KEY = '146af91c-90fd-4b7c-bc1b-5f1b607fd50b';

const emptyForm = { name: '', email: '', phone: '', position: '', portfolio: '', message: '' };

const ApplyPopup = ({ position = '', triggerLabel = 'Apply Now' }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...emptyForm, position });
  const [errors, setErrors] = useState({});
  const [resume, setResume] = useState(null);
  const [fileError, setFileError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Lock scroll + close on Escape while the modal is open.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const openModal = () => {
    setForm({ ...emptyForm, position });
    setErrors({});
    setResume(null);
    setFileError('');
    setSubmitError('');
    setSuccess(false);
    setOpen(true);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setResume(null);
      return;
    }
    if (!/\.(pdf|docx?|rtf)$/i.test(file.name)) {
      setFileError('Please upload a PDF or Word document.');
      e.target.value = '';
      setResume(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File must be under 5 MB.');
      e.target.value = '';
      setResume(null);
      return;
    }
    setFileError('');
    setResume(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'Name is required';
    if (!form.email.trim()) err.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Enter a valid email';
    if (!form.message.trim()) err.message = 'Please add a short message';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      // FormData (multipart) so the resume file can be attached.
      const fd = new FormData();
      fd.append('access_key', WEB3FORMS_ACCESS_KEY);
      fd.append('subject', `Job Application: ${form.position || 'General'} — ${form.name}`);
      fd.append('from_name', form.name);
      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('phone', form.phone || 'Not provided');
      fd.append('position', form.position || 'General application');
      fd.append('portfolio', form.portfolio || 'Not provided');
      fd.append('message', form.message);
      if (resume) fd.append('resume', resume);

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fd,
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setSubmitError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Could not send your application. Please try again, or email advancxsolution@gmail.com.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button type="button" className="contact-popup-trigger" onClick={openModal}>
        {triggerLabel} <ArrowUpRight size={14} />
      </button>

      {open &&
        createPortal(
          <div className="contact-popup-overlay" onClick={() => setOpen(false)}>
            <div
              className="contact-popup-card apply-popup-card"
              role="dialog"
              aria-modal="true"
              aria-label="Job application form"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="contact-popup-close" onClick={() => setOpen(false)} aria-label="Close">
                <X size={18} />
              </button>

              {success ? (
                <div className="apply-success">
                  <CheckCircle2 size={44} strokeWidth={1.6} />
                  <h3>Application received!</h3>
                  <p>
                    Thanks for applying{form.position ? ` for ${form.position}` : ''}. We&apos;ll review it
                    and get back to you soon.
                  </p>
                  <button type="button" className="btn-primary" onClick={() => setOpen(false)}>
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <h3>{position ? `Apply — ${position}` : 'Apply to Advancx'}</h3>
                  <p>Tell us about yourself and we&apos;ll be in touch.</p>

                  <form className="apply-form" onSubmit={handleSubmit} noValidate>
                    <div className="apply-row">
                      <div className="apply-field">
                        <label>Full Name *</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={errors.name ? 'has-error' : ''}
                        />
                        {errors.name && <span className="apply-err">{errors.name}</span>}
                      </div>
                      <div className="apply-field">
                        <label>Email *</label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@email.com"
                          className={errors.email ? 'has-error' : ''}
                        />
                        {errors.email && <span className="apply-err">{errors.email}</span>}
                      </div>
                    </div>

                    <div className="apply-row">
                      <div className="apply-field">
                        <label>Phone</label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 00000 00000"
                        />
                      </div>
                      <div className="apply-field">
                        <label>Position</label>
                        <input
                          name="position"
                          value={form.position}
                          onChange={handleChange}
                          readOnly={Boolean(position)}
                          placeholder="Role you're applying for"
                        />
                      </div>
                    </div>

                    <div className="apply-field">
                      <label>Portfolio link</label>
                      <input
                        name="portfolio"
                        value={form.portfolio}
                        onChange={handleChange}
                        placeholder="LinkedIn, GitHub, or portfolio URL"
                      />
                    </div>

                    <div className="apply-field">
                      <label>Resume (PDF or Word, max 5 MB)</label>
                      <label className="apply-file">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.rtf"
                          onChange={handleFile}
                          hidden
                        />
                        <span className="apply-file-btn">
                          <Upload size={15} />
                          {resume ? resume.name : 'Choose file'}
                        </span>
                      </label>
                      {fileError && <span className="apply-err">{fileError}</span>}
                    </div>

                    <div className="apply-field">
                      <label>Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="A few lines about you and why you're a fit"
                        className={errors.message ? 'has-error' : ''}
                      />
                      {errors.message && <span className="apply-err">{errors.message}</span>}
                    </div>

                    {submitError && <div className="form-error-message">{submitError}</div>}

                    <button type="submit" className="btn-primary apply-submit" disabled={submitting}>
                      {submitting ? (
                        'Sending…'
                      ) : (
                        <>
                          Submit Application <Send size={15} />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ApplyPopup;
