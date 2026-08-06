import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Send, Download, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import WordReveal from './WordReveal';
import { useMagnetic } from '../hooks/useMagnetic';
import userData from '../../userProfileData.json';

const HeroSection = () => {
  const profilePicture = userData?.userProfileData?.personalInfo?.profilePicture || "/images/profile.jpg";
  const workBtnRef = useMagnetic(0.12);
  const bookBtnRef = useMagnetic(0.12);

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
        await new Promise((r) => setTimeout(r, 45));
      }
      await new Promise((r) => setTimeout(r, 300));
      setTerminalLine2('Switched to branch "cse-data-science"');
      await new Promise((r) => setTimeout(r, 400));

      // Line 3: npm run build
      const line3 = 'npm run build';
      for (let i = 0; i <= line3.length; i++) {
        setTerminalLine3('$' + ' ' + line3.slice(0, i));
        await new Promise((r) => setTimeout(r, 45));
      }
      await new Promise((r) => setTimeout(r, 300));
      setTerminalLine4('✓ Compiled successfully in 1.4s\n✓ Static pages (7/7) generated');
      await new Promise((r) => setTimeout(r, 500));

      // Line 5: deployment url
      setTerminalLine5('⚡ Production deployment: https://hetkikani.vercel.app');
    };

    sequence();
  }, []);

  // Parallax Scroll values
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, -30]);
  const yImage = useTransform(scrollY, [0, 600], [0, 30]);

  // Mouse Parallax values (very subtle)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const xPct = (e.clientX / innerWidth) - 0.5;
    const yPct = (e.clientY / innerHeight) - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const textParallaxX = useTransform(mouseX, [-0.5, 0.5], [-6, 6]);
  const textParallaxY = useTransform(mouseY, [-0.5, 0.5], [-6, 6]);
  const imageParallaxX = useTransform(mouseX, [-0.5, 0.5], [8, -8]);
  const imageParallaxY = useTransform(mouseY, [-0.5, 0.5], [8, -8]);

  const roles = ["AI Engineer", "Full Stack Developer", "Machine Learning Developer", "Product Builder"];

  return (
    <section
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        overflow: 'hidden',
        padding: '120px 0 80px'
      }}
    >
      <div className="container" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '64px',
          alignItems: 'center'
        }}>
          {/* Left Column: Headline & Metadata */}
          <motion.div
            style={{
              x: textParallaxX,
              y: yText,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}
          >
            {/* Minimal Tag Deck */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px', marginBottom: '24px' }}>
              {roles.map((role, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--text-muted)' }} />
                  <span className="font-mono" style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {role}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Title / Headline: Swapped to display intro text */}
            <h1 className="font-heading" style={{
              fontSize: 'clamp(24px, 3.8vw, 36px)',
              fontWeight: '300',
              lineHeight: '1.25',
              letterSpacing: '-0.02em',
              marginBottom: '20px',
              color: 'var(--text-primary)',
              textAlign: 'left'
            }}>
              <WordReveal text="Hi, I'm Het Kikani." />
            </h1>

            {/* Subtitle Description: Swapped to display slogans */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                fontSize: 'clamp(15px, 1.8vw, 18px)',
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                marginBottom: '36px',
                maxWidth: '520px',
                textAlign: 'left',
                fontWeight: '300'
              }}
            >
              I craft high-performance full-stack architectures, integrate machine learning pipelines, and author sci-fi stories exploring loops and entropy.
              Engineering systems that learn. Building products that feel alive.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                marginBottom: '40px'
              }}
            >
              <motion.a
                ref={workBtnRef}
                href="#work"
                whileHover={{
                  scale: 1.01,
                  backgroundColor: "rgba(255,255,255,0.9)",
                  y: -1
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '13px 24px',
                  borderRadius: '4px',
                  background: 'var(--text-primary)',
                  color: '#0A0A0B',
                  textDecoration: 'none',
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  border: '1px solid var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                Explore Work <ArrowUpRight size={13} />
              </motion.a>
              <motion.a
                ref={bookBtnRef}
                href="#books"
                whileHover={{
                  scale: 1.01,
                  borderColor: "var(--text-primary)",
                  backgroundColor: "rgba(255,255,255,0.02)",
                  y: -1
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '13px 24px',
                  borderRadius: '4px',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  border: '1px solid var(--border-strong)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                Read Books
              </motion.a>
            </motion.div>

            {/* Terminal Console Widget merged directly inside Hero section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                width: '100%',
                maxWidth: '520px',
                background: '#0E0E12',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '4px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                overflow: 'hidden'
              }}
            >
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
                gap: '8px',
                textAlign: 'left'
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
            </motion.div>

          </motion.div>

          {/* Right Column: Premium Frame Profile Image, Actions, Socials, & Counter Metrics */}
          <motion.div
            style={{
              x: imageParallaxX,
              y: yImage,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              gap: '20px',
              marginTop: '-50px' // Moves the entire right column layout upwards
            }}
          >
            {/* Subtle floating radial ambient highlight behind the frame */}
            <div style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)',
              zIndex: 0,
              pointerEvents: 'none'
            }} />

            {/* Framed Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '340px',
                aspectRatio: '0.85',
                background: 'var(--bg-dark-900)',
                border: '1px solid var(--border-subtle)',
                padding: '12px',
                borderRadius: '8px',
                zIndex: 1,
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <img
                  src={profilePicture}
                  alt="Het Kikani"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(0.95) contrast(1.05) brightness(0.9)',
                    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0) contrast(1.02) brightness(0.95)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0.95) contrast(1.05) brightness(0.9)';
                  }}
                />
              </div>

              {/* Technical floating annotation label */}
              <div
                className="font-mono"
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '12px',
                  fontSize: '9px',
                  color: 'var(--text-muted)',
                  letterSpacing: '1px'
                }}
              >
                [ SYS.INIT // Ahmedabad, IN ]
              </div>
            </motion.div>

            {/* Quick Actions directly below image */}
            <div style={{
              display: 'flex',
              gap: '12px',
              width: '100%',
              maxWidth: '340px',
              zIndex: 1,
              justifyContent: 'center'
            }}>
              <a href="#contact" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255,255,255,0.02)',
                color: 'var(--text-primary)',
                padding: '10px 18px',
                borderRadius: '4px',
                border: '1px solid var(--border-strong)',
                fontWeight: '500',
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.06)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.02)'}
              >
                Get in Touch <Send size={11} />
              </a>

              <a href="/Het_Kikani_Resume.pdf" download style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255,255,255,0.02)',
                color: 'var(--text-primary)',
                padding: '10px 18px',
                borderRadius: '4px',
                border: '1px solid var(--border-strong)',
                fontWeight: '500',
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.06)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.02)'}
              >
                Resume <Download size={11} />
              </a>
            </div>

            {/* Social Connection Row */}
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '340px',
              zIndex: 1
            }}>
              {[
                { icon: <Github size={15} />, url: userData?.userProfileData?.personalInfo?.socialLinks?.github },
                { icon: <Linkedin size={15} />, url: userData?.userProfileData?.personalInfo?.socialLinks?.linkedin },
                { icon: <Twitter size={15} />, url: userData?.userProfileData?.personalInfo?.socialLinks?.twitter },
                { icon: <Instagram size={15} />, url: userData?.userProfileData?.personalInfo?.socialLinks?.instagram }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    background: 'rgba(255, 255, 255, 0.01)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'var(--border-strong)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>

            {/* Impact Metrics Section */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                width: '100%',
                maxWidth: '340px',
                zIndex: 1
              }}
            >
              <div style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.03)',
                padding: '16px 12px',
                borderRadius: '4px',
                textAlign: 'center'
              }}>
                <div className="font-mono" style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  [ 03+ ]
                </div>
                <div className="font-mono" style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  ML Projects
                </div>
              </div>
              <div style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.03)',
                padding: '16px 12px',
                borderRadius: '4px',
                textAlign: 'center'
              }}>
                <div className="font-mono" style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  [ 03+ ]
                </div>
                <div className="font-mono" style={{ fontSize: '8.5px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Full-Stack Projects Built
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Floating indicators at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-muted)',
          zIndex: 3
        }}
      >
        <span className="font-mono" style={{ fontSize: '8.5px', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
          Scroll down
        </span>
        <ArrowDown size={12} style={{ animation: 'bounce 2s infinite' }} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
