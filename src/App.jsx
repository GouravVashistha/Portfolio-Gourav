import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WorkflowJourney from './components/WorkflowJourney';
import SkillsDashboard from './components/SkillsDashboard';
import ProjectConsole from './components/ProjectConsole';
import Certifications from './components/Certifications';
import ContactForm from './components/ContactForm';
import { Terminal, Mail } from 'lucide-react';
import Services from './components/Services';

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

// ─── Animated Particle Network Background ────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.5 + 0.5, op: Math.random() * 0.4 + 0.1
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,230,118,${p.op})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${0.07 * (1 - dist / 120)})`; ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none', opacity: 0.6 }} />;
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorClicked, setCursorClicked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [bangaloreTime, setBangaloreTime] = useState('');

  // Always scroll to top on first load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Back-to-top visibility
  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Live Bangalore time (IST = UTC+5:30)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000;
      const ist = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + istOffset);
      const h = ist.getHours().toString().padStart(2, '0');
      const m = ist.getMinutes().toString().padStart(2, '0');
      const s = ist.getSeconds().toString().padStart(2, '0');
      setBangaloreTime(`🕐 IST ${h}:${m}:${s}`);
    };
    updateTime();
    const t = setInterval(updateTime, 1000);
    return () => clearInterval(t);
  }, []);

  // Custom cursor
  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
    };
    const hideCursor = () => setCursorVisible(false);
    const clickCursor = () => {
      setCursorClicked(true);
      setTimeout(() => setCursorClicked(false), 300);
    };
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseleave', hideCursor);
    window.addEventListener('click', clickCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', hideCursor);
      window.removeEventListener('click', clickCursor);
    };
  }, []);

  // Welcome toast for recruiters
  useEffect(() => {
    const t1 = setTimeout(() => setShowToast(true), 1500);
    const t2 = setTimeout(() => setToastVisible(true), 1600);
    const t3 = setTimeout(() => setToastVisible(false), 6000);
    const t4 = setTimeout(() => setShowToast(false), 6600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <>
      {/* Background Decorative Glow Grid (Fixed across page scroll) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(12, 17, 34, 0.9) 0%, rgba(7, 10, 19, 1) 100%)',
        zIndex: -2,
        pointerEvents: 'none'
      }} />

      {/* Particle Network Canvas */}
      <ParticleField />

      {/* Scroll Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: '3px',
        background: 'linear-gradient(90deg, var(--color-green), var(--color-cyan))',
        boxShadow: '0 0 10px var(--color-green), 0 0 20px var(--color-cyan)',
        zIndex: 9999,
        transition: 'width 0.1s ease',
        borderRadius: '0 2px 2px 0'
      }} />

      {/* Custom Neon Cursor */}
      <div style={{
        position: 'fixed',
        left: cursorPos.x,
        top: cursorPos.y,
        width: cursorClicked ? '40px' : '20px',
        height: cursorClicked ? '40px' : '20px',
        borderRadius: '50%',
        border: '2px solid var(--color-green)',
        boxShadow: cursorClicked ? '0 0 20px var(--color-green), 0 0 40px var(--color-cyan)' : '0 0 8px var(--color-green)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9998,
        opacity: cursorVisible ? 1 : 0,
        transition: 'width 0.2s ease, height 0.2s ease, box-shadow 0.2s ease, opacity 0.3s ease',
        mixBlendMode: 'difference'
      }} />
      <div style={{
        position: 'fixed',
        left: cursorPos.x,
        top: cursorPos.y,
        width: '5px',
        height: '5px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-green)',
        boxShadow: '0 0 6px var(--color-green)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: cursorVisible ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }} />

      {/* Welcome Recruiter Toast */}
      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 99999,
          background: 'rgba(7, 10, 19, 0.95)',
          border: '1px solid rgba(0, 230, 118, 0.4)',
          borderRadius: '14px',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
          maxWidth: '300px',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 30px rgba(0,230,118,0.15), 0 20px 60px rgba(0,0,0,0.5)',
          transform: toastVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          opacity: toastVisible ? 1 : 0,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>👨‍💻</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--text-highlight)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
              Welcome!
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Gourav builds <span style={{ color: 'var(--color-green)', fontWeight: 600 }}>scalable systems</span> for businesses & startups.<br/>Let's create something great together! 🚀
            </div>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <Header />

      {/* Live Bangalore time strip */}
      <div style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        zIndex: 9990,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: 'var(--color-green)',
        background: 'rgba(7,10,19,0.85)',
        border: '1px solid rgba(0,230,118,0.2)',
        padding: '0.3rem 0.75rem',
        borderRadius: '50px',
        backdropFilter: 'blur(10px)',
        letterSpacing: '0.05em',
        boxShadow: '0 0 10px rgba(0,230,118,0.1)'
      }}>
        {bangaloreTime}
      </div>

      {/* Back to Top Button */}
      {showBackTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 9990,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-green), var(--color-cyan))',
            border: 'none',
            color: '#070a13',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(0,230,118,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            animation: 'bounce-in 0.3s ease'
          }}
          title="Back to top"
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,230,118,0.7)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,230,118,0.4)'; }}
        >
          ↑
        </button>
      )}
      
      <main>
        <Hero />
        <Services />
        <WorkflowJourney />
        <SkillsDashboard />
        <ProjectConsole />
        <Certifications />
        <ContactForm />
      </main>

      {/* Styled Footer */}
      <footer style={{
        backgroundColor: '#05070e',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '3rem 0 2rem 0',
        position: 'relative',
        zIndex: 5
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            {/* Logo */}
            <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-highlight)' }}>
              <Terminal size={20} style={{ color: 'var(--color-green)' }} />
              <span>Gourav<span style={{ color: 'var(--color-green)' }}>.dev()</span></span>
            </a>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '500px' }}>
              Designed and developed with React &amp; Vanilla CSS variables. Orchestrating high-performance Java microservices &amp; automated workflows.
            </p>

            {/* Social Links Row */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="mailto:gvashistha4@gmail.com" className="footer-social-icon" title="Email">
                <Mail size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" title="GitHub">
                <Github size={16} />
              </a>
            </div>

            <div style={{
              width: '100%',
              borderTop: '1px solid rgba(255,255,255,0.03)',
              paddingTop: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <span>© {new Date().getFullYear()} Gourav Vashistha. All rights reserved.</span>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <a href="#journey" className="footer-link-hover">Career Journey</a>
                <a href="#skills" className="footer-link-hover">Skills</a>
                <a href="#projects" className="footer-link-hover">Projects</a>
                <a href="#contact" className="footer-link-hover">Contact</a>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .footer-social-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.05);
            color: var(--text-secondary);
            transition: all 0.2s ease;
          }
          .footer-social-icon:hover {
            color: var(--color-green);
            background: rgba(0, 230, 118, 0.05);
            border-color: var(--color-green);
            transform: translateY(-2px);
          }
          .footer-link-hover {
            transition: color 0.2s ease;
          }
          .footer-link-hover:hover {
            color: var(--color-green);
          }
        `}</style>
      </footer>
    </>
  );
}

export default App;
