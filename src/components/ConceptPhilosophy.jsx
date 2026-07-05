import React from 'react';
import { motion } from 'framer-motion';
import WordReveal from './WordReveal';

const ConceptPhilosophy = () => {
  const fragments = [
    {
      index: "01",
      thought: "Memory is reconstruction.",
      context: "We do not retrieve records; we rebuild them on demand, layering present bias over historic static."
    },
    {
      index: "02",
      thought: "Language defines reality.",
      context: "If a concept cannot be encoded into the vocabulary of the observer, it remains invisible to the system."
    },
    {
      index: "03",
      thought: "The loop is both the cage and the key.",
      context: "Escaping a recursion requires understanding its boundaries, otherwise, progress is merely travel along the circumference."
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="concept" style={{ padding: '140px 0', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-dark-950)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="section-tag">Philosophical Fragments</span>
          <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: '1.1', marginBottom: '16px' }}>
            <WordReveal text="Concepts" />
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}
        >
          {fragments.map((frag, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                borderLeft: '1px solid var(--border-strong)',
                paddingLeft: '32px',
                position: 'relative'
              }}
            >
              {/* Monospace Index Tag */}
              <div className="font-mono" style={{
                position: 'absolute',
                left: '-16px',
                top: '0',
                background: 'var(--bg-dark-950)',
                padding: '4px 8px',
                fontSize: '11px',
                color: 'var(--text-muted)',
                fontWeight: '600'
              }}>
                [{frag.index}]
              </div>

              {/* Fragment Thought */}
              <h3 className="font-heading" style={{
                fontSize: 'clamp(22px, 3.5vw, 30px)',
                lineHeight: '1.2',
                fontWeight: '300',
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)'
              }}>
                &ldquo;{frag.thought}&rdquo;
              </h3>

              {/* Context Explanation */}
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '14.5px',
                lineHeight: '1.65',
                maxWidth: '600px'
              }}>
                {frag.context}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ConceptPhilosophy;
