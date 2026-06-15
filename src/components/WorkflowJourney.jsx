import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Calendar, MapPin, CheckCircle, Terminal, HelpCircle } from 'lucide-react';

export default function WorkflowJourney() {
  const [activeStep, setActiveStep] = useState('ey'); // default to EY
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationTokenPos, setAnimationTokenPos] = useState({ x: 80, y: 100 });
  const [tokenVisible, setTokenVisible] = useState(false);
  const [executionLogs, setExecutionLogs] = useState([
    'Pipeline orchestrator context initialized.',
    'Career pipeline process model loaded successfully.',
    'Status: Idle. Click "Start Pipeline Simulation" to execute.'
  ]);

  const steps = {
    start: {
      title: 'Initiate Career Pipeline',
      subtitle: 'Education & Foundation',
      dates: '2017 - 2021',
      location: 'Faridabad, HR, India',
      company: 'Echelon Institute of Tech (J.C. Bose Uni)',
      details: [
        'Bachelor of Engineering in Computer Engineering.',
        'Graduated with 7.78 CGPA (10 Scale Grade).',
        'Acquired core programming foundations in Java, SQL, and Object-Oriented methodologies.'
      ],
      metrics: {
        'CGPA': '7.78 / 10',
        'Foundation': 'Java, SQL, DS'
      }
    },
    capgemini: {
      title: 'Task: J2EE & Full-Stack Engineering',
      subtitle: 'Software Engineer',
      dates: 'Nov 2021 - Oct 2024 (3 Years)',
      location: 'Bangalore, KA, India',
      company: 'Capgemini Technology Services',
      details: [
        'Fullstack development in J2EE, React.js, and Angular for critical banking platforms.',
        'Optimized regional scoping for transactions, boosting user experience and transaction speeds.',
        'Migrated SOAP transaction processing services from v1 to v2 REST frameworks.',
        'Engineered custom request/response assembler classes, increasing interface scalability.',
        'Upgraded legacy Spring MVC applications to Java 1.8.'
      ],
      metrics: {
        'Frameworks': 'React, SOAP/REST v2',
        'Compliance': 'Java 1.8 Standard'
      }
    },
    infinite: {
      title: 'Task: Core Backend Operations (Turbify)',
      subtitle: 'Software Engineer',
      dates: 'Oct 2024 - Aug 2025 (10 Months)',
      location: 'Bangalore, KA, India',
      company: 'Infinite Computer Solutions',
      details: [
        'Maintained Spring Boot and Microservice backend architectures for Turbify, ensuring high stability.',
        'Owned critical domain deprovisioning and database sanitization operations.',
        'Built automated Jenkins jobs to handle routine deprovisioning tasks, saving 20% manual effort.',
        'Mentored 5+ junior developers, accelerating team deliverable cycles by 20%.'
      ],
      metrics: {
        'Automation saved': '20% manual labor',
        'Deployment': 'Jenkins jobs automated'
      }
    },
    ey: {
      title: 'Task: Distributed Process & API Migration',
      subtitle: 'Senior Software Engineer',
      dates: 'Aug 2025 - Present',
      location: 'Bangalore, KA, India',
      company: 'Ernst & Young (EY)',
      details: [
        'Client: Fidelity Investments & American Express. Migrating legacy GraphQL to RESTful Spring Boot microservices.',
        'Designed 10+ workflow processes using Camunda engine integrated into Spring Boot microservices.',
        'Automated business processes, reducing manual workloads by ~80% and failure rate by ~30% via error-handling delegates.',
        'Achieved ~85% code coverage writing unit tests (JUnit/Mockito).',
        'Optimized process execution speed by ~20% through workflow task improvements.'
      ],
      metrics: {
        'Workload Reduction': '~80% effort',
        'JUnit Test Coverage': '~85%',
        'Process Uptime': '99.99%'
      }
    },
    end: {
      title: 'Next Chapter: Open for Collaboration',
      subtitle: 'Available for Projects & Opportunities',
      dates: 'Present & Beyond',
      location: 'Bangalore, India / Remote',
      company: 'Let\'s Build Something Great',
      details: [
        'Open to building scalable backend systems and enterprise applications for businesses & startups.',
        'Available for full-time roles, freelance projects, consulting, and technical collaborations.',
        'Expertise: Java 11, Spring Boot, Microservices, PostgreSQL, Camunda, React.js, AWS.'
      ],
      metrics: {
        'Availability': 'Immediate',
        'Mode': 'Full-time / Freelance'
      }
    }
  };

  const nodeCoordinates = {
    start: { x: 80, y: 100 },
    capgemini: { x: 250, y: 100 },
    infinite: { x: 470, y: 100 },
    ey: { x: 690, y: 100 },
    gateway: { x: 840, y: 100 },
    end: { x: 940, y: 100 }
  };

  const handleStartSimulation = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setTokenVisible(true);
    setExecutionLogs([]);
    
    let path = [
      { step: 'start', label: 'Initializing GouravVashisthaCareerPipeline... Foundation: J.C. Bose Uni Computer Eng.', delay: 0 },
      { step: 'capgemini', label: 'Executing Capgemini node: Full-stack J2EE / React, SOAP to REST v2 microservices migration completed.', delay: 1500 },
      { step: 'infinite', label: 'Executing Infinite Solutions node: Maintained Turbify services. Automated Jenkins jobs (20% manual labor saved).', delay: 3500 },
      { step: 'ey', label: 'Executing EY node: GraphQL to REST migration. Designed 10+ Camunda workflow processes (~80% manual workload reduced).', delay: 5500 },
      { step: 'end', label: 'Milestone reached: 4.7+ years of enterprise software delivery. Open for collaboration & new challenges.', delay: 7500 }
    ];

    path.forEach((point) => {
      setTimeout(() => {
        let coord;
        if (point.step === 'end') {
          setAnimationTokenPos(nodeCoordinates.gateway);
          setTimeout(() => {
            setAnimationTokenPos(nodeCoordinates.end);
            setActiveStep('end');
            setExecutionLogs(prev => [...prev, `[${new Date().toTimeString().split(' ')[0]}] Career journey complete. status=AVAILABLE_FOR_COLLABORATION`]);
            setIsPlaying(false);
          }, 600);
        } else {
          coord = nodeCoordinates[point.step];
          setAnimationTokenPos(coord);
          setActiveStep(point.step);
        }
        
        setExecutionLogs(prev => [...prev, `[${new Date().toTimeString().split(' ')[0]}] ${point.label}`]);
      }, point.delay);
    });
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setTokenVisible(false);
    setActiveStep('ey');
    setExecutionLogs([
      'Pipeline orchestrator reset.',
      'Ready. Click "Start Pipeline Simulation" to execute.'
    ]);
  };

  return (
    <section id="journey" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="bg-glow-orb bg-glow-orb-amber" />
      <div className="container">
        
        <div className="section-title-wrapper">
          <span className="section-subtitle">Professional Timeline</span>
          <h2 className="section-title">Interactive Career Journey</h2>
          <div className="section-line" style={{ backgroundColor: 'var(--color-amber)', boxShadow: 'var(--glow-amber-sm)' }} />
          <p style={{ marginTop: '1rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Explore my professional journey — click any stage to see experience details and achievements, or run the simulation to trace the full timeline.
          </p>
        </div>

        {/* Process Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div className="journey-btns-group">
            <button
              onClick={handleStartSimulation}
              disabled={isPlaying}
              className="bpmn-btn start"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Play size={15} /> Start Pipeline Simulation
            </button>
            <button
              onClick={resetSimulation}
              disabled={isPlaying}
              className="bpmn-btn reset"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <RotateCcw size={15} /> Reset Pipeline
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <span className="status-dot amber" style={{ width: '6px', height: '6px' }} />
            <span>Pipeline Status: {isPlaying ? <span style={{ color: 'var(--color-amber)', fontWeight: 600 }}>RUNNING</span> : 'IDLE'}</span>
          </div>
        </div>

        {/* SVG Pipeline Canvas (Desktop and Tablet Layout) */}
        <div className="desktop-timeline-container glass-panel" style={{ padding: '2rem', marginBottom: '2rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ width: '100%', position: 'relative' }}>
            <svg viewBox="0 0 1000 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
              {/* Connection Flows */}
              <path d="M 100 100 L 170 100" stroke="rgba(255,255,255,0.15)" strokeWidth="3" markerEnd="url(#arrow)" />
              <path d="M 330 100 L 390 100" stroke="rgba(255,255,255,0.15)" strokeWidth="3" markerEnd="url(#arrow)" />
              <path d="M 550 100 L 610 100" stroke="rgba(255,255,255,0.15)" strokeWidth="3" markerEnd="url(#arrow)" />
              <path d="M 770 100 L 815 100" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              <path d="M 865 100 L 920 100" stroke="rgba(255,255,255,0.15)" strokeWidth="3" markerEnd="url(#arrow)" />

              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(255,255,255,0.3)" />
                </marker>
              </defs>

              {/* Start Event */}
              <circle
                cx={nodeCoordinates.start.x}
                cy={nodeCoordinates.start.y}
                r="20"
                className={`bpmn-node clickable ${activeStep === 'start' ? 'active-green' : ''}`}
                onClick={() => setActiveStep('start')}
              />
              <text x={nodeCoordinates.start.x} y="140" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">Init</text>
              <text x={nodeCoordinates.start.x} y="155" fill="var(--color-green)" fontSize="11" fontWeight="600" textAnchor="middle">2017-2021</text>

              {/* Task 1: Capgemini */}
              <rect
                x={nodeCoordinates.capgemini.x - 80}
                y={nodeCoordinates.capgemini.y - 30}
                width="160"
                height="60"
                rx="8"
                className={`bpmn-node clickable ${activeStep === 'capgemini' ? 'active-amber' : ''}`}
                onClick={() => setActiveStep('capgemini')}
              />
              <text x={nodeCoordinates.capgemini.x} y={nodeCoordinates.capgemini.y - 5} fill="var(--text-primary)" fontSize="12" fontWeight="700" textAnchor="middle">Capgemini</text>
              <text x={nodeCoordinates.capgemini.x} y={nodeCoordinates.capgemini.y + 12} fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Software Engineer</text>
              <text x={nodeCoordinates.capgemini.x} y={nodeCoordinates.capgemini.y + 45} fill="var(--color-cyan)" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">Task</text>

              {/* Task 2: Infinite */}
              <rect
                x={nodeCoordinates.infinite.x - 80}
                y={nodeCoordinates.infinite.y - 30}
                width="160"
                height="60"
                rx="8"
                className={`bpmn-node clickable ${activeStep === 'infinite' ? 'active-amber' : ''}`}
                onClick={() => setActiveStep('infinite')}
              />
              <text x={nodeCoordinates.infinite.x} y={nodeCoordinates.infinite.y - 5} fill="var(--text-primary)" fontSize="12" fontWeight="700" textAnchor="middle">Infinite Solutions</text>
              <text x={nodeCoordinates.infinite.x} y={nodeCoordinates.infinite.y + 12} fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Software Engineer</text>
              <text x={nodeCoordinates.infinite.x} y={nodeCoordinates.infinite.y + 45} fill="var(--color-cyan)" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">Task</text>

              {/* Task 3: EY */}
              <rect
                x={nodeCoordinates.ey.x - 80}
                y={nodeCoordinates.ey.y - 30}
                width="160"
                height="60"
                rx="8"
                className={`bpmn-node clickable ${activeStep === 'ey' ? 'active-amber' : ''}`}
                onClick={() => setActiveStep('ey')}
              />
              <text x={nodeCoordinates.ey.x} y={nodeCoordinates.ey.y - 5} fill="var(--text-primary)" fontSize="12" fontWeight="700" textAnchor="middle">EY (Ernst & Young)</text>
              <text x={nodeCoordinates.ey.x} y={nodeCoordinates.ey.y + 12} fill="var(--text-secondary)" fontSize="10" textAnchor="middle">Senior Engineer</text>
              <text x={nodeCoordinates.ey.x} y={nodeCoordinates.ey.y + 45} fill="var(--color-green)" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">Task</text>

              {/* Decision Gateway */}
              <path
                d="M 840 75 L 865 100 L 840 125 L 815 100 Z"
                className={`bpmn-node ${activeStep === 'end' ? 'active-gateway' : ''}`}
              />
              <text x="840" y="104" fill="var(--text-primary)" fontSize="12" fontWeight="600" textAnchor="middle">+</text>
              <text x="840" y="145" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">Next</text>

              {/* End Event */}
              <circle
                cx={nodeCoordinates.end.x}
                cy={nodeCoordinates.end.y}
                r="18"
                className={`bpmn-node clickable ${activeStep === 'end' ? 'active-red' : ''}`}
                onClick={() => setActiveStep('end')}
              />
              <text x={nodeCoordinates.end.x} y="140" fill="var(--text-secondary)" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">Future</text>
              <text x={nodeCoordinates.end.x} y="155" fill="var(--color-green)" fontSize="11" fontWeight="600" textAnchor="middle">Collab</text>

              {/* Token Dot */}
              {tokenVisible && (
                <circle
                  cx={animationTokenPos.x}
                  cy={animationTokenPos.y}
                  r="6"
                  fill="var(--color-amber)"
                  style={{
                    filter: 'drop-shadow(0px 0px 8px var(--color-amber))',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              )}
            </svg>
          </div>
        </div>

        {/* Mobile-Friendly Vertical Pipeline (Under 768px Width) */}
        <div className="mobile-timeline-container glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', paddingLeft: '1.5rem', borderLeft: '2px dashed rgba(255,255,255,0.12)' }}>
            
            {/* Mobile Start Step */}
            <div onClick={() => setActiveStep('start')} style={{ cursor: 'pointer', position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '-33px', top: '4px', width: '16px', height: '16px', borderRadius: '50%',
                backgroundColor: activeStep === 'start' ? 'var(--color-green)' : '#0c1122',
                border: `2px solid ${activeStep === 'start' ? 'var(--color-green)' : 'var(--text-muted)'}`,
                boxShadow: activeStep === 'start' ? 'var(--glow-green-sm)' : 'none',
                transition: 'all 0.2s ease'
              }} />
              <h4 style={{ fontSize: '0.95rem', color: activeStep === 'start' ? 'var(--color-green)' : 'var(--text-primary)' }}>Education Foundation</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2017 - 2021 | Echelon Tech</span>
            </div>

            {/* Mobile Capgemini Step */}
            <div onClick={() => setActiveStep('capgemini')} style={{ cursor: 'pointer', position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '-33px', top: '4px', width: '16px', height: '16px', borderRadius: '50%',
                backgroundColor: activeStep === 'capgemini' ? 'var(--color-amber)' : '#0c1122',
                border: `2px solid ${activeStep === 'capgemini' ? 'var(--color-amber)' : 'var(--text-muted)'}`,
                boxShadow: activeStep === 'capgemini' ? 'var(--glow-amber-sm)' : 'none',
                transition: 'all 0.2s ease'
              }} />
              <h4 style={{ fontSize: '0.95rem', color: activeStep === 'capgemini' ? 'var(--color-amber)' : 'var(--text-primary)' }}>Capgemini Technology Services</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2021 - 2024 | Software Engineer</span>
            </div>

            {/* Mobile Infinite Step */}
            <div onClick={() => setActiveStep('infinite')} style={{ cursor: 'pointer', position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '-33px', top: '4px', width: '16px', height: '16px', borderRadius: '50%',
                backgroundColor: activeStep === 'infinite' ? 'var(--color-amber)' : '#0c1122',
                border: `2px solid ${activeStep === 'infinite' ? 'var(--color-amber)' : 'var(--text-muted)'}`,
                boxShadow: activeStep === 'infinite' ? 'var(--glow-amber-sm)' : 'none',
                transition: 'all 0.2s ease'
              }} />
              <h4 style={{ fontSize: '0.95rem', color: activeStep === 'infinite' ? 'var(--color-amber)' : 'var(--text-primary)' }}>Infinite Computer Solutions</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2024 - 2025 | Software Engineer</span>
            </div>

            {/* Mobile EY Step */}
            <div onClick={() => setActiveStep('ey')} style={{ cursor: 'pointer', position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '-33px', top: '4px', width: '16px', height: '16px', borderRadius: '50%',
                backgroundColor: activeStep === 'ey' ? 'var(--color-green)' : '#0c1122',
                border: `2px solid ${activeStep === 'ey' ? 'var(--color-green)' : 'var(--text-muted)'}`,
                boxShadow: activeStep === 'ey' ? 'var(--glow-green-sm)' : 'none',
                transition: 'all 0.2s ease'
              }} />
              <h4 style={{ fontSize: '0.95rem', color: activeStep === 'ey' ? 'var(--color-green)' : 'var(--text-primary)' }}>EY (Ernst &amp; Young)</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>2025 - Present | Senior Software Engineer</span>
            </div>

            {/* Mobile End Step */}
            <div onClick={() => setActiveStep('end')} style={{ cursor: 'pointer', position: 'relative' }}>
              <div style={{
                position: 'absolute', left: '-33px', top: '4px', width: '16px', height: '16px', borderRadius: '50%',
                backgroundColor: activeStep === 'end' ? 'var(--color-green)' : '#0c1122',
                border: `2px solid ${activeStep === 'end' ? 'var(--color-green)' : 'var(--text-muted)'}`,
                boxShadow: activeStep === 'end' ? 'var(--glow-green-sm)' : 'none',
                transition: 'all 0.2s ease'
              }} />
              <h4 style={{ fontSize: '0.95rem', color: activeStep === 'end' ? 'var(--color-green)' : 'var(--text-primary)' }}>Recruitment Endpoint</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ready for Recruiter Handshake</span>
            </div>

          </div>
        </div>

        <div className="grid-2">
          {/* Left Panel: Selected Node Details */}
          <div className="glass-panel" style={{ padding: '2rem', borderLeft: `4px solid ${activeStep === 'start' ? 'var(--color-green)' : activeStep === 'end' ? 'var(--color-green)' : 'var(--color-amber)'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {steps[activeStep].title}
                </span>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-highlight)', marginTop: '0.25rem' }}>
                  {steps[activeStep].company}
                </h3>
                <h4 style={{ fontSize: '1.05rem', color: activeStep === 'start' ? 'var(--color-green)' : activeStep === 'end' ? 'var(--color-green)' : 'var(--color-cyan)', fontWeight: 500 }}>
                  {steps[activeStep].subtitle}
                </h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.85rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  <Calendar size={14} style={{ color: 'var(--color-amber)' }} />
                  {steps[activeStep].dates}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  <MapPin size={13} />
                  {steps[activeStep].location}
                </span>
              </div>
            </div>

            {/* Metrics Row */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {Object.entries(steps[activeStep].metrics).map(([key, val]) => (
                <div key={key} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '0.5rem 0.85rem', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{key}</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-highlight)' }}>{val}</div>
                </div>
              ))}
            </div>

            {/* Role Responsibilities */}
            <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {steps[activeStep].details.map((detail, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle size={16} style={{ color: 'var(--color-green)', flexShrink: 0, marginTop: '0.2rem' }} />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Panel: Pipeline Logs */}
          <div className="glass-panel scanlines" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', background: '#040710', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={14} style={{ color: 'var(--color-amber)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Pipeline Simulation logs
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                run_ref: r9a1s2...
              </span>
            </div>

            <div style={{
              flexGrow: 1,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.8)',
              overflowY: 'auto',
              minHeight: '220px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {executionLogs.map((log, index) => (
                <div key={index} style={{ borderLeft: '2px solid var(--color-amber)', paddingLeft: '0.5rem', animation: 'fadeIn 0.3s ease' }}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .bpmn-btn {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .bpmn-btn.start {
          background-color: var(--color-amber);
          color: #070a13;
          border: 1px solid var(--color-amber);
          box-shadow: var(--glow-amber-sm);
        }
        .bpmn-btn.start:hover:not(:disabled) {
          background-color: #ffc400;
          transform: translateY(-1px);
          box-shadow: var(--glow-amber-lg);
        }
        .bpmn-btn.start:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .bpmn-btn.reset {
          background-color: transparent;
          color: var(--text-primary);
          border: 1px solid var(--glass-border);
        }
        .bpmn-btn.reset:hover:not(:disabled) {
          background-color: rgba(255, 255, 255, 0.05);
          border-color: rgba(255,255,255,0.15);
        }
        .bpmn-node {
          stroke: rgba(255, 255, 255, 0.2);
          stroke-width: 2px;
          fill: #0c1122;
          transition: all 0.3s ease;
        }
        .bpmn-node.clickable {
          cursor: pointer;
        }
        .bpmn-node.clickable:hover {
          stroke: var(--color-cyan);
          filter: drop-shadow(0px 0px 4px rgba(0, 229, 255, 0.5));
        }
        
        circle.active-green {
          fill: rgba(0, 230, 118, 0.15);
          stroke: var(--color-green);
          filter: drop-shadow(0px 0px 8px rgba(0, 230, 118, 0.6));
        }
        rect.active-amber {
          fill: rgba(255, 179, 0, 0.1);
          stroke: var(--color-amber);
          filter: drop-shadow(0px 0px 8px rgba(255, 179, 0, 0.4));
        }
        path.active-gateway {
          fill: rgba(255, 255, 255, 0.05);
          stroke: var(--text-primary);
          filter: drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.3));
        }
        circle.active-red {
          fill: rgba(0, 230, 118, 0.15);
          stroke: var(--color-green);
          filter: drop-shadow(0px 0px 8px rgba(0, 230, 118, 0.6));
        }
        
        .journey-btns-group {
          display: flex;
          gap: 0.75rem;
        }
        @media (max-width: 768px) {
          .desktop-timeline-container {
            display: none !important;
          }
          .mobile-timeline-container {
            display: block !important;
          }
        }
        @media (max-width: 580px) {
          .journey-btns-group {
            width: 100%;
            flex-direction: column;
          }
          .journey-btns-group .bpmn-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
