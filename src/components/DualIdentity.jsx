import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, BookOpen, ArrowRight } from 'lucide-react';
import WordReveal from './WordReveal';

const DualIdentity = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const panelVariantsLeft = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const panelVariantsRight = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="dual-identity" style={{ padding: '120px 0', borderBottom: '1px solid var(--border-subtle)', position: 'relative' }}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'stretch'
          }}
        >
          {/* Left Column: Developer / Systems */}
          <motion.div
            variants={panelVariantsLeft}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '36px',
              borderRadius: '8px',
              background: 'var(--bg-dark-900)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Terminal size={18} color="var(--text-secondary)" />
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  Engineering Persona
                </span>
              </div>
              <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '300', lineHeight: '1.1', marginBottom: '16px' }}>
                <WordReveal text="The Developer" />
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: '1.65', marginBottom: '32px' }}>
                Architecting algorithms and data-driven systems. Translating structural logic into performant web infrastructures and machine learning models.
              </p>
            </div>

            {/* Developer Preview Elements */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <div style={{
                padding: '16px',
                borderRadius: '4px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-dark-950)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>PROJECT.01</div>
                  <div style={{ fontSize: '13.5px', fontWeight: '500' }}>LAWYER.AI</div>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)', border: '1px solid var(--border-strong)', borderRadius: '4px', padding: '2px 6px', fontFamily: 'JetBrains Mono, monospace' }}>AI Legal Infra</span>
              </div>

              <div style={{
                padding: '16px',
                borderRadius: '4px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-dark-950)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>PROJECT.02</div>
                  <div style={{ fontSize: '13.5px', fontWeight: '500' }}>ConceptLens</div>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)', border: '1px solid var(--border-strong)', borderRadius: '4px', padding: '2px 6px', fontFamily: 'JetBrains Mono, monospace' }}>SaaS Exploration</span>
              </div>
            </div>

            <a
              href="#work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: '500',
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              Explore Systems <ArrowRight size={14} />
            </a>
          </motion.div>

          {/* Right Column: Author / Sci-Fi */}
          <motion.div
            variants={panelVariantsRight}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '36px',
              borderRadius: '8px',
              background: 'var(--bg-dark-900)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <BookOpen size={18} color="var(--text-secondary)" />
                <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  Narrative Persona
                </span>
              </div>
              <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '300', lineHeight: '1.1', marginBottom: '16px' }}>
                <WordReveal text="The Author" />
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: '1.65', marginBottom: '32px' }}>
                Exploring philosophical concepts, recursive memory, and loops through the sci-fi novel duology **Ananta**. Mapping complex ideas onto narrative architectures.
              </p>
            </div>

            {/* Author Preview Elements */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              padding: '24px',
              borderRadius: '4px',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-dark-950)',
              marginBottom: '32px',
              minHeight: '120px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <svg width="180" height="70" viewBox="0 0 180 70" style={{ opacity: 0.4 }}>
                <path d="M 10 35 Q 45 10, 90 35 T 170 35" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                <path d="M 10 35 Q 45 60, 90 35 T 170 35" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="90" cy="35" r="8" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
                <circle cx="35" cy="22" r="3" fill="rgba(255,255,255,0.3)" />
                <circle cx="145" cy="48" r="3" fill="rgba(255,255,255,0.3)" />
              </svg>
              <div style={{ position: 'absolute', bottom: '12px', right: '12px', fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                ANANTA.SYS
              </div>
            </div>

            <a
              href="#books"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: '500',
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              Explore Narrative <ArrowRight size={14} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DualIdentity;
