import React from 'react';
import { Award, Cloud, Cpu, Layout } from 'lucide-react';

export default function Certifications() {
  const certifications = [
    {
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services (AWS)',
      icon: <Cloud size={32} style={{ color: 'var(--color-purple)' }} />,
      glowClass: 'border-glow-purple',
      color: 'var(--color-purple)',
      skills: ['Cloud Architectures', 'EC2 & VPC Networking', 'AWS IAM & Security', 'Serverless Basics']
    },
    {
      title: 'Spring Boot Specialist (IOC, DI, Microservices)',
      issuer: 'Spring/Java Enterprise Standards',
      icon: <Cpu size={32} style={{ color: 'var(--color-green)' }} />,
      glowClass: 'border-glow-green',
      color: 'var(--color-green)',
      skills: ['Dependency Injection', 'Spring MVC & Data', 'Spring Security', 'Distributed Microservices']
    },
    {
      title: 'Frontend Development in React',
      issuer: 'Hong Kong University of Science and Technology (Coursera)',
      icon: <Layout size={32} style={{ color: 'var(--color-cyan)' }} />,
      glowClass: 'border-glow-cyan',
      color: 'var(--color-cyan)',
      skills: ['React Components & Hooks', 'State Management', 'Single Page Applications', 'UX/UI Integrations']
    }
  ];

  return (
    <section id="certs" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="bg-glow-orb bg-glow-orb-amber" style={{ left: '40%', top: '10%' }} />
      <div className="container">
        
        <div className="section-title-wrapper">
          <span className="section-subtitle">Credentials</span>
          <h2 className="section-title">Certifications &amp; Accreditations</h2>
          <div className="section-line" style={{ backgroundColor: 'var(--color-purple)', boxShadow: 'var(--glow-purple-sm)' }} />
          <p style={{ marginTop: '1rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Validated expertise in cloud environments, microservices design, and reactive front-end applications.
          </p>
        </div>

        <div className="grid-3">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className={`glass-panel ${cert.glowClass}`}
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                border: '1px solid var(--glass-border)'
              }}
            >
              {/* Badge Icon wrapper */}
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid rgba(255,255,255,0.06)`,
                  marginBottom: '1.5rem',
                  boxShadow: `0 0 15px rgba(${cert.color === 'var(--color-purple)' ? '175,64,255' : cert.color === 'var(--color-green)' ? '0,230,118' : '0,229,255'}, 0.1)`,
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: '-5px', right: '-5px', color: cert.color }}>
                  <Award size={18} fill={cert.color} style={{ filter: 'drop-shadow(0px 0px 4px rgba(255,255,255,0.3))' }} />
                </div>
                {cert.icon}
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-highlight)', marginBottom: '0.5rem', minHeight: '3.6rem', display: 'flex', alignItems: 'center' }}>
                {cert.title}
              </h3>
              
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1.5rem' }}>
                Issued by {cert.issuer}
              </span>

              {/* Competencies covered */}
              <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', fontWeight: 600 }}>
                  Certified Skills
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                  {cert.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
