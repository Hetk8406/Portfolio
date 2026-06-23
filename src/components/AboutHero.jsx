import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Download, ArrowRight, Send, Terminal } from 'lucide-react';
import Link from 'next/link';

const AboutHero = ({ userData, isSummary }) => {
  const personalInfo = userData?.personalInfo || {};
  const socialLinks = personalInfo?.socialLinks || {};

  // Interactive Terminal Typing Simulation
  const [terminalLine1, setTerminalLine1] = useState('');
  const [terminalLine2, setTerminalLine2] = useState('');
  const [terminalLine3, setTerminalLine3] = useState('');
  const [terminalLine4, setTerminalLine4] = useState('');
  const [terminalLine5, setTerminalLine5] = useState('');

  useEffect(() => {
    const sequence = async () => {
      // Line 1: git checkout
      const line1 = 'git checkout -b cse-data-science';
      for (let i = 0; i <= line1.length; i++) {
        setTerminalLine1('$' + ' ' + line1.slice(0, i));
        await new Promise((r) => setTimeout(r, 40));
      }
      await new Promise((r) => setTimeout(r, 400));
      setTerminalLine2('Switched to branch "cse-data-science"');
      await new Promise((r) => setTimeout(r, 600));

      // Line 3: npm run build
      const line3 = 'npm run build';
      for (let i = 0; i <= line3.length; i++) {
        setTerminalLine3('$' + ' ' + line3.slice(0, i));
        await new Promise((r) => setTimeout(r, 40));
      }
      await new Promise((r) => setTimeout(r, 400));
      setTerminalLine4('✓ Compiled successfully in 1.4s\n✓ Static pages (7/7) generated');
      await new Promise((r) => setTimeout(r, 700));

      // Line 5: deployment url
      setTerminalLine5('⚡ Production deployment: https://hetkikani.vercel.app');
    };

    sequence();
  }, []);

  return (
    <section style={{ padding: '80px 0 100px 0', position: 'relative', overflow: 'hidden', background: '#050505' }}>
      {/* Background Subtle Tech-Lines Grid Effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.08,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
        backgroundSize: '24px 24px',
        pointerEvents: 'none'
      }} />

      {/* Decorative Radial Lights */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0,240,255,0.03) 0%, transparent 70%)',
        top: '-10%',
        left: '-10%',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.03) 0%, transparent 70%)',
        bottom: '-10%',
        right: '-10%',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '64px',
          alignItems: 'center'
        }} className="about-hero-grid">
          
          {/* Left Column: Personal info & buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            {/* Title & Name */}
            <div>
              <h1 className="font-heading" style={{
                fontSize: 'clamp(40px, 6vw, 68px)',
                lineHeight: '1.05',
                fontWeight: '800',
                letterSpacing: '-0.03em',
                marginBottom: '20px',
                color: 'var(--text-primary)'
              }}>
                Hi, I&apos;m <br />
                <span style={{
                  background: 'linear-gradient(135deg, #00f0ff 0%, #6366f1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {personalInfo.name || "Het Kikani"}
                </span>
              </h1>

              {/* Subtitle Terminal Pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                background: 'rgba(99,102,241,0.05)',
                border: '1px solid rgba(99,102,241,0.15)',
                borderRadius: '100px',
                color: '#818cf8',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '13px',
                fontWeight: '500',
                marginBottom: '24px'
              }}>
                <Terminal size={14} />
                <span>&gt;_ Full-Stack Web Developer & Data Science Student</span>
              </div>

              {/* Main Bio Paragraph */}
              <p style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: 'var(--text-secondary)',
                maxWidth: '620px',
                fontWeight: '400'
              }}>
                I specialize in building scalable web applications and exploring predictive systems through Machine Learning & Data Science. I focus on creating high-performance codebases, elegant user experiences, and training regression models for complex analytics.
              </p>
            </div>

            {/* Action Call-to-Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <Link href="/projects" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#00f0ff',
                color: '#050505',
                padding: '14px 28px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '14px',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0, 240, 255, 0.25)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 24px rgba(0, 240, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 20px rgba(0, 240, 255, 0.25)';
              }}
              >
                Explore Projects <ArrowRight size={16} />
              </Link>

              <Link href="/#contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.02)',
                color: 'var(--text-primary)',
                padding: '14px 28px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.08)',
                fontWeight: '600',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.06)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.02)'}
              >
                Get in Touch <Send size={15} />
              </Link>

              <a href="/Het_Kikani_Resume.pdf" download style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.02)',
                color: 'var(--text-primary)',
                padding: '14px 28px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.08)',
                fontWeight: '600',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.06)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.02)'}
              >
                Resume <Download size={15} />
              </a>
            </div>

            {/* Social Connection Row */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <a href={socialLinks.github} target="_blank" rel="noreferrer" style={socialIconStyle}>
                <Github size={20} />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" style={socialIconStyle}>
                <Linkedin size={20} />
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noreferrer" style={socialIconStyle}>
                <Twitter size={20} />
              </a>
              <a href="mailto:hetkikani804@gmail.com" style={socialIconStyle}>
                <Mail size={20} />
              </a>
            </div>

            {/* Stats Counter Boxes */}
            <div
              className="about-hero-stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginTop: '16px'
              }}
            >
              <div style={statBoxStyle}>
                <span className="font-heading" style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)' }}>3+ yrs</span>
                <span className="font-mono" style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Technical Training</span>
              </div>
              <div style={statBoxStyle}>
                <span className="font-heading" style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)' }}>10+</span>
                <span className="font-mono" style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Repos & Projects</span>
              </div>
              <div style={statBoxStyle}>
                <span className="font-heading" style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)' }}>Remote</span>
                <span className="font-mono" style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Collab</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: User profile frame & console log */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}
          >
            
            {/* Profile Frame with Gradient Shadow */}
            <div style={{ position: 'relative', width: '280px', height: '280px' }}>
              <div style={{
                position: 'absolute',
                inset: '-8px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #00f0ff 0%, #6366f1 100%)',
                opacity: 0.25,
                filter: 'blur(16px)',
                zIndex: 1
              }} />
              
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                padding: '6px',
                background: 'linear-gradient(135deg, rgba(0,240,255,0.4) 0%, rgba(99,102,241,0.4) 100%)',
                position: 'relative',
                zIndex: 2,
                boxShadow: '0 20px 40px rgba(0,0,0,0.6)'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '18px',
                  background: '#0a0a0f',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <img
                    src={personalInfo.profilePicture || "https://ui-avatars.com/api/?name=Het+Kikani&background=020205&color=00f0ff&size=256"}
                    alt={personalInfo.name || "Het Kikani"}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Available badge */}
            <div style={{
              padding: '6px 18px',
              borderRadius: '100px',
              border: '1px solid rgba(0, 240, 255, 0.15)',
              background: 'rgba(0, 240, 255, 0.03)',
              color: '#00f0ff',
              fontSize: '11px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              fontFamily: 'JetBrains Mono, monospace',
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.05)'
            }}>
              Available for builds
            </div>

            {/* Terminal Console Widget */}
            <div style={{
              width: '100%',
              maxWidth: '380px',
              background: '#0E0E12',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
              overflow: 'hidden'
            }}>
              {/* Terminal Title Bar */}
              <div style={{
                padding: '12px 16px',
                background: '#08080b',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }}></span>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }}></span>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
                </div>
                <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                  workspace://delivery-log
                </span>
                <span style={{ width: '20px' }}></span>
              </div>

              {/* Terminal Text Body */}
              <div className="font-mono" style={{
                padding: '18px',
                minHeight: '160px',
                fontSize: '11px',
                lineHeight: '1.6',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                {terminalLine1 && (
                  <div style={{ color: '#E5E7EB' }}>{terminalLine1}</div>
                )}
                {terminalLine2 && (
                  <div style={{ color: 'rgba(255,255,255,0.4)', paddingLeft: '8px' }}>{terminalLine2}</div>
                )}
                {terminalLine3 && (
                  <div style={{ color: '#E5E7EB' }}>{terminalLine3}</div>
                )}
                {terminalLine4 && (
                  <pre style={{
                    margin: 0,
                    color: '#34D399',
                    fontFamily: 'inherit',
                    paddingLeft: '8px',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {terminalLine4}
                  </pre>
                )}
                {terminalLine5 && (
                  <div style={{ color: '#818CF8', paddingLeft: '8px', borderTop: '1px dashed rgba(255,255,255,0.05)', paddingTop: '6px', marginTop: '4px' }}>
                    {terminalLine5}
                  </div>
                )}
              </div>
            </div>

          </motion.div>

        </div>

        {isSummary && (
          <div style={{ textAlign: 'center', marginTop: '56px', position: 'relative', zIndex: 10 }}>
            <Link
              href="/about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 255, 255, 0.02)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '13px',
                fontFamily: 'JetBrains Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.06)';
                e.target.style.borderColor = 'rgba(255,255,255,0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.02)';
                e.target.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              View More About Me <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>

      {/* Grid Breakpoint Responsive Custom Styling */}
      <style>{`
        @media (max-width: 991px) {
          .about-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 540px) {
          .about-hero-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
};

// Social icon button styles
const socialIconStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.06)',
  background: 'rgba(255,255,255,0.02)',
  color: 'var(--text-secondary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  textDecoration: 'none'
};

// Stat box styling
const statBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.04)',
  background: 'rgba(255,255,255,0.01)',
  alignItems: 'center',
  textAlign: 'center'
};

export default AboutHero;
