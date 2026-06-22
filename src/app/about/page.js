"use client";

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navigation from '../../components/Navigation';
import AboutSection from '../../components/AboutSection';
import ContactFooter from '../../components/ContactFooter';
import userData from '../../../userProfileData.json';

export default function AboutPage() {
  const profileData = userData?.userProfileData;

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Scroll to top on mount
    window.scrollTo(0, 0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ background: '#050505', minHeight: '100vh', position: 'relative' }}>
      <Navigation />

      {/* Spacer to push content below fixed navigation */}
      <div style={{ height: '100px' }} />

      <AboutSection userData={profileData} />

      <ContactFooter userData={profileData} />
    </div>
  );
}
