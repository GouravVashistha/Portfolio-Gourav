import React, { useState, useEffect } from 'react';
import { Terminal, Download, Shield, Play, Cpu, Server, Activity, ArrowRight } from 'lucide-react';
import profilePhoto from '../assets/gourav_photo.png'; // Futuristic version of Photo.jpg

export default function Hero() {
  const [uptime, setUptime] = useState(0);
  const [cpuLoad, setCpuLoad] = useState(8);
  const [ramUsage, setRamUsage] = useState(42);
  const [typedRole, setTypedRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [counters, setCounters] = useState({ years: 0, companies: 0, projects: 0, coverage: 0 });
  const [logs, setLogs] = useState([
    { time: '23:07:51', type: 'INFO', msg: 'Booting GouravVashisthaApplication context...' },
    { time: '23:07:52', type: 'INFO', msg: 'Loading candidate experience: 4.7+ years.' },
    { time: '23:07:53', type: 'INFO', msg: 'Main Stack loaded: Java, Spring Boot, Microservices, PostgreSQL' },
    { time: '23:07:54', type: 'INFO', msg: 'Orchestration profile active: Camunda BPMN workflow automation.' }
  ]);

  // Live Uptime Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const roles = [
      'Senior Software Engineer',
      'Backend Architect',
      'Microservices Specialist',
      'Full Stack Developer',
      'Enterprise App Builder',
      'Java & Spring Boot Expert'
    ];
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentRole.length) {
        setTypedRole(currentRole.slice(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setTypedRole(currentRole.slice(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex(prev => (prev + 1) % roles.length);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  // Animated counters on load
  useEffect(() => {
    const targets = { years: 47, companies: 3, projects: 10, coverage: 85 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounters({
        years: Math.floor(eased * targets.years),
        companies: Math.min(Math.floor(eased * targets.companies), targets.companies),
        projects: Math.floor(eased * targets.projects),
        coverage: Math.floor(eased * targets.coverage)
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  // System stats simulator
  useEffect(() => {
    const statsTimer = setInterval(() => {
      setCpuLoad(Math.floor(Math.random() * 15) + 3);
      setRamUsage(prev => {
        const diff = Math.floor(Math.random() * 3) - 1;
        const next = prev + diff;
        return Math.max(40, Math.min(next, 45));
      });
    }, 4000);
    return () => clearInterval(statsTimer);
  }, []);

  // Meaningful scrolling info logs
  useEffect(() => {
    const infoMessages = [
      'INFO - EY: Completed legacy GraphQL to Spring Boot REST migration.',
      'INFO - EY: Designed 10+ Camunda BPMN workflows (workload reduced ~80%).',
      'INFO - EY: Achieving ~85% code coverage with JUnit and Mockito.',
      'INFO - Infinite: Maintained Spring Boot microservices for Turbify.',
      'INFO - Infinite: Built Jenkins jobs automation, saving 20% effort.',
      'INFO - Capgemini: Optimized banking transactions with scoped redirects.',
      'INFO - Capgemini: SOAP to REST v2 microservice migration completed.',
      'INFO - AWS profile checked: Cloud Practitioner certified.',
      'INFO - Database state: Connected to PostgreSQL & MySQL clusters.',
      'INFO - SOLID principles & Design patterns validated: 100% compliance.'
    ];
    
    const logsTimer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const randomMsg = infoMessages[Math.floor(Math.random() * infoMessages.length)];
      
      setLogs(prev => [
        ...prev.slice(-4), // keep last 5 logs
        { time: timeStr, type: 'CORE', msg: randomMsg }
      ]);
    }, 5000);

    return () => clearInterval(logsTimer);
  }, []);

  const formatUptime = (seconds) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const handleDownloadResume = () => {
    // Generate a clean text file representing Gourav's Resume
    const resumeContent = `GOURAV VASHISTHA - SENIOR SOFTWARE ENGINEER
Email: gvashistha4@gmail.com | Phone: +91-9518443458
Location: Bangalore, KA, India

TECHNICAL SUMMARY:
* 4.7+ years of experience specializing in Java (8, 11), Spring Boot, Hibernate, JPA, Microservices, and REST APIs.
* Advanced expertise in Workflow Automation (Camunda BPMN) and CI/CD pipelines (Jenkins, Git).
* Full Stack development capabilities utilizing Javascript, React.js, and basic Angular.

PROFESSIONAL EXPERIENCE:
1. EY (Ernst & Young) - Senior Software Engineer (Aug 2025 - Present)
   - Migrating legacy GraphQL system to RESTful Spring Boot microservices.
   - Built 10+ Camunda BPMN workflows, reducing manual workload by ~80% and failure rate by ~30%.
   - Achieved 85% code coverage using JUnit/Mockito.
2. Infinite Computer Solutions - Software Engineer (Oct 2024 - Aug 2025)
   - Maintained Java & Spring Boot backend services for Turbify.
   - Created Jenkins automation jobs, saving 20% manual effort.
3. Capgemini Technology Services - Software Engineer (Nov 2021 - Oct 2024)
   - Full stack Java J2EE & React.js developer for Banking-Group projects.
   - Migrated SOAP to REST APIs and Spring MVC applications to Java 1.8.

EDUCATION:
* Bachelor of Engineering in Computer Engineering, Echelon Institute of Technology (2017-2021) - 7.78 CGPA.

CERTIFICATIONS:
* AWS Certified Cloud Practitioner
* Spring Boot Specialist (IOC, DI, Microservices)
* Frontend Development in React (Coursera - HKUST)

---
Download generated from online portfolio at: http://localhost:5173/`;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Gourav_Vashistha_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="home" className="section-padding" style={{ position: 'relative', overflow: 'hidden', paddingTop: '8.5rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      {/* Background Glowing Orbs */}
      <div className="bg-glow-orb bg-glow-orb-green" />
      <div className="bg-glow-orb bg-glow-orb-cyan" />

      {/* Grid Pattern Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="grid-2" style={{ alignItems: 'center' }}>
          {/* Left Column: Hero Text */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0, 230, 118, 0.08)', border: '1px solid rgba(0, 230, 118, 0.2)', padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '1.5rem' }}>
              <span className="status-dot green" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-green)', letterSpacing: '0.05em' }}>
                4.7+ YEARS • JAVA & SPRING BOOT EXPERT
              </span>
            </div>
            
            <h1 className="glitch-name" data-text="Hi, I'm Gourav Vashistha" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1rem', fontFamily: 'var(--font-sans)', position: 'relative' }}>
              Hi, I'm Gourav Vashistha
            </h1>
            
            <h2 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.8rem)', color: 'var(--color-cyan)', fontWeight: 600, marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', minHeight: '2.5rem' }}>
              {typedRole}<span className="typewriter-cursor">|</span>
            </h2>

            {/* Animated Stats Row */}
            <div className="stats-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { value: counters.years, suffix: '+', label: 'Months Exp', color: 'var(--color-green)' },
                { value: counters.companies, suffix: '', label: 'Companies', color: 'var(--color-cyan)' },
                { value: counters.projects, suffix: '+', label: 'Projects', color: 'var(--color-amber)' },
                { value: counters.coverage, suffix: '%', label: 'Test Coverage', color: 'var(--color-purple)' }
              ].map((stat, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${stat.color}30`,
                  borderRadius: '10px',
                  padding: '0.6rem 1rem',
                  textAlign: 'center',
                  minWidth: '90px',
                  boxShadow: `0 0 12px ${stat.color}15`
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 800, color: stat.color, lineHeight: 1 }}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', maxWidth: '540px' }}>
              I design and build <strong>high-performance backend systems</strong>, scalable microservices, and enterprise-grade applications. Helping <strong>businesses & startups</strong> turn ideas into reliable, production-ready software.
            </p>

            {/* Floating Tech Stack Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {[
                { name: 'Java 11', color: 'var(--color-cyan)' },
                { name: 'Spring Boot', color: 'var(--color-green)' },
                { name: 'Microservices', color: 'var(--color-green)' },
                { name: 'PostgreSQL', color: 'var(--color-cyan)' },
                { name: 'React.js', color: 'var(--color-cyan)' },
                { name: 'AWS', color: 'var(--color-amber)' },
                { name: 'Camunda', color: 'var(--color-amber)' },
                { name: 'Jenkins', color: 'var(--color-purple)' },
              ].map((tech, i) => (
                <span key={tech.name} className="tech-badge-pill" style={{
                  animationDelay: `${i * 0.2}s`,
                  borderColor: `${tech.color}40`,
                  color: tech.color,
                  boxShadow: `0 0 8px ${tech.color}20`
                }}>
                  {tech.name}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button onClick={handleDownloadResume} className="hero-btn primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Download size={16} /> Download Resume
              </button>
              <a href="#projects" className="hero-btn secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={16} /> View My Projects <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Profile Headshot + Server Dashboard */}
          <div className="floating" style={{ animationDuration: '8s' }} className="hero-right-container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Row combining Avatar + Quick Details */}
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }} className="avatar-stats-row">
                <div className="profile-frame">
                  <img src={profilePhoto} alt="Gourav Vashistha Avatar" className="profile-img-element" />
                </div>
                
                {/* Stats panel adjacent to photo */}
                <div className="glass-panel" style={{ padding: '1.25rem', flexGrow: 1, minWidth: '180px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CURRENT ROLE</span>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-highlight)' }}>Senior Engineer @ EY</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>LOCATION</span>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--text-highlight)' }}>Bangalore, India</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CORE METRIC</span>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--color-green)' }}>~80% workload reduced</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* JVM Stats Console */}
              <div className="glass-panel scanlines" style={{ padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.08)', position: 'relative' }}>
                {/* Header bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Server size={16} style={{ color: 'var(--color-green)' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    springboot-production-server
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.25rem 0.6rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span className="status-dot green" style={{ width: '6px', height: '6px' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-green)' }}>ONLINE</span>
                  </div>
                </div>

                {/* Server Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                      <Cpu size={12} /> ENGINE LOAD
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-cyan)' }}>
                      {cpuLoad}% <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-secondary)' }}>/ 100%</span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                      <Activity size={12} /> RAM (JVM HEAP)
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-green)' }}>
                      {ramUsage}% <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--text-secondary)' }}>of 8GB</span>
                    </div>
                  </div>
                </div>

                {/* Uptime Stat */}
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                    <Shield size={12} /> SYSTEM UPTIME
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-highlight)' }}>
                    {formatUptime(uptime)}
                  </div>
                </div>

                {/* Console Logs Simulator */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
                    <span>Project Delivery Console</span>
                    <span style={{ color: 'var(--color-green)' }}>● Stream Active</span>
                  </div>
                  <div style={{
                    background: '#040710',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '6px',
                    padding: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    height: '140px',
                    overflowY: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}>
                    {logs.map((log, index) => (
                      <div key={index} style={{ display: 'flex', gap: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <span style={{ color: 'var(--text-muted)' }}>[{log.time}]</span>
                        <span style={{ color: log.type === 'CORE' ? 'var(--color-cyan)' : 'var(--color-green)', fontWeight: 600 }}>{log.type}</span>
                        <span style={{ color: 'rgba(255,255,255,0.85)' }}>{log.msg}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      <style>{`
        .typewriter-cursor {
          display: inline-block;
          color: var(--color-green);
          animation: blink-cursor 0.8s step-end infinite;
          font-weight: 300;
          margin-left: 2px;
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-btn {
          padding: 0.85rem 1.75rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .hero-btn.primary {
          background-color: var(--color-green);
          color: #070a13;
          border: 1px solid var(--color-green);
          box-shadow: var(--glow-green-sm);
        }
        .hero-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--glow-green-lg);
          background-color: #00ff80;
        }
        .hero-btn.secondary {
          background-color: rgba(255, 255, 255, 0.03);
          color: var(--text-primary);
          border: 1px solid var(--glass-border);
        }
        .hero-btn.secondary:hover {
          transform: translateY(-2px);
          background-color: rgba(255, 255, 255, 0.08);
          border-color: rgba(255,255,255,0.2);
        }
        @media (max-width: 768px) {
          .hero-right-container {
            margin-top: 3rem;
          }
          .avatar-stats-row {
            justify-content: center;
          }
          .stats-row {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
