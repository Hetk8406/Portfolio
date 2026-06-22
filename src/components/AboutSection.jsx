import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import WordReveal from './WordReveal';

const AboutSection = ({ userData, limit }) => {
  const experiences = userData?.linkedin?.experience || [];
  const education = userData?.linkedin?.education || [];
  
  const skillCategories = [
    {
      title: "Data Science & AI",
      tags: ["Python", "TensorFlow", "PyTorch", "Data Analysis", "Predictive Modeling"]
    },
    {
      title: "Web Engineering",
      tags: ["React.js", "Node.js", "Express.js", "REST APIs", "Full Stack Systems"]
    },
    {
      title: "Foundational & Tooling",
      tags: ["SQL", "NoSQL", "Git", "Linux", "Data Structures"]
    }
  ];

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

  if (limit) {
    return (
      <section id="about" style={{ padding: '120px 0', borderBottom: '1px solid var(--border-subtle)', background: '#050505' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span className="section-tag">Biography</span>
          <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: '1.1', marginBottom: '32px' }}>
            <WordReveal text="About Me" />
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.8', marginBottom: '24px' }}>
            Currently pursuing a Bachelor of Engineering in Computer Science and Engineering, specializing in Data Science at Gujarat Technological University (GTU). My work exists at the intersection of engineering systems and statistical learning, with a secondary channel dedicated to philosophical sci-fi writing.
          </p>
          <div style={{ marginTop: '40px' }}>
            <Link
              href="/about"
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
              Read Full Biography
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" style={{ padding: '120px 0', borderBottom: '1px solid var(--border-subtle)', background: '#050505' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="section-tag">Biography</span>
          <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: '1.1', marginBottom: '16px' }}>
            <WordReveal text="About Me" />
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '64px',
          alignItems: 'start'
        }}>
          {/* Left Side: Story & Journey */}
          <motion.div
            variants={columnVariantsLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
          >
            <div>
              <h3 className="font-heading" style={{ fontSize: '20px', marginBottom: '16px' }}>The Trajectory</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7', marginBottom: '16px' }}>
                Currently pursuing a Bachelor of Engineering in Computer Science and Engineering, specializing in Data Science at Gujarat Technological University (GTU). 
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
                My work exists at the intersection of engineering systems and statistical learning, with a secondary channel dedicated to philosophical sci-fi writing.
              </p>
            </div>

            {/* Experience & Education Sheet */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h4 className="font-mono" style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                  Experience
                </h4>
                {experiences.map((exp, idx) => (
                  <div key={idx} style={{ paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                      <span style={{ fontSize: '15px', fontWeight: '700' }}>{exp.role}</span>
                      <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{exp.period}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>{exp.company}</div>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>{exp.description}</p>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-mono" style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
                  Education
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {education.map((edu, idx) => (
                    <div key={idx} style={{ paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                        <span style={{ fontSize: '15px', fontWeight: '700' }}>{edu.degree}</span>
                        <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{edu.period}</span>
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{edu.institution}</div>
                      {edu.grade && <div className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>{edu.grade}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Skills Pillar */}
          <motion.div
            variants={columnVariantsRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="surface-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '32px'
            }}
          >
            <h3 className="font-heading" style={{ fontSize: '20px', zIndex: 2 }}>Technical Focus</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', zIndex: 2 }}>
              {skillCategories.map((cat, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {cat.title}
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {cat.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono"
                        style={{
                          fontSize: '11px',
                          background: 'rgba(255, 255, 255, 0.03)',
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
              ))}
            </div>

            <div style={{
              marginTop: '16px',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              background: 'rgba(0,0,0,0.2)',
              zIndex: 2
            }}>
              <div className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                CURRENTLY INVESTIGATING
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Deep learning architectures, generative sequence modeling, and recursive datasets for text representation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
