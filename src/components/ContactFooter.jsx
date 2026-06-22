import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Instagram, Twitter, Send } from 'lucide-react';
import WordReveal from './WordReveal';
import { useMagnetic } from '../hooks/useMagnetic';

const ContactFooter = ({ userData }) => {
  const submitBtnRef = useMagnetic(0.12);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { name, email, message } = formData;

    const recipient = userData?.personalInfo?.email || "hetkikani990@gmail.com";
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    setTimeout(() => {
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 600);
  };

  const socialLinks = userData?.personalInfo?.socialLinks || {};

  const colLeftVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const colRightVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
    }
  };

  return (
    <section id="contact" style={{ padding: '120px 0 60px', background: '#050505' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="section-tag">Transmission</span>
          <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: '1.1', marginBottom: '16px' }}>
            <WordReveal text="Get in Touch" />
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '500px', margin: '0 auto' }}>
            Initiate a connection or discuss engineering collaborations.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '64px',
          alignItems: 'start',
          maxWidth: '1000px',
          margin: '0 auto 80px'
        }}>
          {/* Details Column */}
          <motion.div
            variants={colLeftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            <div className="surface-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', zIndex: 2 }}>
                <Mail size={18} color="var(--text-secondary)" />
                <div>
                  <div className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>EMAIL</div>
                  <a href={`mailto:${userData?.personalInfo?.email || "hetkikani880@gmail.com"}`} style={{ fontSize: '14px', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}>
                    {userData?.personalInfo?.email || "hetkikani880@gmail.com"}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', zIndex: 2 }}>
                <MapPin size={18} color="var(--text-secondary)" />
                <div>
                  <div className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>LOCATION</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '500' }}>
                    {userData?.personalInfo?.location || "Ahmedabad, Gujarat, India"}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                DIGITAL FOOTPRINT
              </h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                {Object.entries(socialLinks).map(([platform, url]) => (
                  <SocialIcon key={platform} platform={platform} url={url} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            variants={colRightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="surface-card"
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 2, position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="minimal-input"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="minimal-input"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Inquiry or message details..."
                  className="minimal-input"
                  style={{ resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex' }}>
                <motion.button
                  ref={submitBtnRef}
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{
                    scale: 1.015,
                    boxShadow: "0 0 15px rgba(255, 255, 255, 0.12)",
                    backgroundColor: "transparent",
                    color: "var(--text-primary)",
                    borderColor: "var(--text-primary)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    flex: 1,
                    display: 'inline-block',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid var(--text-primary)',
                    background: 'var(--text-primary)',
                    color: '#020202',
                    fontWeight: '600',
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    {isSubmitting ? "Transmitting..." : "Send Transmission"} <Send size={14} />
                  </span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        <div style={{
          marginTop: '60px',
          paddingTop: '32px',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center'
        }}>
          <p className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} {userData?.personalInfo?.name || "Het Kikani"}. All loops closed.
          </p>
        </div>
      </div>
    </section>
  );
};

const SocialIcon = ({ platform, url }) => {
  const icons = {
    github: <Github size={16} />,
    linkedin: <Linkedin size={16} />,
    instagram: <Instagram size={16} />,
    twitter: <Twitter size={16} />
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      style={{
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        border: '1px solid var(--border-subtle)',
        background: 'rgba(255, 255, 255, 0.02)',
        color: 'var(--text-secondary)',
        transition: 'all 0.2s ease',
        zIndex: 2
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--text-primary)';
        e.currentTarget.style.color = 'var(--text-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.color = 'var(--text-secondary)';
      }}
    >
      {icons[platform.toLowerCase()] || <Mail size={16} />}
    </a>
  );
};

export default ContactFooter;
