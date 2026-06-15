import React, { useState } from 'react';
import { Server, Database, Code, ShieldAlert, Cpu, GitBranch, Layers, Command } from 'lucide-react';

export default function SkillsDashboard() {
  const [selectedSkill, setSelectedSkill] = useState('spring-boot');

  const categories = [
    {
      id: 'backend',
      title: 'Backend & Core',
      icon: <Server size={18} style={{ color: 'var(--color-green)' }} />,
      color: 'var(--color-green)',
      skills: [
        { id: 'java', name: 'Java (8, 11)', level: 'Advanced', applied: 'Core programming language used extensively across Capgemini, Infinite, and EY. Applied JVM optimizations, streams, concurrency, and functional delegates.' },
        { id: 'spring-boot', name: 'Spring Boot', level: 'Advanced', applied: 'Primary backend framework. Built scalable microservices, REST APIs, custom filters, security configurations, and exception handlers (EY & Infinite).' },
        { id: 'hibernate', name: 'Hibernate / JPA', level: 'Advanced', applied: 'Database object-relational mapping, transactional scopes, criteria queries, entity mapping, and optimizing query performance.' },
        { id: 'microservices', name: 'Microservices', level: 'Advanced', applied: 'Designed modular, highly-scalable architectures. Orchestrated communication via REST/SOAP (Capgemini) and Camunda (EY).' }
      ]
    },
    {
      id: 'databases',
      title: 'Databases & Servers',
      icon: <Database size={18} style={{ color: 'var(--color-cyan)' }} />,
      color: 'var(--color-cyan)',
      skills: [
        { id: 'postgresql', name: 'PostgreSQL', level: 'Advanced', applied: 'Implemented in personal projects (E-Bug Tracker, Vote Management) and production cleanup workflows. Wrote complex procedures and indexing.' },
        { id: 'mysql', name: 'MySQL', level: 'Intermediate', applied: 'Relational data modeling, schema designing, transaction queries, and performance tuning for production services.' },
        { id: 'tomcat', name: 'Apache Tomcat', level: 'Intermediate', applied: 'Used as the primary application server for hosting enterprise Java and Spring MVC deployments.' }
      ]
    },
    {
      id: 'frontend',
      title: 'Frontend Web Dev',
      icon: <Code size={18} style={{ color: 'var(--color-cyan)' }} />,
      color: 'var(--color-cyan)',
      skills: [
        { id: 'react', name: 'React.js', level: 'Intermediate', applied: 'Utilized for Capgemini L&D J2EE full-stack training (Rank 2) and developed reactive, modular user interfaces for personal projects (Vote Management).' },
        { id: 'javascript', name: 'JavaScript (ES6+)', level: 'Advanced', applied: 'Wrote dynamic scripts, DOM manipulation logic, and API call pipelines in Capgemini banking web forms.' },
        { id: 'angular', name: 'Angular (Basic)', level: 'Basic', applied: 'Maintained and updated legacy template views, binding variables, and simple directives for banking dashboards.' }
      ]
    },
    {
      id: 'concepts',
      title: 'Architecture & Concepts',
      icon: <Layers size={18} style={{ color: 'var(--color-purple)' }} />,
      color: 'var(--color-purple)',
      skills: [
        { id: 'solid', name: 'SOLID / Design Patterns', level: 'Advanced', applied: 'Ensured clean, maintainable code structure applying Singleton, Factory, Strategy, and Builder design patterns.' },
        { id: 'hld-lld', name: 'HLD & LLD Design', level: 'Intermediate', applied: 'Contributed to architecture discussions, drafted schema diagrams, API layouts, and service blueprints.' },
        { id: 'rest-apis', name: 'RESTful Web Services', level: 'Advanced', applied: 'Designed contract-first REST APIs, migrated GraphQL queries to REST microservices for American Express at EY.' }
      ]
    },
    {
      id: 'automation',
      title: 'DevOps & Automation',
      icon: <Command size={18} style={{ color: 'var(--color-amber)' }} />,
      color: 'var(--color-amber)',
      skills: [
        { id: 'camunda', name: 'Camunda BPMN', level: 'Advanced', applied: 'Engineered 10+ workflow processes on EY ACE platform. Wrote service tasks, Java delegates, event listeners, and retry handlers to save 80% manual labor.' },
        { id: 'jenkins', name: 'Jenkins CI/CD', level: 'Intermediate', applied: 'Created CI/CD jobs at Infinite to automate domain-deprovisioning tasks, saving 20% manual execution effort.' },
        { id: 'git', name: 'Git / Version Control', level: 'Advanced', applied: 'Managed code integration, gitflow branching strategy, PR reviews, merge resolutions, and release tagging.' }
      ]
    }
  ];

  // Helper to find selected skill details
  const getSkillDetails = () => {
    for (const cat of categories) {
      const skill = cat.skills.find(s => s.id === selectedSkill);
      if (skill) return { ...skill, category: cat.title, color: cat.color };
    }
    return null;
  };

  const selected = getSkillDetails();

  return (
    <section id="skills" className="section-padding" style={{ position: 'relative' }}>
      <div className="bg-glow-orb bg-glow-orb-green" style={{ right: '10%', top: '30%' }} />
      <div className="container">
        
        <div className="section-title-wrapper">
          <span className="section-subtitle">Technical Competence</span>
          <h2 className="section-title">Skills &amp; Expertise</h2>
          <div className="section-line" style={{ backgroundColor: 'var(--color-cyan)', boxShadow: 'var(--glow-cyan-sm)' }} />
          <p style={{ marginTop: '1rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Broad backend expertise combined with workflow automation and modern web stacks. Click on any skill to read its implementation details.
          </p>
        </div>

        <div className="grid-2 skills-main-grid">
          {/* Left Grid: Skills Categories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {categories.map((category) => (
              <div key={category.id} className="glass-panel" style={{ padding: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  {category.icon}
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-highlight)' }}>
                    {category.title}
                  </h3>
                </div>

                <div className="skills-category-grid">
                  {category.skills.map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => setSelectedSkill(skill.id)}
                      className={`skill-tag ${selectedSkill === skill.id ? 'active' : ''}`}
                      style={{
                        '--skill-color': category.color,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        padding: '0.75rem 1rem',
                        background: selectedSkill === skill.id ? `rgba(${category.color === 'var(--color-green)' ? '0,230,118' : category.color === 'var(--color-cyan)' ? '0,229,255' : category.color === 'var(--color-purple)' ? '175,64,255' : '255,179,0'}, 0.08)` : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${selectedSkill === skill.id ? category.color : 'rgba(255, 255, 255, 0.08)'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        width: '100%'
                      }}
                    >
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: selectedSkill === skill.id ? 'var(--text-highlight)' : 'rgba(255,255,255,0.85)' }}>
                        {skill.name}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        {skill.level}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Panel: Selected Skill Live Analysis */}
          <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            {selected && (
              <div className="glass-panel" style={{ padding: '2rem', borderTop: `4px solid ${selected.color}`, position: 'relative', overflow: 'hidden' }}>
                {/* Decorative brackets background */}
                <div style={{ position: 'absolute', right: '-10px', bottom: '-20px', fontSize: '8rem', color: 'rgba(255,255,255,0.02)', fontFamily: 'var(--font-mono)', pointerEvents: 'none', fontWeight: 900 }}>
                  {"{}"}
                </div>

                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {selected.category} / Evaluation
                </span>
                
                <h3 style={{ fontSize: '1.75rem', color: 'var(--text-highlight)', margin: '0.5rem 0' }}>
                  {selected.name}
                </h3>
                
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.04)', padding: '0.25rem 0.6rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem', fontWeight: 600, color: selected.color, marginBottom: '1.5rem' }}>
                  <span className="status-dot" style={{ backgroundColor: selected.color, width: '6px', height: '6px' }} />
                  Level: {selected.level}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                    Production Application
                  </h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.6, background: '#05070e', border: '1px solid rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px', fontFamily: 'var(--font-sans)' }}>
                    {selected.applied}
                  </p>
                </div>

                {/* Mock code block related to selected skill */}
                <div>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                    System Signature
                  </h4>
                  <div style={{ background: '#040710', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-cyan)' }}>
                    {selected.id === 'camunda' && (
                      <pre style={{ margin: 0, color: 'var(--color-amber)' }}>
{`@Component
public class CamundaDelegate implements JavaDelegate {
  @Override
  public void execute(DelegateExecution exec) {
    // reduce manual workload by 80%
    log.info("Optimizing workflow process");
  }
}`}
                      </pre>
                    )}
                    {selected.id === 'spring-boot' && (
                      <pre style={{ margin: 0, color: 'var(--color-green)' }}>
{`@SpringBootApplication
@EnableMicroservices
public class PortfolioService {
  public static void main(String[] args) {
    SpringApplication.run(PortfolioService.class, args);
  }
}`}
                      </pre>
                    )}
                    {selected.id === 'react' && (
                      <pre style={{ margin: 0, color: 'var(--color-cyan)' }}>
{`export default function Skills() {
  const [active, setActive] = useState(true);
  return (
    <div className="glass-panel animate">
      <InteractiveSkills active={active} />
    </div>
  );
}`}
                      </pre>
                    )}
                    {selected.id !== 'camunda' && selected.id !== 'spring-boot' && selected.id !== 'react' && (
                      <pre style={{ margin: 0, color: 'var(--text-secondary)' }}>
{`// System interface metrics
{
  "module": "${selected.id}",
  "experience": "4.7 years",
  "status": "LOADED_INTO_CONTEXT"
}`}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      <style>{`
        .skill-tag {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .skill-tag:hover:not(.active) {
          border-color: rgba(255, 255, 255, 0.2) !important;
          background: rgba(255, 255, 255, 0.04) !important;
          transform: translateX(3px);
        }
        .skill-tag.active {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .skills-main-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 2.5rem;
        }
        .skills-category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 0.75rem;
        }
        @media (max-width: 900px) {
          .skills-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .skills-category-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
