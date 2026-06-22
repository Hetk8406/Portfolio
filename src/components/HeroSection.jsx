import React from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import WordReveal from './WordReveal';
import { useMagnetic } from '../hooks/useMagnetic';

const HeroSection = () => {
  const workBtnRef = useMagnetic(0.15);
  const bookBtnRef = useMagnetic(0.15);

  // Parallax Scroll values
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, -35]);
  const yBg = useTransform(scrollY, [0, 600], [0, 45]);
  const opacityLines = useTransform(scrollY, [0, 600], [1, 0.3]);

  // Mouse Parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const xPct = (e.clientX / innerWidth) - 0.5;
    const yPct = (e.clientY / innerHeight) - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const textParallaxX = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const textParallaxY = useTransform(mouseY, [-0.5, 0.5], [-8, 8]);
  const bgParallaxX = useTransform(mouseX, [-0.5, 0.5], [10, -10]);
  const bgParallaxY = useTransform(mouseY, [-0.5, 0.5], [10, -10]);

  // Combine Scroll and Mouse Parallax offsets into single motion values
  const combinedYBg = useTransform([yBg, bgParallaxY], ([latestYBg, latestBgParallaxY]) => latestYBg + latestBgParallaxY);
  const combinedYText = useTransform([yText, textParallaxY], ([latestYText, latestTextParallaxY]) => latestYText + latestTextParallaxY);

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        background: '#050505',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Background Elements with Parallax (Scroll + Mouse) */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          x: bgParallaxX,
          y: combinedYBg,
          opacity: opacityLines,
          pointerEvents: 'none'
        }}
      >
        <div className="subtle-line-hero" />
        <div className="subtle-line-hero-right" />
      </motion.div>
      
      {/* Very soft center radial glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Layered Text Content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          x: textParallaxX,
          y: combinedYText
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-mono"
          style={{
            color: 'var(--text-muted)',
            letterSpacing: '0.3em',
            fontSize: '11px',
            textTransform: 'uppercase',
            fontWeight: '500',
            marginBottom: '24px',
            display: 'block'
          }}
        >
          Het Kikani
        </motion.span>

        <h1 className="font-heading" style={{
          fontSize: 'clamp(44px, 8vw, 92px)',
          fontWeight: '800',
          lineHeight: '1.05',
          letterSpacing: '-0.03em',
          margin: '0 0 16px 0',
          color: 'var(--text-primary)',
          maxWidth: '900px'
        }}>
          <WordReveal text="I build systems. I explore ideas." />
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            fontSize: 'clamp(16px, 1.8vw, 20px)',
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            margin: '0 auto 40px',
            fontWeight: '400',
            lineHeight: '1.6'
          }}
        >
          Developer & Author
        </motion.p>

        {/* Dual Magnetic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <motion.a
            ref={workBtnRef}
            href="#work"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.12)",
              backgroundColor: "transparent",
              color: "var(--text-primary)",
              borderColor: "var(--text-primary)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              borderRadius: '8px',
              background: 'var(--text-primary)',
              color: '#020202',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              border: '1px solid var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            Explore Work
          </motion.a>
          <motion.a
            ref={bookBtnRef}
            href="#ananta"
            whileHover={{
              scale: 1.02,
              borderColor: "var(--text-primary)",
              backgroundColor: "rgba(255,255,255,0.02)",
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.03)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              borderRadius: '8px',
              background: 'transparent',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer'
            }}
          >
            Explore Ananta
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-muted)'
        }}
      >
        <span className="font-mono" style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Scroll
        </span>
        <ArrowDown size={14} />
      </motion.div>
    </div>
  );
};

export default HeroSection;
