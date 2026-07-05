import React from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import WordReveal from './WordReveal';
import { useMagnetic } from '../hooks/useMagnetic';

const HeroSection = () => {
  const workBtnRef = useMagnetic(0.12);
  const bookBtnRef = useMagnetic(0.12);

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

            {/* Title / Headline */}
            <h1 className="font-heading" style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: '300',
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
              marginBottom: '20px',
              color: 'var(--text-primary)',
              textAlign: 'left'
            }}>
              <WordReveal text="Engineering systems that learn. Building products that feel alive." />
            </h1>

            {/* Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                fontSize: '15px',
                color: 'var(--text-secondary)',
                lineHeight: '1.65',
                marginBottom: '36px',
                maxWidth: '520px',
                textAlign: 'left',
                fontWeight: '300'
              }}
            >
              Hi, I'm Het Kikani. I craft high-performance full-stack architectures, integrate machine learning pipelines, and author sci-fi stories exploring loops and entropy.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap'
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
          </motion.div>

          {/* Right Column: Premium Frame Profile Image */}
          <motion.div
            style={{
              x: imageParallaxX,
              y: yImage,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
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
                  src="/images/profile.jpg"
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
