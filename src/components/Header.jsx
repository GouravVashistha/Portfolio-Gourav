import React, { useState, useEffect } from 'react';
import { Mail, Phone, Menu, X, Terminal } from 'lucide-react';

const Github = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['home', 'journey', 'skills', 'projects', 'certs', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'services', label: 'Services' },
    { id: 'journey', label: 'Career Journey' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'certs', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4 rgba(7, 10, 19, 0.8) border-b border-white/5 backdrop-blur-md' : 'py-6 bg-transparent'}`}
      style={{
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        backgroundColor: isScrolled ? 'rgba(7, 10, 19, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-highlight)' }}>
          <Terminal size={20} className="text-green" style={{ color: 'var(--color-green)' }} />
          <span>Gourav<span style={{ color: 'var(--color-green)' }}>.dev()</span></span>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'none', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                color: activeSection === link.id ? 'var(--color-green)' : 'var(--text-secondary)',
                position: 'relative',
                padding: '0.25rem 0'
              }}
              className="nav-link-hover"
            >
              {link.label}
              {activeSection === link.id && (
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'var(--color-green)',
                  boxShadow: 'var(--glow-green-sm)',
                  borderRadius: '2px'
                }} />
              )}
            </a>
          ))}
        </nav>

        {/* Social / Contact Icons */}
        <div style={{ display: 'none', gap: '1rem', alignItems: 'center' }} className="desktop-socials">
          <a href="mailto:gvashistha4@gmail.com" title="Email Gourav" style={{ color: 'var(--text-secondary)', hover: { color: 'var(--color-green)' } }} className="social-icon">
            <Mail size={18} />
          </a>
          <a href="tel:+919518443458" title="Call Gourav" style={{ color: 'var(--text-secondary)' }} className="social-icon">
            <Phone size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" style={{ color: 'var(--text-secondary)' }} className="social-icon">
            <Linkedin size={18} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub" style={{ color: 'var(--text-secondary)' }} className="social-icon">
            <Github size={18} />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          aria-label="Toggle Menu"
          style={{
            display: 'block',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}
          className="mobile-toggle-btn"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--glass-border)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            backdropFilter: 'blur(20px)',
            zIndex: 49
          }}
        >
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: activeSection === link.id ? 'var(--color-green)' : 'var(--text-secondary)',
                paddingBottom: '0.25rem',
                borderBottom: activeSection === link.id ? '1px solid var(--color-green)' : '1px solid transparent'
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
            <a href="mailto:gvashistha4@gmail.com" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={18} /> Email
            </a>
            <a href="tel:+919518443458" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={18} /> Call
            </a>
          </div>
        </div>
      )}

      {/* Inject custom CSS for responsive desktop nav layout (since we are not using tailwind, we write simple styles) */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .desktop-socials { display: flex !important; }
          .mobile-toggle-btn { display: none !important; }
        }
        .nav-link-hover {
          transition: color 0.2s ease;
        }
        .nav-link-hover:hover {
          color: var(--color-green) !important;
        }
        .social-icon {
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255,255,255,0.05);
        }
        .social-icon:hover {
          color: var(--color-green) !important;
          background: rgba(0, 230, 118, 0.08);
          border-color: var(--color-green);
          box-shadow: var(--glow-green-sm);
          transform: translateY(-2px);
        }
      `}</style>
    </header>
  );
}
