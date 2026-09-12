"use client";

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import ProjectsGallery from '../components/ProjectsGallery';
import TechStackSection from '../components/TechStackSection';
import AnantaShowcase from '../components/AnantaShowcase';
import ContactFooter from '../components/ContactFooter';
import userData from '../../userProfileData.json';

export default function Home() {
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

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ background: '#050505', minHeight: '100vh', position: 'relative' }}>
      <Navigation />

      {/* Anchor targets for navigation links */}
      <div id="home" />
      
      <HeroSection />
      
      <ProjectsGallery userData={profileData} limit={6} />

      <TechStackSection userData={profileData} />
      
      <AnantaShowcase />
      
      <ContactFooter userData={profileData} />
    </div>
  );
}
