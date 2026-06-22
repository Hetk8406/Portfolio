import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github } from 'lucide-react';
import Link from 'next/link';
import WordReveal from './WordReveal';

const ProjectsGallery = ({ userData, limit }) => {
  const repositories = userData?.github?.repositories || [];

  // Index-based array — order must match the repositories array in userProfileData.json.
  // Renaming a project in the JSON will NOT cause its card to disappear.
  //
  // HOW TO ADD A PROJECT IMAGE:
  //   1. Place your image in  public/images/projects/
  //   2. Set the `image` field below to the filename (e.g. "quantcore.png")
  //   3. The card will automatically display it.
  //   4. Customize `fit` ("cover", "contain", "fill") and `position` ("center", "top", etc.) to adjust alignment.
  //   If `image` is null, a dark placeholder is shown.
  const projectMocks = [
    {
      // Index 0 → repositories[0] (currently "QuantCore")
      image: "quantcore.png", // ← drop your image in public/images/projects/ and put the filename here
      fit: "cover", // Change to "contain" if you cropped your image exactly and don't want it cut off
      position: "center", // E.g., "top", "bottom", "center", "50% 20%" to adjust crop position
      impact: "Algorithmic forecasting of equity prices using sequence regression models.",
      tags: ["Python", "LSTM", "Pandas", "Scikit-Learn"],
    },
    {
      // Index 1 → repositories[1] (currently "LegalPal")
      image: "legalpal.png",
      fit: "cover",
      position: "center",
      impact: "Full-stack legal assistant platform built with high-throughput inference nodes.",
      tags: ["React", "Python", "FastAPI", "LLM Integration"],
    },
    {
      // Index 2 → repositories[2] (currently "FoundIt!")
      image: null,
      fit: "cover",
      position: "center",
      impact: "Distributed architecture for categorizing and mapping lost assets.",
      tags: ["JavaScript", "HTML", "Node.js", "Express"],
    },
    {
      // Index 3 → repositories[3] (currently "ConceptLens")
      image: null,
      fit: "cover",
      position: "center",
      impact: "Visual exploration node framework to map concept relationships.",
      tags: ["React", "D3.js", "GraphDB", "TailwindCSS"],
    }
  ];

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
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="section-tag">Engineering Showcase</span>
          <h2 className="font-heading" style={{ fontSize: 'clamp(32px, 5vw, 54px)', lineHeight: '1.1', marginBottom: '16px' }}>
            <WordReveal text="Selected Projects" />
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
            Curated systems, libraries, and experimental architectures.
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
            gap: '32px'
          }}
        >
          {repositories.slice(0, limit || repositories.length).map((project, idx) => {
            const details = projectMocks[idx];
            if (!details) return null;
            return (
              <ProjectCard
                key={idx}
                project={project}
                details={details}
              />
            );
          })}
        </motion.div>

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
    </section>
  );
};

// Sub-component to encapsulate subtle 3D spring-tilt logic per card
const ProjectCard = ({ project, details }) => {
  const [imgError, setImgError] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 25 });

  // Minimal controlled tilt limits (4 degrees max)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
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

  const hasImage = details.image && !imgError;

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        cursor: 'pointer'
      }}
    >
      <motion.div
        className="surface-card"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          height: '100%',
          position: 'relative'
        }}
        whileHover={{ y: -6 }}
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
            /* Minimal placeholder when no image is set */
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

        {/* Metadata & Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
          <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {project.role}
          </span>
          <div style={{ display: 'flex', gap: '12px' }}>
            {project.url && (
              <span
                style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
              >
                <Github size={18} />
              </span>
            )}
          </div>
        </div>

        {/* Info Text */}
        <div style={{ flex: 1, zIndex: 2 }}>
          <h3 className="font-heading" style={{ fontSize: '20px', marginBottom: '8px' }}>
            {project.name}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
            {details.impact}
          </p>
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
        </div>
      </motion.div>
    </motion.a>
  );
};

export default ProjectsGallery;
