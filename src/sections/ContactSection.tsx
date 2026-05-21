import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Linkedin } from 'lucide-react';
import { contactContent } from '../content/siteContent';
import { revealEase } from '../lib/animation';

type FormState = {
  name: string;
  organisation: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  message: string;
};

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const emptyForm: FormState = {
  name: '',
  organisation: '',
  email: '',
  phone: '',
  areaOfInterest: '',
  message: '',
};

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          organisation: form.organisation,
          email: form.email,
          phone: form.phone,
          area_of_interest: form.areaOfInterest,
          message: form.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setForm(emptyForm);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const fieldMap: Array<{ label: string; name: keyof FormState; type: string }> = [
    { label: 'Name', name: 'name', type: 'text' },
    { label: 'Organisation', name: 'organisation', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Phone', name: 'phone', type: 'tel' },
    { label: 'Area of Interest', name: 'areaOfInterest', type: 'text' },
  ];

  return (
    <section className="site-section contact-section" id="contact">
      <motion.div
        className="contact-copy"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3, margin: '0px 0px -10% 0px' }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.72, ease: revealEase }}
      >
        <div className="section-rail">
          <div className="section-rail-label">
            <span className="section-rail-dot" />
            {contactContent.label}
          </div>
          <div className="section-rail-line" />
        </div>
        <h2>{contactContent.title}</h2>
        <p>{contactContent.description}</p>
        <div className="contact-socials" aria-label="Social media links">
          {contactContent.socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="contact-social-link"
              aria-label={social.label}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="footer-social-icon" aria-hidden="true" />
            </a>
          ))}
        </div>
      </motion.div>

      <motion.form
        className="contact-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.22, margin: '0px 0px -10% 0px' }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.72, delay: shouldReduceMotion ? 0 : 0.08, ease: revealEase }}
      >
        {fieldMap.map((field) => (
          <label key={field.name}>
            <span>{field.label}</span>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required={field.name === 'name' || field.name === 'email'}
            />
          </label>
        ))}
        <label className="message-field">
          <span>Message</span>
          <textarea
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
          />
        </label>

        {status === 'success' && (
          <p className="form-feedback form-feedback--success">
            Thank you for reaching out. We've received your enquiry and will be in touch shortly. Please check your inbox for a confirmation.
          </p>
        )}
        {status === 'error' && (
          <p className="form-feedback form-feedback--error">
            Something went wrong. Please try again or email us directly at info@maseconsultinggroup.com
          </p>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending…' : contactContent.submitLabel}
        </button>
      </motion.form>
    </section>
  );
}
