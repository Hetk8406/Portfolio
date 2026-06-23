import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Globe, X, ExternalLink, Cpu, Layers } from 'lucide-react';
import Link from 'next/link';
import WordReveal from './WordReveal';

const ProjectsGallery = ({ userData, limit }) => {
  const repositories = userData?.github?.repositories || [];

  // Local state for active detail modal
  const [activeProject, setActiveProject] = useState(null);

  // Categories Filtering
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Web Apps", "Mobile Apps", "Data Science"];

  // Index-based mock details with screenshot lists
  const projectMocks = [
    {
      // Index 0 → repositories[0] (currently "QuantCore")
      image: "quantcore.png",
      fit: "cover",
      position: "center",
      impact: "Algorithmic forecasting of equity prices using sequence regression models.",
      tags: ["Python", "LSTM", "Pandas", "Scikit-Learn"],
      demoUrl: null,
      screenshots: ["quantcore.png"], // Add screenshots here later
      fullDescription: "An advanced algorithmic forecasting engine designed to predict equity price movements in the Indian Stock Market. Built using Deep Learning LSTM sequence models, the system processes historical tick data, computes volatility metrics, and runs predictive regressions to map trading signals."
    },
    {
      // Index 1 → repositories[1] (currently "LegalPal")
      image: "legalpal.png",
      fit: "cover",
      position: "center",
      impact: "Full-stack legal assistant platform built with high-throughput inference nodes.",
      tags: ["React", "Python", "FastAPI", "LLM Integration"],
      // demoUrl: "https://lawyerai.vercel.app",
      screenshots: [
        "legalpal-dashboard.png",
        "legalpal-chat.png",
        "legalpal-chat2.png",
        "legalpal-chatAI.png",
        "legalpal-ChatAI2.png",
        "legalpal-docanalzer.png",
        "legalpal-docanalzer (2).png",
        "legalpal-IPCpage.png",
        "legalpal-mocktrail.png"
      ],
      fullDescription: "A complete full-stack infrastructure for the LegalPal legal assistance assistant. Integrates high-throughput inference nodes with customized legal context indexing, allowing lawyers and clients to draft contracts, analyze statutes, and query regulations with high precision."
    },
    {
      // Index 2 → repositories[2] (currently "FoundIt!")
      image: null,
      fit: "cover",
      position: "center",
      impact: "Distributed architecture for categorizing and mapping lost assets.",
      tags: ["JavaScript", "HTML", "Node.js", "Express"],
      demoUrl: null,
      screenshots: [],
      fullDescription: "A distributed lost-and-found system designed for large campuses. Employs categorizing networks and real-time mapping databases to report, index, match, and return lost assets securely and efficiently."
    },
    {
      // Index 3 → repositories[3] (currently "ConceptLens")
      image: null,
      fit: "cover",
      position: "center",
      impact: "Visual exploration node framework to map concept relationships.",
      tags: ["React", "D3.js", "GraphDB", "TailwindCSS"],
      demoUrl: null,
      screenshots: [],
      fullDescription: "An interactive, visual concept-mapping node network. Allows researchers to input text datasets and automatically generate node-relationship schemas using Graph databases and dynamic D3.js physics renders."
    },
    {
      // Index 4 → repositories[4] (currently "Finora")
      image: "finora-logo.png",
      fit: "contain",
      position: "center",
      impact: "Comprehensive personal finance and budget management mobile app.",
      tags: ["React Native", "Expo", "SQLite", "Chart.js"],
      demoUrl: null,
      screenshots: [
        "finora-logo.png",
        "finora-page1.png",
        "finora-page2.png"
      ],
      fullDescription: "A modern personal finance and expense tracking mobile application designed to help users structure budgets, track expenses, and visualize financial habits in real-time. Employs secure local storage capabilities, custom categorization, budget capping alert thresholds, and interactive graphical analytics outputs."
    },
    {
      // Index 5 → repositories[5] (currently "Bank Marketing Predictor")
      image: "DS1-Portuguese.png",
      fit: "cover",
      position: "center",
      impact: "Classifying and predicting client subscription conversion rates for banking campaigns.",
      tags: ["Python", "Scikit-Learn", "XGBoost", "SMOTE", "Seaborn"],
      demoUrl: null,
      screenshots: [
        "DS1-Portuguese.png"
      ],
      fullDescription: "A high-performance machine learning classifier designed to predict client subscriptions to long-term deposits for a Portuguese banking institution. The system leverages extensive socio-economic datasets, resolves class imbalance using SMOTE techniques, trains ensemble classifiers (Random Forests, XGBoost, and LightGBM), and delivers actionable campaign insights using SHAP explainability matrices."
    }
  ];

  // Merge repositories with mock config
  const projects = repositories.map((repo, idx) => ({
    ...repo,
    mock: projectMocks[idx] || { image: null, fit: "cover", position: "center", impact: repo.description, tags: [], screenshots: [], fullDescription: repo.description }
  }));

  // Apply limit or filters
  const displayedProjects = limit
    ? projects.slice(0, limit)
    : activeCategory === "All"
      ? projects
      : projects.filter(p => p.category === activeCategory);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <section id="work" style={{ padding: '120px 0', borderBottom: '1px solid var(--border-subtle)', background: '#050505' }}>
      <div className="container">

        {/* Header Title */}
        <div style={{ textAlign: 'center', marginBottom: limit ? '60px' : '40px' }}>
          <span className="section-tag">Engineering Showcase</span>
          <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: '1.1', marginBottom: '16px' }}>
            <WordReveal text="Projects" />
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
            Curated systems, libraries, and experimental architectures.
          </p>
        </div>

        {/* Project Bifurcation Filters (Hide on homepage summary) */}
        {!limit && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '56px'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '100px',
                  border: activeCategory === cat ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.06)',
                  background: activeCategory === cat ? 'rgba(0, 240, 255, 0.08)' : 'rgba(255, 255, 255, 0.01)',
                  color: activeCategory === cat ? '#00f0ff' : 'var(--text-secondary)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Grid List */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '32px'
          }}
          className="projects-grid"
        >
          {displayedProjects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </motion.div>

        {/* Dynamic Empty State for filters */}
        {displayedProjects.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 0',
            color: 'var(--text-muted)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '13px'
          }}>
            [ NO PROJECTS DEPLOYED IN THIS CATEGORY YET ]
          </div>
        )}

        {/* View All Button on Homepage */}
        {limit && repositories.length > limit && (
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <Link
              href="/projects"
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
              View All Projects
            </Link>
          </div>
        )}
      </div>

      {/* Immersive Project Modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectDetailModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

// Simplified Project Card
const ProjectCard = ({ project, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const details = project.mock;
  const hasImage = details.image && !imgError;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
      }}
      onClick={onClick}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        cursor: 'pointer'
      }}
    >
      <motion.div
        className="surface-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          height: '100%',
          position: 'relative'
        }}
        whileHover={{ y: -6, borderColor: 'rgba(0, 240, 255, 0.2)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Project Image Area */}
        <div style={{
          height: '220px',
          background: '#080808',
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.04)',
          overflow: 'hidden',
          zIndex: 2,
          position: 'relative'
        }}>
          {hasImage ? (
            <img
              src={`/images/projects/${details.image}`}
              alt={project.name}
              onError={() => setImgError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: details.fit || 'cover',
                objectPosition: details.position || 'center',
                display: 'block'
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #0A0A0D 0%, #0E0E12 100%)',
            }}>
              <span className="font-mono" style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.12)',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                {project.name}
              </span>
            </div>
          )}
        </div>

        {/* Metadata */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
          <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {project.role}
          </span>
          <span className="font-mono" style={{ fontSize: '10px', color: '#00f0ff', background: 'rgba(0,240,255,0.05)', border: '1px solid rgba(0,240,255,0.1)', borderRadius: '4px', padding: '2px 8px' }}>
            {project.category}
          </span>
        </div>

        {/* Info */}
        <div style={{ flex: 1, zIndex: 2 }}>
          <h3 className="font-heading" style={{ fontSize: '20px', marginBottom: '8px' }}>
            {project.name}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
            {details.impact}
          </p>
          <span className="font-mono" style={{ fontSize: '10px', color: '#00f0ff', opacity: 0.8, letterSpacing: '0.5px', display: 'block' }}>
            &gt; Click to explore project details
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto', zIndex: 2 }}>
          {details.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="font-mono"
              style={{
                fontSize: '10px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '4px',
                padding: '2px 8px',
                color: 'var(--text-muted)'
              }}
            >
              {tag}
            </span>
          ))}
          {project.languages && Object.keys(project.languages).slice(0, 3).map((lang, lIdx) => (
            <span
              key={`lang-${lIdx}`}
              className="font-mono"
              style={{
                fontSize: '10px',
                background: 'rgba(0, 240, 255, 0.03)',
                border: '1px solid rgba(0, 240, 255, 0.1)',
                borderRadius: '4px',
                padding: '2px 8px',
                color: '#00f0ff'
              }}
            >
              {lang}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Immersive Detail Modal Component
const ProjectDetailModal = ({ project, onClose }) => {
  const details = project.mock;
  const hasScreenshots = details.screenshots && details.screenshots.length > 0;

  const [activeImageIndex, setActiveImageIndex] = useState(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % details.screenshots.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + details.screenshots.length) % details.screenshots.length);
      } else if (e.key === 'Escape') {
        setActiveImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, details.screenshots.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5, 5, 5, 0.95)',
        backdropFilter: 'blur(12px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <motion.div
        data-lenis-prevent
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '800px',
          maxHeight: '90vh',
          background: '#0E0E12',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
          overflowY: 'auto',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--text-primary)',
            padding: '8px',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.08)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.03)'}
        >
          <X size={18} />
        </button>

        {/* Cover Image Block */}
        <div style={{
          height: '300px',
          position: 'relative',
          background: '#07070a',
          overflow: 'hidden'
        }}>
          {details.image ? (
            <img
              src={`/images/projects/${details.image}`}
              alt={project.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #0A0A0D 0%, #15151F 100%)'
            }} />
          )}

          {/* Title Layer Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 30%, #0E0E12 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end',
            padding: '30px'
          }}>
            <span className="font-mono" style={{ fontSize: '11px', color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
              {project.category} / {project.role}
            </span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: '800', color: 'var(--text-primary)' }}>
              {project.name}
            </h2>
          </div>
        </div>

        {/* Details Grid Body */}
        <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '40px'
          }} className="modal-grid">

            {/* Left: Full Narrative */}
            <div>
              <h3 className="font-heading" style={{ fontSize: '18px', marginBottom: '12px', color: 'var(--text-primary)' }}>
                About Project
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
                {details.fullDescription}
              </p>
            </div>

            {/* Right: Specs & Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Tech Stack Spec List */}
              <div>
                <h4 className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Cpu size={12} /> Tech Stack
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {details.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono"
                      style={{
                        fontSize: '11px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '4px',
                        padding: '4px 10px',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Language Composition Spec List */}
              {project.languages && Object.keys(project.languages).length > 0 && (
                <div>
                  <h4 className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Layers size={12} /> Language Composition
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {Object.entries(project.languages).map(([lang, pct], lIdx) => (
                      <span
                        key={lIdx}
                        className="font-mono"
                        style={{
                          fontSize: '11px',
                          background: 'rgba(0, 240, 255, 0.03)',
                          border: '1px solid rgba(0, 240, 255, 0.15)',
                          borderRadius: '4px',
                          padding: '4px 10px',
                          color: '#00f0ff'
                        }}
                      >
                        {lang}: {pct}%
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
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
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.06)'}
                    onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.02)'}
                  >
                    <Github size={15} /> Source Code <ExternalLink size={12} />
                  </a>
                )}

                {details.demoUrl && (
                  <a
                    href={details.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px',
                      borderRadius: '8px',
                      background: '#00f0ff',
                      color: '#050505',
                      textDecoration: 'none',
                      fontSize: '13px',
                      fontWeight: '700',
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.target.style.opacity = '1'}
                  >
                    <Globe size={15} /> Live Demo <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Screenshots Sub-Gallery */}
          {hasScreenshots && (
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '30px' }}>
              <h4 className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={12} /> Screenshots & Demos (Click to view full size)
              </h4>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '16px'
              }}>
                {details.screenshots.map((src, sIdx) => (
                  <div
                    key={sIdx}
                    onClick={() => setActiveImageIndex(sIdx)}
                    style={{
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.04)',
                      overflow: 'hidden',
                      height: '140px',
                      background: '#07070a',
                      cursor: 'zoom-in',
                      transition: 'border-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.25)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'}
                  >
                    <img
                      src={`/images/projects/${src}`}
                      alt={`Screenshot ${sIdx + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </motion.div>

      {/* Immersive Lightbox / Zoom Overlay */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(3, 3, 5, 0.98)',
              zIndex: 1200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'zoom-out'
            }}
            onClick={() => setActiveImageIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => { e.stopPropagation(); setActiveImageIndex(null); }}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'var(--text-primary)',
                padding: '10px',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((prev) => (prev - 1 + details.screenshots.length) % details.screenshots.length);
              }}
              style={{
                position: 'absolute',
                left: '24px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'var(--text-primary)',
                padding: '16px',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>&larr;</span>
            </button>

            {/* Centered Large Image */}
            <motion.div
              key={activeImageIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ maxWidth: '85vw', maxHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`/images/projects/${details.screenshots[activeImageIndex]}`}
                alt={`Screenshot ${activeImageIndex + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.9)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
              />
              <div style={{
                textAlign: 'center',
                color: 'var(--text-secondary)',
                marginTop: '20px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px',
                letterSpacing: '1px'
              }}>
                {activeImageIndex + 1} / {details.screenshots.length} (Use Left / Right Arrow keys)
              </div>
            </motion.div>

            {/* Right navigation arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImageIndex((prev) => (prev + 1) % details.screenshots.length);
              }}
              style={{
                position: 'absolute',
                right: '24px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: 'var(--text-primary)',
                padding: '16px',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>&rarr;</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 600px) {
          .modal-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ProjectsGallery;
