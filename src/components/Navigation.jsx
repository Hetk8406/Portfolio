import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Work', href: '/#work' },
    { name: 'Books', href: '/#books' },
    { name: 'Concepts', href: '/#concept' },
    { name: 'Contact', href: '/#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '12px 40px' : '20px 40px',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(10, 10, 11, 0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent'
      }}
    >
      <div style={{ maxWidth: '1040px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/#home" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontSize: '15px', fontWeight: '500', letterSpacing: '0.05em', fontFamily: 'JetBrains Mono, monospace' }}>
          HET<span style={{ color: 'var(--text-secondary)', opacity: 0.4 }}>.</span>K
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '32px' }} className="nav-links-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="nav-link"
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '1.2px'
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
          className="mobile-toggle"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: scrolled ? '60px' : '76px',
              left: 0,
              right: 0,
              background: 'var(--bg-dark-900)',
              borderBottom: '1px solid var(--border-subtle)',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              padding: '24px 40px',
              gap: '16px'
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontFamily: 'JetBrains Mono, monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  padding: '6px 0'
                }}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-links-desktop { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navigation;
