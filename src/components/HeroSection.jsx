"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Send, Download, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import FlipText from './ui/flip-text';
import userData from '../../userProfileData.json';

const HeroSection = () => {
  const containerRef = useRef(null);
  const kickerRef = useRef(null);
  const wordsRef = useRef([]);
  const contentBodyRef = useRef(null);
  const rightColRef = useRef(null);

  const profilePicture = userData?.userProfileData?.personalInfo?.profilePicture || "/images/profile.png";
  const socialLinks = userData?.userProfileData?.personalInfo?.socialLinks || {};

  const headlineText = "Building systems that learn. Creating narratives that";
  const wordsArray = headlineText.split(" ");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (kickerRef.current) gsap.set(kickerRef.current, { opacity: 1, y: 0 });
      if (wordsRef.current) gsap.set(wordsRef.current, { opacity: 1, y: 0 });
      if (contentBodyRef.current) gsap.set(contentBodyRef.current, { opacity: 1, y: 0 });
      if (rightColRef.current) gsap.set(rightColRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Kicker line fades up first
      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
      // 2. Headline reveals word-by-word stagger
      .fromTo(
        wordsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.045 },
        "-=0.3"
      )
      // 3 & 4. Supporting paragraph + CTA buttons + Right Column fade up together
      .fromTo(
        [contentBodyRef.current, rightColRef.current],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--color-base, #13151C)',
        color: 'var(--color-text, #EDEAE0)',
        padding: '140px 0 100px',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '0 32px', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: '56px',
          alignItems: 'center'
        }} className="hero-grid">

          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

            {/* 1. Kicker line */}
            <div
              ref={kickerRef}
              className="font-sans"
              style={{
                fontSize: '13px',
                fontWeight: '500',
                color: 'var(--color-secondary, #5B7B9A)',
                letterSpacing: '0.04em',
                marginBottom: '20px',
                opacity: 0
              }}
            >
              Ahmedabad, India — AI Engineer & Author
            </div>

            {/* 2. Headline with GSAP word stagger + Vengeance UI FlipText brass accent */}
            <h1
              className="font-serif"
              style={{
                fontSize: 'clamp(32px, 3.8vw, 50px)',
                fontWeight: '300',
                lineHeight: '1.22',
                letterSpacing: '-0.02em',
                color: 'var(--color-text, #EDEAE0)',
                marginBottom: '24px',
                textAlign: 'left'
              }}
            >
              {wordsArray.map((word, idx) => (
                <span
                  key={idx}
                  ref={(el) => (wordsRef.current[idx] = el)}
                  style={{ display: 'inline-block', opacity: 0, marginRight: '0.28em' }}
                >
                  {word}
                </span>
              ))}
              <span style={{ display: 'inline-block' }}>
                <FlipText
                  className="font-serif font-normal"
                  duration={2.2}
                  loop={true}
                >
                  explore memory, loops, and entropy.
                </FlipText>
              </span>
            </h1>

            {/* 3 & 4. Supporting paragraph + CTA buttons */}
            <div ref={contentBodyRef} style={{ opacity: 0, width: '100%' }}>
              <p
                className="font-serif"
                style={{
                  fontSize: '16px',
                  fontWeight: '300',
                  lineHeight: '1.65',
                  color: 'rgba(237, 234, 224, 0.75)',
                  maxWidth: '540px',
                  marginBottom: '20px'
                }}
              >
                Het Kikani crafts high-performance full-stack architectures, integrates predictive machine learning models, and authors sci-fi literature exploring recursive identity and thermodynamic decay.
              </p>

              {/* Education Trajectory Status Lines */}
              <div
                className="font-sans"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '12.5px',
                  color: 'rgba(237, 234, 224, 0.85)',
                  background: 'rgba(28, 31, 43, 0.5)',
                  borderLeft: '2px solid var(--color-secondary, #5B7B9A)',
                  padding: '10px 16px',
                  borderRadius: '0 4px 4px 0',
                  maxWidth: '540px',
                  marginBottom: '28px',
                  lineHeight: '1.5'
                }}
              >
                <div>
                  <span style={{ color: 'var(--color-accent, #B8862F)', fontWeight: '600', marginRight: '6px' }}>• Currently:</span>
                  <span>Pursuing B.E. Computer Science Engineering (Data Science) @ SAL College of Engineering/GTU</span>
                </div>
                <div>
                  <span style={{ color: '#5B7B9A', fontWeight: '600', marginRight: '6px' }}>✓ Previously:</span>
                  <span>Diploma in Computer Engineering @ LJ Polytechnic</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                <a
                  href="#work"
                  className="font-sans"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '12px 28px',
                    borderRadius: '4px',
                    background: 'var(--color-text, #EDEAE0)',
                    color: 'var(--color-base, #13151C)',
                    fontSize: '13px',
                    fontWeight: '500',
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    transition: 'background 0.25s ease, transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--color-text, #EDEAE0)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  View Work
                </a>

                <a
                  href="#books"
                  className="font-sans"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '12px 28px',
                    borderRadius: '4px',
                    background: 'transparent',
                    color: 'var(--color-accent, #B8862F)',
                    border: '1px solid rgba(184, 134, 47, 0.35)',
                    fontSize: '13px',
                    fontWeight: '500',
                    letterSpacing: '0.02em',
                    textDecoration: 'none',
                    transition: 'border-color 0.25s ease, background 0.25s ease, transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent, #B8862F)';
                    e.currentTarget.style.background = 'rgba(184, 134, 47, 0.06)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(184, 134, 47, 0.35)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Read Ananta Duology
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Profile Frame & Cards */}
          <div
            ref={rightColRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              width: '100%',
              maxWidth: '280px',
              margin: '0 auto',
              opacity: 0
            }}
            className="hero-right-col"
          >
            {/* Profile Photo Frame */}
            <div style={{
              width: '100%',
              height: '270px',
              borderRadius: '6px',
              background: 'var(--color-panel, #1C1F2B)',
              border: '1px solid var(--border-subtle)',
              padding: '10px',
              position: 'relative',
              boxShadow: '0 16px 36px rgba(0,0,0,0.4)',
              overflow: 'hidden'
            }}>
              <img
                src={profilePicture}
                alt="Het Kikani"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                  borderRadius: '4px',
                  display: 'block'
                }}
              />
            </div>

            {/* Quick Actions & Resume */}
            <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
              <a
                href="#contact"
                className="font-sans"
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: 'rgba(237, 234, 224, 0.03)',
                  color: 'var(--color-text, #EDEAE0)',
                  padding: '9px 12px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-strong)',
                  fontSize: '11px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'background 0.25s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(237, 234, 224, 0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(237, 234, 224, 0.03)'}
              >
                Contact <Send size={11} />
              </a>

              <a
                href="/Het_Kikani_Resume.pdf"
                download
                className="font-sans"
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: 'rgba(237, 234, 224, 0.03)',
                  color: 'var(--color-text, #EDEAE0)',
                  padding: '9px 12px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-strong)',
                  fontSize: '11px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'background 0.25s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(237, 234, 224, 0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(237, 234, 224, 0.03)'}
              >
                Resume <Download size={11} />
              </a>
            </div>

            {/* Social Icons Row */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              {[
                { icon: <Github size={14} />, url: socialLinks?.github },
                { icon: <Linkedin size={14} />, url: socialLinks?.linkedin },
                { icon: <Twitter size={14} />, url: socialLinks?.twitter },
                { icon: <Instagram size={14} />, url: socialLinks?.instagram }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid var(--border-subtle)',
                    background: 'rgba(237, 234, 224, 0.02)',
                    color: 'var(--color-secondary, #5B7B9A)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-text, #EDEAE0)';
                    e.currentTarget.style.borderColor = 'var(--color-secondary, #5B7B9A)';
                    e.currentTarget.style.background = 'rgba(91, 123, 154, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-secondary, #5B7B9A)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.background = 'rgba(237, 234, 224, 0.02)';
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>

            {/* 2 Impact Metric Cards Below Image */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '100%' }}>
              <div style={{
                background: 'var(--color-panel, #1C1F2B)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '10px 12px',
                textAlign: 'center'
              }}>
                <div className="font-sans" style={{ fontSize: '17px', fontWeight: '600', color: 'var(--color-text, #EDEAE0)', marginBottom: '2px' }}>
                  3+
                </div>
                <div className="font-sans" style={{ fontSize: '10px', color: 'var(--color-secondary, #5B7B9A)', letterSpacing: '0.02em' }}>
                  Years Training
                </div>
              </div>

              <div style={{
                background: 'var(--color-panel, #1C1F2B)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                padding: '10px 12px',
                textAlign: 'center'
              }}>
                <div className="font-sans" style={{ fontSize: '17px', fontWeight: '600', color: 'var(--color-text, #EDEAE0)', marginBottom: '2px' }}>
                  13+
                </div>
                <div className="font-sans" style={{ fontSize: '10px', color: 'var(--color-secondary, #5B7B9A)', letterSpacing: '0.02em' }}>
                  Projects Built
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 868px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-right-col {
            margin-top: 20px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
