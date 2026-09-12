"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TechStackSection = ({ userData }) => {
  const techStack = [
    {
      name: "React.js",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#5B7B9A" strokeWidth="1.5">
          <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(0 12 12)" />
          <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(60 12 12)" />
          <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="#5B7B9A" />
        </svg>
      )
    },
    {
      name: "Tailwind CSS",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#5B7B9A" strokeWidth="1.5">
          <path d="M12 6.094C9.11 3.516 5.56 3.516 3.5 6.094c-2.43 3.047-2.01 7.234 1.5 9.047 3.51 1.813 6.99.308 9-2.094 2.89 2.578 6.44 2.578 8.5 0 2.43-3.047 2.01-7.234-1.5-9.047-3.51-1.813-6.99-.308-9 2.094Z" />
        </svg>
      )
    },
    {
      name: "JavaScript",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#5B7B9A" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M10 15a2 2 0 0 1-2-2v-1M14 11.5v.75a1.5 1.5 0 0 0 1.5 1.5h.5a1.5 1.5 0 0 1 1.5 1.5v.75A1.5 1.5 0 0 1 16 17" />
        </svg>
      )
    },
    {
      name: "HTML / CSS",
      category: "Frontend / Web",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#5B7B9A" strokeWidth="1.5">
          <path d="M4 2l1.5 17L12 22l6.5-3L20 2H4z" />
        </svg>
      )
    },
    {
      name: "Node.js & Express",
      category: "Backend",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#5B7B9A" strokeWidth="1.5">
          <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
          <path d="M12 2v20M4 7l8 5 8-5" />
        </svg>
      )
    },
    {
      name: "Python",
      category: "Backend",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#5B7B9A" strokeWidth="1.5">
          <path d="M12 2C6.5 2 6.5 4.5 6.5 4.5V7.5H12V8.25H4.25C4.25 8.25 2 8.25 2 13.75C2 19.25 4.25 19.25 4.25 19.25H6.5V16.5C6.5 16.5 6.5 13.5 9.5 13.5H15.5C15.5 13.5 17.5 13.5 17.5 11.25V5.75C17.5 5.75 17.5 2 12 2Z" />
        </svg>
      )
    },
    {
      name: "TensorFlow & PyTorch",
      category: "Data Science & AI",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#5B7B9A" strokeWidth="1.5">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" />
          <path d="M12 6v12M7 9h10" />
        </svg>
      )
    },
    {
      name: "Jupyter & Pandas",
      category: "Data Science & AI",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#5B7B9A" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v10M7 12h10" />
        </svg>
      )
    },
    {
      name: "SQL & PostgreSQL",
      category: "Database",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#5B7B9A" strokeWidth="1.5">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      )
    },
    {
      name: "MongoDB & Supabase",
      category: "Database",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#5B7B9A" strokeWidth="1.5">
          <path d="M12 2c0 0-5 4-5 9s3 6 5 11c2-5 5-7 5-11s-5-9-5-9z" />
        </svg>
      )
    },
    {
      name: "Git & GitHub",
      category: "Tools & Infra",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#5B7B9A" strokeWidth="1.5">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v6M9 15h6" />
        </svg>
      )
    },
    {
      name: "Docker & Linux",
      category: "Tools & Infra",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#5B7B9A" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 9h6v6H9z" />
        </svg>
      )
    }
  ];

  const categories = ["All", "Frontend / Web", "Backend", "Data Science & AI", "Database", "Tools & Infra"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTech = activeCategory === "All"
    ? techStack
    : techStack.filter(item => item.category === activeCategory);

  return (
    <section id="skills" style={{ padding: '100px 0', borderBottom: '1px solid var(--border-subtle)', background: 'var(--color-base, #13151C)' }}>
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '0 32px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="font-sans" style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-secondary, #5B7B9A)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>
            Toolkit & Technologies
          </span>
          <h2 className="font-serif" style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: '300', lineHeight: '1.1', marginBottom: '16px', color: 'var(--color-text, #EDEAE0)' }}>
            Tech Stack
          </h2>
          <p className="font-sans" style={{ color: 'rgba(237, 234, 224, 0.72)', fontSize: '15px', maxWidth: '520px', margin: '0 auto', fontWeight: '400', lineHeight: '1.6' }}>
            Core languages, libraries, and frameworks utilized across analytical models and web platforms.
          </p>
        </div>

        {/* Domain Filter Pills */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '48px'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="font-sans"
              style={{
                padding: '8px 18px',
                borderRadius: '4px',
                border: activeCategory === cat ? '1px solid var(--border-strong)' : '1px solid var(--border-subtle)',
                background: activeCategory === cat ? 'rgba(237, 234, 224, 0.08)' : 'rgba(237, 234, 224, 0.02)',
                color: activeCategory === cat ? 'var(--color-text, #EDEAE0)' : 'var(--color-secondary, #5B7B9A)',
                fontSize: '12px',
                fontWeight: '500',
                letterSpacing: '0.02em',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Stack Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                style={{
                  background: 'var(--color-panel, #1C1F2B)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '6px',
                  background: 'rgba(91, 123, 154, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {tech.icon}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span className="font-sans" style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text, #EDEAE0)' }}>
                    {tech.name}
                  </span>
                  <span className="font-sans" style={{ fontSize: '11px', color: 'var(--color-secondary, #5B7B9A)' }}>
                    {tech.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default TechStackSection;
