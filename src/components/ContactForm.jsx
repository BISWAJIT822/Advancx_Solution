import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

// Web3Forms access key — get a free one at https://web3forms.com
// (enter advancxsolution@gmail.com there; submissions are emailed to it).
const WEB3FORMS_ACCESS_KEY = '146af91c-90fd-4b7c-bc1b-5f1b607fd50b';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = 'First name is required';
    if (!formData.lastName) tempErrors.lastName = 'Last name is required';
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!formData.message) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New enquiry from ${formData.firstName} ${formData.lastName} — Advancx website`,
          from_name: `${formData.firstName} ${formData.lastName}`,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          company: formData.company || 'Not provided',
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        });
        setTimeout(() => setSubmitSuccess(false), 6000);
      } else {
        setSubmitError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError(
        'Could not send your message. Please try again, or email us directly at advancxsolution@gmail.com.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-section-muted-2, rgba(6, 6, 8, 0.2))' }}>
      <div className="container">
        <div className="contact-grid reveal">
          {/* Left Column: Contact info */}
          <div className="contact-info-panel">
            <p className="partners-title" style={{ textAlign: 'left', marginBottom: '8px' }}>Get In Touch</p>
            <h2>Let's Advancx Your Business</h2>
            <p>
              Have a project in mind or need assistance with your existing systems? Reach out to our team of experts and let's craft a tailored solution for your company.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-detail-text">
                  <h4>Email Us</h4>
                  <p><a href="mailto:advancxsolution@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>advancxsolution@gmail.com</a></p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-detail-text">
                  <h4>Call Us</h4>
                  <p><a href="tel:+919348386856" style={{ color: 'inherit', textDecoration: 'none' }}>+91 93483 86856</a></p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-detail-text">
                  <h4>Visit Us</h4>
                  <p>Advancx Solution, Baripada, Odisha 757001, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form card */}
          <div className="card-premium contact-form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-group-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={errors.firstName ? { borderColor: '#ef4444' } : {}}
                  />
                  {errors.firstName && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.firstName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={errors.lastName ? { borderColor: '#ef4444' } : {}}
                  />
                  {errors.lastName && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Work Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={errors.email ? { borderColor: '#ef4444' } : {}}
                />
                {errors.email && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.email}</span>}
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="company">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="form-control"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  style={errors.message ? { borderColor: '#ef4444' } : {}}
                ></textarea>
                {errors.message && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn-primary form-submit-btn"
                disabled={isSubmitting}
                style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
              >
                {isSubmitting ? (
                  'Sending Message...'
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>

              {submitSuccess && (
                <div className="form-success-message">
                  Thank you! Your message has been sent successfully. We will get back to you shortly.
                </div>
              )}

              {submitError && (
                <div className="form-error-message">
                  {submitError}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
