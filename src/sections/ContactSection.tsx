import { motion, useReducedMotion } from 'motion/react';
import { Linkedin } from 'lucide-react';
import { contactContent } from '../content/siteContent';
import { revealEase } from '../lib/animation';

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();

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
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.22, margin: '0px 0px -10% 0px' }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.72, delay: shouldReduceMotion ? 0 : 0.08, ease: revealEase }}
      >
        {contactContent.fields.map((field) => (
          <label key={field}>
            <span>{field}</span>
            <input type={field === 'Email' ? 'email' : field === 'Phone' ? 'tel' : 'text'} />
          </label>
        ))}
        <label className="message-field">
          <span>Message</span>
          <textarea rows={5} />
        </label>
        <button type="button" className="btn-primary">
          {contactContent.submitLabel}
        </button>
      </motion.form>
    </section>
  );
}
