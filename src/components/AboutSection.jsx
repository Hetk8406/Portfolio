import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X } from 'lucide-react';
import WordReveal from './WordReveal';

const AboutSection = ({ userData, limit }) => {
  const experiences = userData?.linkedin?.experience || [];
  const education = userData?.linkedin?.education || [];
  const certifications = userData?.linkedin?.certifications || [];
  
  const [activeCert, setActiveCert] = useState(null);
  
  // High-End Technologies Mock Data mapping to categories and custom SVG logos
  const techStack = [
    {
      name: "React.js",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#00f0ff" strokeWidth="1.5">
          <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(0 12 12)" />
          <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(60 12 12)" />
          <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="#00f0ff" />
        </svg>
      )
    },
    {
      name: "Tailwind CSS",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#38bdf8" strokeWidth="1.5">
          <path d="M12 6.094C9.11 3.516 5.56 3.516 3.5 6.094c-2.43 3.047-2.01 7.234 1.5 9.047 3.51 1.813 6.99.308 9-2.094 2.89 2.578 6.44 2.578 8.5 0 2.43-3.047 2.01-7.234-1.5-9.047-3.51-1.813-6.99-.308-9 2.094Z" />
        </svg>
      )
    },
    {
      name: "JavaScript",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#facc15" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M10 15a2 2 0 0 1-2-2v-1M14 11.5v.75a1.5 1.5 0 0 0 1.5 1.5h.5a1.5 1.5 0 0 1 1.5 1.5v.75A1.5 1.5 0 0 1 16 17" />
        </svg>
      )
    },
    {
      name: "HTML",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#ea580c" strokeWidth="1.5">
          <path d="M4 2l1.5 17L12 22l6.5-3L20 2H4z" />
          <path d="M12 5H7.5l.5 5h4v2H9.5l-.2-2H7l.3 5.5L12 18.5" />
          <path d="M12 5h4.5l-.5 5H12v2h2.5l-.3 3.5L12 18.5" />
        </svg>
      )
    },
    {
      name: "CSS",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#2563eb" strokeWidth="1.5">
          <path d="M4 2l1.5 17L12 22l6.5-3L20 2H4z" />
          <path d="M12 5.5H8l.5 5h3.5" />
          <path d="M12 12.5H9.5l-.2-2H7.2l.4 5.5L12 18.5" />
          <path d="M12 5.5h4l-.5 5H12" />
          <path d="M12 12.5h2.5l-.3 3.5L12 18.5" />
        </svg>
      )
    },
    {
      name: "Node.js",
      category: "Backend",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#22c55e" strokeWidth="1.5">
          <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
          <path d="M12 2v20M4 7l8 5 8-5" />
        </svg>
      )
    },
    {
      name: "Express.js",
      category: "Backend",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M7 9h4M7 12h3M7 15h4M14 9l3 6M17 9l-3 6" />
        </svg>
      )
    },
    {
      name: "Python",
      category: "Backend",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#818cf8" strokeWidth="1.5">
          <path d="M12 2C6.5 2 6.5 4.5 6.5 4.5V7.5H12V8.25H4.25C4.25 8.25 2 8.25 2 13.75C2 19.25 4.25 19.25 4.25 19.25H6.5V16.5C6.5 16.5 6.5 13.5 9.5 13.5H15.5C15.5 13.5 17.5 13.5 17.5 11.25V5.75C17.5 5.75 17.5 2 12 2Z" />
          <path d="M12 22C17.5 22 17.5 19.5 17.5 19.5V16.5H12V15.75H19.75C19.75 15.75 22 15.75 22 10.25C22 4.75 19.75 4.75 19.75 4.75H17.5V7.5C17.5 7.5 17.5 10.5 14.5 10.5H8.5C8.5 10.5 6.5 10.5 6.5 12.75V18.25C6.5 18.25 6.5 22 12 22Z" />
        </svg>
      )
    },
    {
      name: "TensorFlow",
      category: "Data Science & AI",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#f97316" strokeWidth="1.5">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
          <path d="M12 6v12M7 9h10" />
        </svg>
      )
    },
    {
      name: "PyTorch",
      category: "Data Science & AI",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#ee4c2c" strokeWidth="1.5">
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
          <path d="M12 7l4 8H8l4-8z" />
        </svg>
      )
    },
    {
      name: "SQL",
      category: "Database",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#3b82f6" strokeWidth="1.5">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      )
    },
    {
      name: "MongoDB",
      category: "Database",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#10b981" strokeWidth="1.5">
          <path d="M12 2c0 0-5 4-5 9s3 6 5 11c2-5 5-7 5-11s-5-9-5-9z" />
          <path d="M12 2v20" />
        </svg>
      )
    },
    {
      name: "Git",
      category: "Tools",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#f1502f" strokeWidth="1.5">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v6M9 15h6" />
          <path d="M18 15v-3c0-3-3-3-3-3H9" />
        </svg>
      )
    },
    {
      name: "Linux",
      category: "Tools",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
          <path d="M12 2c-3.5 0-6.5 2.5-6.5 6 0 2.5 1 3.5 1 5.5-.5.5-2 1.5-2 3s1.5 2.5 3 2.5h9c1.5 0 3-1 3-2.5s-1.5-2.5-2-3c0-2 1-3 1-5.5 0-3.5-3-6-6.5-6z" />
        </svg>
      )
    },
    {
      name: "REST API",
      category: "Tools",
      icon: (
        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#06b6d4" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3" />
          <circle cx="19" cy="5" r="2" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="5" cy="5" r="2" />
          <circle cx="19" cy="19" r="2" />
          <path d="M17 7l-3.5 3.5M7 17l3.5-3.5M7 7l3.5 3.5M17 17l-3.5-3.5" />
        </svg>
      )
    }
  ];

  // Dynamic Language Aggregation from GitHub repositories
  const githubRepos = userData?.github?.repositories || [];
  const dynamicLanguages = new Set();
  githubRepos.forEach(repo => {
    if (repo.languages) {
      Object.keys(repo.languages).forEach(lang => {
        dynamicLanguages.add(lang);
      });
    }
  });

  const staticTechNames = new Set(techStack.map(t => t.name.toLowerCase()));
  const dynamicTechItems = [];
  dynamicLanguages.forEach(lang => {
    if (!staticTechNames.has(lang.toLowerCase())) {
      dynamicTechItems.push({
        name: lang,
        category: "Languages",
        icon: (
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#00f0ff" stroke-width="1.5">
            <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 4l-4 16" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        )
      });
    }
  });

  const fullTechStack = [...techStack, ...dynamicTechItems];

  // Filtering Logic
  const categories = ["All", "Frontend / Web", "Backend", "Database", "Data Science & AI", "Tools", "Languages"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTech = activeCategory === "All"
    ? fullTechStack
    : fullTechStack.filter(item => item.category === activeCategory);

  const columnVariantsLeft = {
    hidden: { opacity: 0, x: -20, scale: 0.99 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const columnVariantsRight = {
    hidden: { opacity: 0, x: 20, scale: 0.99 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  // If in summary mode (like on homepage), AboutMe isn't shown because AboutHero handles it.
  if (limit) return null;

  return (
    <section id="about" style={{ padding: '100px 0', borderBottom: '1px solid var(--border-subtle)', background: '#050505' }}>
      <div className="container">
        
        {/* Core Timeline Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '64px',
          alignItems: 'start',
          marginBottom: '100px'
        }}>
          {/* Left Column: Biography & Background */}
          <motion.div
            variants={columnVariantsLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            <div>
              <span className="section-tag">Biography</span>
              <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.1', marginBottom: '20px' }}>
                The Trajectory
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7', marginBottom: '16px' }}>
                Currently pursuing a Bachelor of Engineering in Computer Science and Engineering, specializing in Data Science at Gujarat Technological University (GTU). 
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
                My work exists at the intersection of engineering systems and statistical learning, with a secondary channel dedicated to philosophical sci-fi writing.
              </p>
            </div>

            {/* Education Timeline */}
            <div>
              <h4 className="font-mono" style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px' }}>
                Education
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {education.map((edu, idx) => (
                  <div key={idx} style={{ paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>{edu.degree}</span>
                      <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{edu.period}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{edu.institution}</div>
                    {edu.grade && <div className="font-mono" style={{ fontSize: '11px', color: '#00f0ff', marginTop: '4px' }}>{edu.grade}</div>}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Experience Sheet */}
          <motion.div
            variants={columnVariantsRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
          >
            <span className="section-tag">Professional Timeline</span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.1', marginBottom: '20px' }}>
              Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {experiences.map((exp, idx) => (
                <div key={idx} style={{ paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>{exp.role}</span>
                    <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{exp.period}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#00f0ff', marginBottom: '10px' }}>{exp.company}</div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Separator Subtle Line */}
        <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '80px 0' }} />

        {/* Technologies Grid Section */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-tag">Technology Stack</span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: '1.1', marginBottom: '12px' }}>
              Technologies I Use
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '500px', margin: '0 auto' }}>
              Core tools and packages utilized for development, analytics, and software pipelines.
            </p>
          </div>

          {/* Technology Filters */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '48px'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '100px',
                  border: activeCategory === cat ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.06)',
                  background: activeCategory === cat ? 'rgba(0, 240, 255, 0.08)' : 'rgba(255, 255, 255, 0.01)',
                  color: activeCategory === cat ? '#00f0ff' : 'var(--text-secondary)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat) {
                    e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.target.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat) {
                    e.target.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.target.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <motion.div
            layout
            className="tech-stack-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '24px'
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredTech.map((tech) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={tech.name}
                  className="surface-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '30px 20px',
                    textAlign: 'center',
                    gap: '16px',
                    minHeight: '180px'
                  }}
                  whileHover={{ y: -6, borderColor: 'rgba(0, 240, 255, 0.25)' }}
                >
                  {/* Icon Circle Frame */}
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: '#07070a',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.5)'
                  }}>
                    {tech.icon}
                  </div>

                  {/* Title & Info */}
                  <div>
                    <h4 className="font-heading" style={{ fontSize: '15px', fontWeight: '700', margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                      {tech.name}
                    </h4>
                    <span className="font-mono" style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {tech.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>

        {/* Certifications Section */}
        {certifications.length > 0 && (
          <>
            <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '80px 0' }} />
            <div>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <span className="section-tag">Credentials</span>
                <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: '1.1', marginBottom: '12px' }}>
                  Licenses & Specializations
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '500px', margin: '0 auto' }}>
                  Verified certifications and academic completions.
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '24px'
              }}>
                {certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    className="surface-card"
                    onClick={() => setActiveCert(cert)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      padding: '24px',
                      justifyContent: 'space-between',
                      minHeight: '180px',
                      cursor: 'pointer'
                    }}
                    whileHover={{ y: -6, borderColor: 'rgba(0, 240, 255, 0.25)' }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                        <div style={{
                          padding: '8px',
                          borderRadius: '8px',
                          background: 'rgba(0, 240, 255, 0.05)',
                          border: '1px solid rgba(0, 240, 255, 0.1)',
                          color: '#00f0ff'
                        }}>
                          <Award size={18} />
                        </div>
                        {cert.link && cert.link !== '#' && (
                          <a href={cert.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: 'var(--text-muted)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}>
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                      <h4 className="font-heading" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
                        {cert.name}
                      </h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>
                        {cert.issuer}
                      </p>
                      <span className="font-mono" style={{ fontSize: '9px', color: '#00f0ff', opacity: 0.8, marginTop: '12px', display: 'block' }}>
                        &gt; Click to view details
                      </span>
                    </div>
                    <div className="font-mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {cert.date}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>

      {/* Certifications Modal Overlay */}
      <AnimatePresence>
        {activeCert && (
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
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              data-lenis-prevent
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                maxWidth: '640px',
                background: '#0E0E12',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
                overflow: 'hidden',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCert(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--text-primary)',
                  padding: '8px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <X size={16} />
              </button>

              {/* Certificate Image Area */}
              <div style={{
                height: activeCert.image && activeCert.image.toLowerCase().endsWith('.pdf') ? '450px' : '280px',
                background: '#07070a',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: activeCert.image && activeCert.image.toLowerCase().endsWith('.pdf') ? '0' : '20px'
              }}>
                {activeCert.image ? (
                  activeCert.image.toLowerCase().endsWith('.pdf') ? (
                    <iframe
                      src={`/images/certificates/${activeCert.image}`}
                      title={activeCert.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none'
                      }}
                    />
                  ) : (
                    <img
                      src={`/images/certificates/${activeCert.image}`}
                      alt={activeCert.name}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        borderRadius: '4px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                      }}
                    />
                  )
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    background: 'linear-gradient(135deg, #0A0A0D 0%, #15151F 100%)',
                    borderRadius: '8px'
                  }}>
                    <Award size={36} style={{ color: 'rgba(0, 240, 255, 0.15)' }} />
                    <span className="font-mono" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.12)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                      [ Certificate Image Pending ]
                    </span>
                  </div>
                )}
              </div>

              {/* Certificate Info Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <span className="font-mono" style={{ fontSize: '10px', color: '#00f0ff', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '6px' }}>
                    {activeCert.issuer}
                  </span>
                  <h3 className="font-heading" style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
                    {activeCert.name}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                    {activeCert.description || "No description provided."}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '16px' }}>
                  <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    COMPLETED: {activeCert.date}
                  </span>

                  {activeCert.link && activeCert.link !== '#' && (
                    <a
                      href={activeCert.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        background: '#00f0ff',
                        color: '#050505',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: '700',
                        transition: 'opacity 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                      onMouseLeave={(e) => e.target.style.opacity = '1'}
                    >
                      Verify Credentials <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive adjustments for tech grid and filters */}
      <style>{`
        @media (max-width: 540px) {
          .tech-stack-grid {
            grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)) !important;
            gap: 12px !important;
          }
        }
      `}</style>

    </section>
  );
};

export default AboutSection;
