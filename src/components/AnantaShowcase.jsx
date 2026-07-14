import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Download, X, ArrowLeft, ArrowRight, BookOpen, Clock, FileText, Globe } from 'lucide-react';
import Link from 'next/link';
import WordReveal from './WordReveal';

const AnantaShowcase = ({ limit }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [readingBook, setReadingBook] = useState(null);

  const books = [
    {
      id: 1,
      title: "Ananta: The Infinite Cycle",
      volume: "VOLUME 01",
      pdfUrl: "/Ananta - The Infinite Cycle.pdf",
      coverImage: "ananta-vol1.png",
      fit: "contain",
      position: "center",
      tagline: "A memory is not a recording. It is a fragile reconstruction of what once was.",
      pages: 320,
      language: "English",
      format: "PDF Edition",
      readingTime: "approx. 5 hrs",
      genres: ["Science Fiction", "Philosophical Fiction", "Reality-Bending"],
      themes: ["Memory", "Identity", "Infinite Loops", "Consciousness", "Reality"],
      description: "A deep dive into recursive loops, identity containment, and the boundaries of human recollection. Where time behaves like an unhandled loop, and memory is only a reconstruction.",
    },
    {
      id: 2,
      title: "Ananta: The Unwritten Dark",
      volume: "VOLUME 02",
      pdfUrl: "/Ananta - The Unwritten Dark.pdf",
      coverImage: "ananta-vol2.png",
      fit: "contain",
      position: "center",
      tagline: "At the end of memory erosion lies the silence between code segments.",
      pages: 290,
      language: "English",
      format: "PDF Edition",
      readingTime: "approx. 4.5 hrs",
      genres: ["Science Fiction", "Philosophical Fiction", "Reality-Bending"],
      themes: ["Consciousness", "Language", "Reality", "Meaning", "Detachment"],
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
          <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: '1.1', marginBottom: '20px' }}>
            <WordReveal text="The Ananta Duology" />
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6', fontWeight: '300' }}>
            Two connected novels exploring memory, identity, language, and the nature of reality. Begin with <span style={{ color: 'var(--text-primary)', fontWeight: '400' }}>The Infinite Cycle</span> and conclude with <span style={{ color: 'var(--text-primary)', fontWeight: '400' }}>The Unwritten Dark</span>.
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
          className="books-duology-grid"
        >
          {books.slice(0, limit || books.length).map((book, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="surface-card book-item-card"
              onClick={() => setSelectedBook(book)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                alignItems: 'stretch',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
            >
              {/* Cover Showcase Container */}
              <div style={{
                height: '340px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                background: '#0a0a0c',
                border: '1px solid var(--border-subtle)',
                padding: '20px',
                boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.8)',
                zIndex: 2,
                overflow: 'hidden',
                position: 'relative'
              }} className="book-cover-showcase">
                {book.coverImage ? (
                  <img
                    src={`/images/books/${book.coverImage}`}
                    alt={book.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      display: 'block',
                      transition: 'transform 0.4s ease'
                    }}
                    className="book-card-cover-img"
                  />
                ) : (
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
                    gap: '12px'
                  }}>
                    <span style={{ fontSize: '14px', fontFamily: 'Syne', fontWeight: 'bold', color: '#EAEAEA', letterSpacing: '2px' }}>ANANTA</span>
                    <span className="font-mono" style={{ fontSize: '8px', color: '#9CA3AF', letterSpacing: '1px' }}>
                      {book.title.split(': ')[1]?.toUpperCase() || book.title.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Text Info */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', zIndex: 2 }}>
                <div>
                  <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1.5px', display: 'block', marginBottom: '6px' }}>
                    {book.volume} // BOOK {book.id} OF DUOLOGY
                  </span>
                  <h3 className="font-heading" style={{ fontSize: '22px', marginBottom: '12px', color: 'var(--text-primary)' }}>
                    {book.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px', fontWeight: '300' }}>
                    {book.description}
                  </p>
                </div>
                
                {/* Visual Action Indicator */}
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  <span>Explore Publication Details</span>
                  <span className="indicator-arrow" style={{ transition: 'transform 0.3s ease' }}>&rarr;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {limit && books.length > limit && (
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <Link
              href="/books"
              className="editorial-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontFamily: 'JetBrains Mono, monospace',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                padding: '4px 0'
              }}
            >
              Explore Complete Duology Volumes &rarr;
            </Link>
          </div>
        )}
      </div>

      {/* Book Detail Page / Modal */}
      <AnimatePresence>
        {selectedBook && !readingBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 5, 5, 0.98)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setSelectedBook(null)}
          >
            <motion.div
              data-lenis-prevent
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                maxWidth: '1100px',
                maxHeight: '90vh',
                background: 'var(--bg-dark-900)',
                border: '1px solid var(--border-strong)',
                borderRadius: '8px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
                overflowY: 'auto',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBook(null)}
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-strong)',
                  color: 'var(--text-primary)',
                  padding: '8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  zIndex: 100,
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.08)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.02)'}
              >
                <X size={16} />
              </button>

              {/* Detail Grid Body */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '400px 1fr',
                gap: '56px',
                padding: '56px'
              }} className="book-detail-grid">
                
                {/* Left: Premium Book Cover Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{
                    background: '#09090b',
                    borderRadius: '6px',
                    border: '1px solid var(--border-subtle)',
                    padding: '30px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '480px'
                  }} className="book-detail-cover-container">
                    <img
                      src={`/images/books/${selectedBook.coverImage}`}
                      alt={selectedBook.title}
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.75))'
                      }}
                    />
                  </div>
                  
                  {/* Publication Metadata Deck */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    background: 'rgba(255, 255, 255, 0.01)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '4px',
                    padding: '16px 20px'
                  }}>
                    <span className="font-mono" style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>
                      Publication Information
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      <FileText size={12} />
                      <span>Format: {selectedBook.format} ({selectedBook.pages} Pages)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      <Globe size={12} />
                      <span>Language: {selectedBook.language}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      <Clock size={12} />
                      <span>Est. Reading Time: {selectedBook.readingTime}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Book Meta & Narrative */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    
                    {/* Header: Title and Badges */}
                    <div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                        <span className="font-mono" style={{ fontSize: '9px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-strong)', borderRadius: '4px', padding: '2px 8px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                          Book {selectedBook.id} of the Ananta Duology
                        </span>
                        {selectedBook.genres.map((g, idx) => (
                          <span key={idx} className="font-mono" style={{ fontSize: '9px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '2px 8px', color: 'var(--text-muted)' }}>
                            {g}
                          </span>
                        ))}
                      </div>
                      <h2 className="font-heading" style={{ fontSize: '38px', lineHeight: '1.1', color: 'var(--text-primary)' }}>
                        {selectedBook.title}
                      </h2>
                      <p className="font-mono" style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px', borderLeft: '2px solid var(--border-strong)', paddingLeft: '12px', fontStyle: 'italic' }}>
                        &ldquo;{selectedBook.tagline}&rdquo;
                      </p>
                    </div>

                    {/* About Book Synopsis */}
                    <div>
                      <h4 className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                        Synopsis / Overview
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7', margin: 0, fontWeight: '300', maxWidth: '620px' }}>
                        {selectedBook.description} Additional chapters explore recursive frameworks, temporal erosion, and the systemic deletion of cognitive identity across loops.
                      </p>
                    </div>

                    {/* Themes and Concepts chips */}
                    <div>
                      <h4 className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                        Themes & Core Concepts
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {selectedBook.themes.map((theme, idx) => (
                          <span
                            key={idx}
                            className="font-mono"
                            style={{
                              fontSize: '11px',
                              background: 'rgba(255, 255, 255, 0.02)',
                              border: '1px solid var(--border-subtle)',
                              borderRadius: '30px',
                              padding: '6px 14px',
                              color: 'var(--text-secondary)',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.borderColor = 'var(--text-primary)';
                              e.target.style.color = 'var(--text-primary)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.borderColor = 'var(--border-subtle)';
                              e.target.style.color = 'var(--text-secondary)';
                            }}
                          >
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions & Series Progression */}
                  <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    
                    {/* Read / Download Buttons */}
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <button
                        onClick={() => setReadingBook(selectedBook)}
                        className="btn-primary"
                        style={{
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '14px 28px',
                          borderRadius: '30px',
                          background: '#f4f4f5',
                          color: '#050505',
                          border: '1px solid #f4f4f5',
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <BookOpen size={14} /> Read Online
                      </button>
                      
                      <a
                        href={selectedBook.pdfUrl}
                        download={selectedBook.title + ".pdf"}
                        style={{
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '14px 28px',
                          borderRadius: '30px',
                          background: 'transparent',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-strong)',
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '12px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(255,255,255,0.03)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                        }}
                      >
                        <Download size={14} /> Download PDF
                      </a>
                    </div>

                    {/* Series Progression Timeline */}
                    <div style={{
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: selectedBook.id === 1 ? 'var(--text-primary)' : 'var(--text-muted)'
                        }} />
                        <div style={{ width: '40px', height: '1px', background: 'var(--border-subtle)' }} />
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: selectedBook.id === 2 ? 'var(--text-primary)' : 'var(--text-muted)'
                        }} />
                        <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginLeft: '8px' }}>
                          Duology Path
                        </span>
                      </div>

                      {selectedBook.id === 1 ? (
                        <button
                          onClick={() => setSelectedBook(books[1])}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-primary)',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '11px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <span>Continue to Volume 02</span>
                          <ArrowRight size={12} />
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedBook(books[0])}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-primary)',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '11px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          <ArrowLeft size={12} />
                          <span>Return to Volume 01</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen PDF Reader Overlay */}
      <AnimatePresence>
        {readingBook && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1100,
              background: 'var(--bg-dark-950)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Minimal Distraction-free Header */}
            <div style={{
              height: '70px',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--bg-dark-900)',
              zIndex: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={`/images/books/${readingBook.coverImage}`}
                  alt={readingBook.title}
                  style={{
                    height: '40px',
                    borderRadius: '2px',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}
                />
                <div>
                  <span className="font-mono" style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block' }}>
                    {readingBook.volume} // SYSTEM READER
                  </span>
                  <h3 className="font-heading" style={{ fontSize: '15px', margin: 0, color: 'var(--text-primary)' }}>
                    {readingBook.title}
                  </h3>
                </div>
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <a
                  href={readingBook.pdfUrl}
                  download={readingBook.title + ".pdf"}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '30px',
                    border: '1px solid var(--border-strong)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.02)'}
                >
                  <Download size={12} /> Download
                </a>
                
                <button
                  onClick={() => setReadingBook(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-primary)',
                    padding: '8px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.08)'}
                  onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.03)'}
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div style={{ flex: 1, position: 'relative', width: '100%', background: '#050505' }}>
              <iframe
                src={readingBook.pdfUrl + "#toolbar=0&navpanes=0&scrollbar=1"}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title={readingBook.title}
              />

              {/* Floating Back button */}
              <button
                onClick={() => setReadingBook(null)}
                style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '30px',
                  background: '#09090b',
                  border: '1px solid var(--border-strong)',
                  color: 'var(--text-primary)',
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono, monospace',
                  letterSpacing: '1px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                  cursor: 'pointer',
                  zIndex: 100,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={(e) => e.target.style.background = '#09090b'}
              >
                <ArrowLeft size={14} />
                <span>Back to Overview</span>
              </button>

              {/* Mobile download fallback message */}
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
                  href={readingBook.pdfUrl}
                  download={readingBook.title + ".pdf"}
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

      <style>{`
        .book-item-card:hover .book-card-cover-img {
          transform: scale(1.03) translateY(-4px);
        }
        .book-item-card:hover .indicator-arrow {
          transform: translateX(4px);
        }
        @media (max-width: 900px) {
          .book-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            padding: 30px !important;
          }
          .book-detail-cover-container {
            height: 380px !important;
          }
          .books-duology-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AnantaShowcase;
