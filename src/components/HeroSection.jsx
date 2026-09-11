"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import FlipText from './ui/flip-text';
import userData from '../../userProfileData.json';

const HeroSection = () => {
  const containerRef = useRef(null);
  const kickerRef = useRef(null);
  const wordsRef = useRef([]);
  const contentBodyRef = useRef(null);

  const headlineText = "Building systems that learn. Creating narratives that";
  const wordsArray = headlineText.split(" ");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (kickerRef.current) gsap.set(kickerRef.current, { opacity: 1, y: 0 });
      if (wordsRef.current) gsap.set(wordsRef.current, { opacity: 1, y: 0 });
      if (contentBodyRef.current) gsap.set(contentBodyRef.current, { opacity: 1, y: 0 });
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
      // 3 & 4. Supporting paragraph + CTA buttons fade up together with no separate delay
      .fromTo(
        contentBodyRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 },
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
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '0 32px', width: '100%' }}>
        <div style={{ maxWidth: '820px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

          {/* 1. Kicker line */}
          <div
            ref={kickerRef}
            className="font-sans"
            style={{
              fontSize: '13px',
              fontWeight: '500',
              color: 'var(--color-secondary, #5B7B9A)',
              letterSpacing: '0.04em',
              marginBottom: '24px',
              opacity: 0
            }}
          >
            Ahmedabad, India — AI Engineer & Author
          </div>

          {/* 2. Headline with GSAP word stagger + Vengeance UI FlipText brass accent */}
          <h1
            className="font-serif"
            style={{
              fontSize: 'clamp(38px, 5.2vw, 62px)',
              fontWeight: '300',
              lineHeight: '1.18',
              letterSpacing: '-0.02em',
              color: 'var(--color-text, #EDEAE0)',
              marginBottom: '32px',
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

          {/* 3 & 4. Supporting paragraph + CTA buttons (fade up together) */}
          <div ref={contentBodyRef} style={{ opacity: 0, width: '100%' }}>
            <p
              className="font-serif"
              style={{
                fontSize: '17px',
                fontWeight: '300',
                lineHeight: '1.65',
                color: 'rgba(237, 234, 224, 0.75)',
                maxWidth: '620px',
                marginBottom: '40px'
              }}
            >
              Het Kikani crafts high-performance full-stack architectures, integrates predictive machine learning models, and authors sci-fi literature exploring recursive identity and thermodynamic decay.
            </p>

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
      </div>
    </section>
  );
};

export default HeroSection;
