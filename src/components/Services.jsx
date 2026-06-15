import React, { useState, useEffect, useRef } from 'react';

const services = [
  {
    icon: '⚙️',
    title: 'Backend API Development',
    subtitle: 'Java • Spring Boot • REST',
    desc: 'Scalable, secure, and high-performance REST APIs built with Java 11 & Spring Boot. From simple CRUD to complex multi-service architectures.',
    tags: ['Java 11', 'Spring Boot', 'REST APIs', 'JUnit'],
    color: 'var(--color-green)',
    glow: 'rgba(0,230,118,0.12)'
  },
  {
    icon: '🔗',
    title: 'Microservices Architecture',
    subtitle: 'Design • Deploy • Scale',
    desc: 'End-to-end microservices solutions with service discovery, API gateways, inter-service communication, and cloud deployment strategies.',
    tags: ['Microservices', 'Docker', 'Spring Cloud', 'Eureka'],
    color: 'var(--color-cyan)',
    glow: 'rgba(0,229,255,0.12)'
  },
  {
    icon: '🗄️',
    title: 'Database Design & Optimization',
    subtitle: 'PostgreSQL • MySQL • JPA',
    desc: 'Robust relational database schemas, query optimization, indexing strategies, and ORM integration using Hibernate & JPA.',
    tags: ['PostgreSQL', 'MySQL', 'Hibernate', 'JPA'],
    color: 'var(--color-amber)',
    glow: 'rgba(255,179,0,0.12)'
  },
  {
    icon: '🤖',
    title: 'Workflow & Process Automation',
    subtitle: 'Camunda BPMN • Jenkins',
    desc: 'Automate complex business workflows using Camunda BPMN engine. CI/CD pipeline setup with Jenkins to accelerate your delivery cycles.',
    tags: ['Camunda', 'BPMN', 'Jenkins', 'CI/CD'],
    color: 'var(--color-purple)',
    glow: 'rgba(175,64,255,0.12)'
  },
  {
    icon: '🖥️',
    title: 'Full Stack Web Applications',
    subtitle: 'React.js • Spring Boot',
    desc: 'Complete web applications from frontend UI in React.js to backend Spring Boot APIs — delivered as one cohesive, production-ready product.',
    tags: ['React.js', 'Spring Boot', 'PostgreSQL', 'REST'],
    color: 'var(--color-cyan)',
    glow: 'rgba(0,229,255,0.12)'
  },
  {
    icon: '🔍',
    title: 'Code Review & Consulting',
    subtitle: 'Architecture • Best Practices',
    desc: 'In-depth code reviews, architecture assessments, SOLID principles guidance, and performance bottleneck analysis for your existing codebase.',
    tags: ['SOLID', 'Design Patterns', 'HLD/LLD', 'Audit'],
    color: 'var(--color-green)',
    glow: 'rgba(0,230,118,0.12)'
  }
];

export default function Services() {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          services.forEach((_, i) => {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, i]);
            }, i * 120);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-padding" style={{ position: 'relative', backgroundColor: 'var(--bg-primary)' }}>
      <div className="bg-glow-orb bg-glow-orb-cyan" style={{ opacity: 0.07 }} />

      <div className="container">
        <div className="section-title-wrapper">
          <span className="section-subtitle">What I Build</span>
          <h2 className="section-title">Services & Expertise</h2>
          <div className="section-line" />
          <p style={{ marginTop: '1rem', maxWidth: '580px', margin: '1rem auto 0' }}>
            From backend APIs to full-stack applications — I turn complex technical requirements into clean, scalable, production-ready software.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem'
        }} className="services-grid">
          {services.map((svc, i) => (
            <div
              key={i}
              className="service-card"
              style={{
                background: `rgba(18,24,45,0.5)`,
                border: `1px solid ${svc.color}20`,
                borderRadius: '16px',
                padding: '1.75rem',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                opacity: visibleCards.includes(i) ? 1 : 0,
                transform: visibleCards.includes(i) ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                backdropFilter: 'blur(12px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${svc.color}60`;
                e.currentTarget.style.boxShadow = `0 0 30px ${svc.glow}, 0 20px 40px rgba(0,0,0,0.3)`;
                e.currentTarget.style.transform = 'translateY(-6px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `${svc.color}20`;
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Background glow blob */}
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px',
                width: '100px', height: '100px',
                background: svc.glow,
                borderRadius: '50%',
                filter: 'blur(30px)',
                pointerEvents: 'none'
              }} />

              {/* Icon */}
              <div style={{
                fontSize: '2.2rem',
                marginBottom: '1rem',
                lineHeight: 1
              }}>
                {svc.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--text-highlight)',
                marginBottom: '0.25rem'
              }}>
                {svc.title}
              </h3>
              <p style={{
                fontSize: '0.75rem',
                color: svc.color,
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                marginBottom: '0.85rem',
                letterSpacing: '0.03em'
              }}>
                {svc.subtitle}
              </p>

              {/* Description */}
              <p style={{
                fontSize: '0.875rem',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                marginBottom: '1.25rem'
              }}>
                {svc.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {svc.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.68rem',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '50px',
                    background: `${svc.color}10`,
                    border: `1px solid ${svc.color}30`,
                    color: svc.color,
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="#contact" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.9rem 2rem',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--color-green), var(--color-cyan))',
            color: '#070a13',
            fontWeight: 700,
            fontSize: '0.95rem',
            boxShadow: '0 0 25px rgba(0,230,118,0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,230,118,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 25px rgba(0,230,118,0.3)'; }}
          >
            💬 Let's Discuss Your Project
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
