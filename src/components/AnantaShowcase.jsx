import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Download, X } from 'lucide-react';
import WordReveal from './WordReveal';

const AnantaShowcase = () => {
  const [activeBook, setActiveBook] = useState(null);

  const books = [
    {
      title: "Ananta: The Infinite Cycle",
      volume: "VOLUME 01",
      pdfUrl: "/Ananta - The Infinite Cycle.pdf",
      description: "A deep dive into recursive loops, identity containment, and the boundaries of human recollection. Where time behaves like an unhandled loop, and memory is only a reconstruction.",
      coverSvg: (
        <svg width="100%" height="100%" viewBox="0 0 200 300" fill="none">
          <rect width="200" height="300" rx="8" fill="#0C0C0F" />
          <rect width="200" height="300" rx="8" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <circle cx="100" cy="130" r="45" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" />
          <circle cx="100" cy="130" r="45" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" strokeDasharray="6 4" />
          <path d="M 60 130 C 60 70, 140 70, 140 130 C 140 190, 60 190, 60 130" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <text x="100" y="240" fill="#EAEAEA" fontSize="11" fontFamily="Syne" fontWeight="bold" textAnchor="middle" letterSpacing="2">ANANTA</text>
          <text x="100" y="258" fill="#9CA3AF" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="1">THE INFINITE CYCLE</text>
          <text x="100" y="40" fill="#52525B" fontSize="6" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="3">VOL. 01</text>
        </svg>
      )
    },
    {
      title: "Ananta: The Unwritten Dark",
      volume: "VOLUME 02",
      pdfUrl: "/Ananta - The Unwritten Dark.pdf",
      description: "Exploring the edge of memory erosion, the silence between code segments, and the final state of empty information. An existential sci-fi narrative mapping reality onto entropy.",
      coverSvg: (
        <svg width="100%" height="100%" viewBox="0 0 200 300" fill="none">
          <rect width="200" height="300" rx="8" fill="#0C0C0F" />
          <rect width="200" height="300" rx="8" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <line x1="50" y1="100" x2="150" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <line x1="50" y1="120" x2="130" y2="120" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="50" y1="140" x2="100" y2="140" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="50" y1="160" x2="70" y2="160" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <circle cx="150" cy="100" r="3" fill="#EAEAEA" opacity="0.6" />
          <text x="100" y="240" fill="#EAEAEA" fontSize="11" fontFamily="Syne" fontWeight="bold" textAnchor="middle" letterSpacing="2">ANANTA</text>
          <text x="100" y="258" fill="#9CA3AF" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="1">THE UNWRITTEN DARK</text>
          <text x="100" y="40" fill="#52525B" fontSize="6" fontFamily="JetBrains Mono" textAnchor="middle" letterSpacing="3">VOL. 02</text>
        </svg>
      )
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="ananta" style={{ padding: '120px 0', borderBottom: '1px solid var(--border-subtle)', background: '#050505' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="section-tag">Sci-Fi Duology</span>
          <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: '1.1', marginBottom: '16px' }}>
            <WordReveal text="Ananta" />
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '600px', margin: '0 auto', fontWeight: '400' }}>
            A story about loops, memory, and reality. Mapping existential queries onto technological allegories.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
        >
          {books.map((book, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="surface-card"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                alignItems: 'stretch'
              }}
            >
              {/* Cover Showcase Container */}
              <div style={{
                height: '320px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                background: '#050505',
                border: '1px solid rgba(255,255,255,0.03)',
                padding: '30px',
                boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.8)',
                zIndex: 2
              }}>
                <div style={{ width: '180px', height: '260px', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.6))' }}>
                  {book.coverSvg}
                </div>
              </div>

              {/* Text Info */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', zIndex: 2 }}>
                <div>
                  <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                    {book.volume}
                  </span>
                  <h3 className="font-heading" style={{ fontSize: '20px', marginBottom: '12px' }}>
                    {book.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                    {book.description}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '16px', marginTop: 'auto' }}>
                  <button
                    onClick={() => setActiveBook(book)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.02)'}
                  >
                    <Eye size={15} /> Read Online
                  </button>
                  <a
                    href={book.pdfUrl}
                    download={book.title + ".pdf"}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      background: 'rgba(255, 255, 255, 0.02)',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.02)'}
                  >
                    <Download size={15} /> Download PDF
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Full-Screen PDF Reader Overlay */}
      <AnimatePresence>
        {activeBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: '#050505',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Reader Header */}
            <div style={{
              height: '70px',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#0E0E11'
            }}>
              <div>
                <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block' }}>
                  {activeBook.volume} READER
                </span>
                <h3 className="font-heading" style={{ fontSize: '16px', margin: 0 }}>
                  {activeBook.title}
                </h3>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <a
                  href={activeBook.pdfUrl}
                  download={activeBook.title + ".pdf"}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '12px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.02)'}
                >
                  <Download size={14} /> Download
                </a>
                <button
                  onClick={() => setActiveBook(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-primary)',
                    padding: '8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.03)'}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Reader Embed Content */}
            <div style={{ flex: 1, position: 'relative', width: '100%', background: '#050505' }}>
              <iframe
                src={activeBook.pdfUrl + "#toolbar=0&navpanes=0&scrollbar=1"}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title={activeBook.title}
              />
              
              {/* Responsive mobile support message */}
              <div style={{
                position: 'absolute',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#0E0E11',
                border: '1px solid var(--border-subtle)',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '12px',
                color: 'var(--text-secondary)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                pointerEvents: 'none',
                zIndex: 10,
                textAlign: 'center',
                width: 'calc(100% - 40px)',
                maxWidth: '450px'
              }}>
                If the document doesn't display,{' '}
                <a
                  href={activeBook.pdfUrl}
                  download={activeBook.title + ".pdf"}
                  style={{ color: 'var(--text-primary)', textDecoration: 'underline', pointerEvents: 'auto', fontWeight: '600' }}
                >
                  click here to download it
                </a>
                .
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AnantaShowcase;
