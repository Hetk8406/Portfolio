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
    <section id="contact" style={{ padding: '140px 0 60px', background: 'var(--bg-dark-950)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="section-tag">Connection</span>
          <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: '1.1', marginBottom: '16px' }}>
            <WordReveal text="Let's Build Something Memorable" />
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '550px', margin: '0 auto', fontWeight: '300' }}>
            Initiate a collaboration, discuss machine learning systems, or talk about philosophical loops.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '64px',
          alignItems: 'start',
          maxWidth: '1040px',
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
                <Mail size={16} color="var(--text-secondary)" />
                <div>
                  <div className="font-mono" style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>EMAIL</div>
                  <a href={`mailto:${userData?.personalInfo?.email || "hetkikani880@gmail.com"}`} style={{ fontSize: '14px', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '400' }}>
                    {userData?.personalInfo?.email || "hetkikani880@gmail.com"}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', zIndex: 2 }}>
                <MapPin size={16} color="var(--text-secondary)" />
                <div>
                  <div className="font-mono" style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>LOCATION</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: '400' }}>
                    {userData?.personalInfo?.location || "Ahmedabad, Gujarat, India"}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px' }}>
                DIGITAL FOOTPRINT
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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
                <label className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Full Name</label>
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
                <label className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email Address</label>
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
                <label className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Inquiry or project details..."
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
                    scale: 1.01,
                    backgroundColor: "rgba(255,255,255,0.9)",
                    y: -1
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    flex: 1,
                    display: 'inline-block',
                    padding: '14px',
                    borderRadius: '4px',
                    border: '1px solid var(--text-primary)',
                    background: 'var(--text-primary)',
                    color: '#0A0A0B',
                    fontWeight: '500',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono, monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    {isSubmitting ? "Transmitting..." : "Initiate Collaboration"} <Send size={12} />
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
          <p className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} {userData?.personalInfo?.name || "Het Kikani"}. All loops closed.
          </p>
        </div>
      </div>
    </section>
  );
};

const SocialIcon = ({ platform, url }) => {
  const icons = {
    github: <Github size={14} />,
    linkedin: <Linkedin size={14} />,
    instagram: <Instagram size={14} />,
    twitter: <Twitter size={14} />
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        borderRadius: '4px',
        border: '1px solid var(--border-strong)',
        background: 'rgba(255, 255, 255, 0.01)',
        color: 'var(--text-secondary)',
        fontSize: '11px',
        fontFamily: 'JetBrains Mono, monospace',
        textDecoration: 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 2
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--text-primary)';
        e.currentTarget.style.color = 'var(--text-primary)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-strong)';
        e.currentTarget.style.color = 'var(--text-secondary)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)';
      }}
    >
      {icons[platform.toLowerCase()] || <Mail size={14} />}
      <span>{platform.toUpperCase()}</span>
    </a>
  );
};

export default ContactFooter;
