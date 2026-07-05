import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Download, X } from 'lucide-react';
import Link from 'next/link';
import WordReveal from './WordReveal';

const AnantaShowcase = ({ limit }) => {
  const [activeBook, setActiveBook] = useState(null);

  // HOW TO ADD A BOOK COVER IMAGE:
  //   1. Place your cover image in  public/images/books/
  //   2. Set the `coverImage` field below to the filename (e.g. "ananta-vol1.jpg")
  //   3. The card will automatically display it.
  //   4. Customize `fit` ("contain", "cover") and `position` to adjust alignment.
  //   If `coverImage` is null, a styled text placeholder is shown.
  const books = [
    {
      title: "Ananta: The Infinite Cycle",
      volume: "VOLUME 01",
      pdfUrl: "/Ananta - The Infinite Cycle.pdf",
      coverImage: "ananta-vol1.png", // ← drop your cover in public/images/books/ and put the filename here
      fit: "contain", // Use "contain" so the cover isn't cropped, or change to "cover" depending on choice
      position: "center",
      description: "A deep dive into recursive loops, identity containment, and the boundaries of human recollection. Where time behaves like an unhandled loop, and memory is only a reconstruction.",
    },
    {
      title: "Ananta: The Unwritten Dark",
      volume: "VOLUME 02",
      pdfUrl: "/Ananta - The Unwritten Dark.pdf",
      coverImage: "ananta-vol2.png",
      fit: "contain",
      position: "center",
      description: "Exploring the edge of memory erosion, the silence between code segments, and the final state of empty information. An existential sci-fi narrative mapping reality onto entropy.",
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
    <section id="books" style={{ padding: '120px 0', borderBottom: '1px solid var(--border-subtle)', background: '#050505' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="section-tag">Sci-Fi Duology</span>
          <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: '1.1', marginBottom: '16px' }}>
            <WordReveal text="Books" />
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
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '48px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
        >
          {books.slice(0, limit || books.length).map((book, idx) => (
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
                borderRadius: '4px',
                background: '#050505',
                border: '1px solid rgba(255,255,255,0.03)',
                padding: book.coverImage ? '0' : '30px',
                boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.8)',
                zIndex: 2,
                overflow: 'hidden'
              }}>
                {book.coverImage ? (
                  <img
                    src={`/images/books/${book.coverImage}`}
                    alt={book.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: book.fit || 'contain',
                      objectPosition: book.position || 'center',
                      display: 'block'
                    }}
                  />
                ) : (
                  /* Styled text placeholder when no cover image is set */
                  <div style={{
                    width: '180px',
                    height: '260px',
                    background: '#0C0C0F',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.6))'
                  }}>
                    <span style={{ fontSize: '14px', fontFamily: 'Syne', fontWeight: 'bold', color: '#EAEAEA', letterSpacing: '2px' }}>ANANTA</span>
                    <span className="font-mono" style={{ fontSize: '8px', color: '#9CA3AF', letterSpacing: '1px' }}>
                      {book.title.split(': ')[1]?.toUpperCase() || book.title.toUpperCase()}
                    </span>
                    <span className="font-mono" style={{ fontSize: '7px', color: '#52525B', letterSpacing: '3px' }}>
                      {book.volume.replace('VOLUME ', 'VOL. ')}
                    </span>
                  </div>
                )}
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
                      borderRadius: '4px',
                      border: '1px solid var(--border-strong)',
                      background: 'rgba(255, 255, 255, 0.01)',
                      color: 'var(--text-primary)',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <Eye size={14} /> Read Online
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
                      borderRadius: '4px',
                      border: '1px solid var(--border-strong)',
                      background: 'rgba(255, 255, 255, 0.01)',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: '500',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <Download size={14} /> Download PDF
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {limit && books.length > limit && (
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <Link
              href="/books"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 26px',
                borderRadius: '4px',
                border: '1px solid var(--border-strong)',
                background: 'rgba(255, 255, 255, 0.01)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '12px',
                fontFamily: 'JetBrains Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.04)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.01)';
              }}
            >
              View All Volumes
            </Link>
          </div>
        )}
      </div>

      {/* Full-Screen PDF Reader Overlay */}
      <AnimatePresence>
        {activeBook && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'var(--bg-dark-950)',
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
              background: 'var(--bg-dark-900)'
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
                If the document doesn&apos;t display,{' '}
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
