import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, Cpu, AlertTriangle, ShieldCheck, Database, Layers } from 'lucide-react';

export default function ProjectConsole() {
  const [activeProject, setActiveProject] = useState('bug-tracker');
  const [terminalHistory, setTerminalHistory] = useState([
    'Welcome to Gourav Vashistha\'s Interactive CLI v1.4.7',
    '-------------------------------------------------------',
    'Recruiters: Type commands directly below to query stats.',
    'Type "help" to list available commands (e.g. "metrics", "skills").',
    'Or select a project card on the left and click "RUN".',
    'Ready.',
    ''
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [expandedProjects, setExpandedProjects] = useState({});
  
  const terminalBottomRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const logIntervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const inputRef = useRef(null);

  const projects = {
    'bug-tracker': {
      title: 'E-Bug Tracker System',
      deliverable: 'Capgemini L&D',
      duration: 'Mar 2022 - May 2022',
      tech: ['Java', 'RESTful API', 'Spring Boot MVC', 'PostgreSQL', 'SonarQube', 'AWS EC2', 'Maven'],
      summary: 'Revitalized bug tracker system, improving project tracking, report flows, and admin-staff feedback channels. Led team as Developer & Team Lead.',
      runCommand: 'mvn spring-boot:run -Dspring.profiles.active=prod -Dsonar.analysis=true',
      logs: [
        '>>> [MAVEN] Compiling project source dependencies...',
        '>>> [SONARQUBE] Running static code quality checks on Java classes...',
        '    [SONARQUBE] Metrics: Blocker Bugs = 0, Security Flaws = 0',
        '    [SONARQUBE] Test Coverage: ~85% code coverage achieved via JUnit/Mockito.',
        '>>> [SPRINGBOOT] Starting E-Bug Tracker context on port 8080...',
        '    [DATABASE] Connecting to PostgreSQL on AWS EC2 instance...',
        '    [DATABASE] Schema validation complete: updated bug reporting metadata.',
        '>>> [METRICS] Bug resolution process speeded up by ~25%.',
        '>>> [METRICS] Capgemini staff satisfaction surveys show +35% rating boost.',
        '>>> [SUCCESS] E-Bug Tracker System running successfully on AWS!'
      ]
    },
    'vote-management': {
      title: 'Vote Management System',
      deliverable: 'Capgemini L&D',
      duration: 'Dec 2021 - Jan 2022',
      tech: ['Java', 'Gradle', 'React.js', 'Spring Boot MVC', 'PostgreSQL', 'Microservices', 'REST API'],
      summary: 'Multi-service e-voting system designed with 7 modular microservices including Admin, User, Vote, Voter, Notification, Result, and Gateway services.',
      runCommand: 'docker-compose up --build -d --scale vote-service=3',
      logs: [
        '>>> [DOCKER] Building container network (network_id: vote-net)...',
        '>>> [GATEWAY] Dispatching Gateway Service routing on port 8080...',
        '>>> [MICROSERVICES] Launching 7 Spring Boot microservice threads...',
        '    [MICROSERVICES] Spawning 3 load-balanced instances of [Vote Service]',
        '    [MICROSERVICES] Service: [Admin Service] registered in Eureka.',
        '    [MICROSERVICES] Service: [Voter Service] active (Secure voter validations enabled).',
        '    [MICROSERVICES] Service: [Notification Service] active (SMTP queue connected).',
        '    [MICROSERVICES] Service: [Result Service] active (Aggregations running).',
        '>>> [DATABASE] Connectivity to PostgreSQL vote_db verified.',
        '>>> [SUCCESS] Eureka discovery registry mapping complete: 7/7 instances active.'
      ]
    },
    'ecommerce': {
      title: 'Shop Goals E-Commerce',
      deliverable: 'Echelon Institute (Final Year Project)',
      duration: 'Jun 2020 - Mar 2021',
      tech: ['Python', 'Django', 'JavaScript', 'Bootstrap 5', 'SQL', 'CSS 3', 'HTML 5'],
      summary: 'Full-stack online retail platform featuring Razorpay and Stripe payment gateway integrations, admin inventories, and live delivery status monitors.',
      runCommand: 'python manage.py runserver --settings=shopgoals.settings.production',
      logs: [
        '>>> [DJANGO] Compiling settings and static templates...',
        '>>> [DATABASE] Establishing connections to production relational schema...',
        '    [DATABASE] Verification: 1,000+ stock item rows mapped successfully.',
        '>>> [GATEWAY] Initializing webhook listeners for Razorpay & Stripe APIs...',
        '    [GATEWAY] Sandbox merchant handshake validation... SUCCESS',
        '>>> [METRICS] Loaded 200+ test sandbox orders with 100% gateway uptime.',
        '>>> [SUCCESS] Shop Goals server active on local loop http://127.0.0.1:8000/'
      ]
    }
  };

  useEffect(() => {
    // Auto scroll to terminal bottom
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (logIntervalRef.current) clearInterval(logIntervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const triggerRunSimulation = (projectId) => {
    if (isTyping) return;
    setIsTyping(true);
    
    // Clear any running timers
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    if (logIntervalRef.current) clearInterval(logIntervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    const proj = projects[projectId];
    if (!proj) {
      setIsTyping(false);
      return;
    }
    
    setTerminalHistory(prev => [...prev, `gourav@backend-pc:~$ execute-project --run=${projectId}`]);
    
    let commandText = proj.runCommand || '';
    let currentCommandStr = '';
    let charIndex = 0;
    
    typingIntervalRef.current = setInterval(() => {
      if (charIndex < commandText.length) {
        currentCommandStr += commandText[charIndex];
        setTerminalHistory(prev => {
          // Replace last line during typing
          const updated = [...prev];
          updated[updated.length - 1] = `gourav@backend-pc:~$ ${currentCommandStr}`;
          return updated;
        });
        charIndex++;
      } else {
        clearInterval(typingIntervalRef.current);
        
        timeoutRef.current = setTimeout(() => {
          let logIndex = 0;
          logIntervalRef.current = setInterval(() => {
            if (proj.logs && logIndex < proj.logs.length) {
              const nextLog = proj.logs[logIndex];
              if (nextLog !== undefined) {
                setTerminalHistory(prev => [...prev, nextLog]);
              }
              logIndex++;
            } else {
              clearInterval(logIntervalRef.current);
              setTerminalHistory(prev => [...prev, '']);
              setIsTyping(false);
            }
          }, 350);
        }, 300);
      }
    }, 30);
  };

  const handleRunClick = () => {
    triggerRunSimulation(activeProject);
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const cmdStr = inputValue;
    setInputValue('');
    
    const cleanCmd = cmdStr.trim().toLowerCase();
    const args = cleanCmd.split(' ');
    const command = args[0];

    // Append user input
    setTerminalHistory(prev => [...prev, `gourav@backend-pc:~$ ${cmdStr}`]);

    if (command === 'clear') {
      setTerminalHistory(['Terminal cleared. Type "help" to see commands.', '']);
      return;
    }

    if (command === 'help') {
      setTerminalHistory(prev => [
        ...prev,
        'Available terminal commands:',
        '  about     - Brief summary about Gourav',
        '  metrics   - Display core quantifiable accomplishments',
        '  skills    - List developer stacks and skills',
        '  projects  - Show projects and details on how to run',
        '  run [id]  - Run project simulation (e.g., run bug-tracker)',
        '  contact   - Display email, phone, and direct links',
        '  clear     - Wipe terminal history output',
        ''
      ]);
      return;
    }

    if (command === 'about') {
      setTerminalHistory(prev => [
        ...prev,
        'Candidate Context: Gourav Vashistha',
        'Role: Senior Software Engineer (Java, Spring Boot, Camunda Orchestration)',
        'Exp: 4.7+ years of experience delivering secure, scalable backends.',
        'Focus: RESTful architectures, clean code structure (SOLID), CI/CD workflows.',
        ''
      ]);
      return;
    }

    if (command === 'metrics') {
      setTerminalHistory(prev => [
        ...prev,
        '[METRIC] EY: Designed Camunda workflows, reducing manual workloads by ~80%.',
        '[METRIC] EY: Wrote JUnit/Mockito suites reaching ~85% test coverage.',
        '[METRIC] Infinite: Created automated domain scripts, saving 20% manual labor.',
        '[METRIC] Infinite/EY: Boosted delivery cycles and stable operations by 20%.',
        ''
      ]);
      return;
    }

    if (command === 'skills') {
      setTerminalHistory(prev => [
        ...prev,
        'Backend:   Java (8, 11), Spring Boot, Hibernate, JPA, REST APIs, J2EE',
        'Database:  PostgreSQL, MySQL, Database scoping and optimization',
        'Frontend:  JavaScript, React.js, basic Angular, CSS3/HTML5',
        'DevOps:    Jenkins automations, Git version control, Eureka, Docker',
        'Workflow:  Camunda BPMN engines, Service Tasks, Java Delegates',
        ''
      ]);
      return;
    }

    if (command === 'contact') {
      setTerminalHistory(prev => [
        ...prev,
        'Email:     gvashistha4@gmail.com',
        'Phone:     +91-9518443458',
        'Address:   Bangalore, KA, India',
        'Socials:   LinkedIn & GitHub linked in footer.',
        ''
      ]);
      return;
    }

    if (command === 'projects') {
      setTerminalHistory(prev => [
        ...prev,
        'Executable Projects:',
        '  bug-tracker      - E-Bug Tracker System (Java/Spring Boot/PostgreSQL)',
        '  vote-management  - 7-Microservices Gateway Voting System (Java/React)',
        '  ecommerce        - Django Shop Goals E-Commerce Site (Python/Bootstrap)',
        'Usage: Type "run bug-tracker" to execute.',
        ''
      ]);
      return;
    }

    if (command === 'run') {
      const projId = args[1];
      if (!projId) {
        setTerminalHistory(prev => [...prev, 'Error: Project ID required. Usage: run [project-id]', '']);
        return;
      }

      if (projects[projId]) {
        setActiveProject(projId);
        triggerRunSimulation(projId);
      } else {
        setTerminalHistory(prev => [...prev, `Error: Project "${projId}" not found. Type "projects" to list.`, '']);
      }
      return;
    }

    // Default unknown
    setTerminalHistory(prev => [
      ...prev,
      `bash: command not found: ${command}. Type "help" to list available operations.`,
      ''
    ]);
  };

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <section id="projects" className="section-padding" style={{ position: 'relative' }}>
      <div className="bg-glow-orb bg-glow-orb-cyan" style={{ left: '-5%', bottom: '15%' }} />
      <div className="container">
        
        <div className="section-title-wrapper">
          <span className="section-subtitle">Interactive Showcase</span>
          <h2 className="section-title">Terminal Console &amp; Projects</h2>
          <div className="section-line" style={{ backgroundColor: 'var(--color-green)', boxShadow: 'var(--glow-green-sm)' }} />
          <p style={{ marginTop: '1rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Choose a project on the left to execute its compile logs, or type commands directly into the interactive terminal prompt to query my resume stats.
          </p>
        </div>

        <div className="grid-2 project-grid-responsive" style={{ alignItems: 'stretch' }}>
          {/* Left Panel: Project Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {Object.entries(projects).map(([key, value]) => (
              <div
                key={key}
                onClick={() => !isTyping && setActiveProject(key)}
                className={`glass-panel border-glow-green ${activeProject === key ? 'active-project-card' : ''}`}
                style={{
                  padding: '1.25rem',
                  cursor: isTyping ? 'not-allowed' : 'pointer',
                  borderLeft: activeProject === key ? '4px solid var(--color-green)' : '1px solid var(--glass-border)',
                  backgroundColor: activeProject === key ? 'rgba(18, 24, 45, 0.7)' : 'var(--glass-bg)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.15rem', color: activeProject === key ? 'var(--color-green)' : 'var(--text-highlight)' }}>
                    {value.title}
                  </h3>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {value.duration}
                  </span>
                </div>
                
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {value.summary}
                </p>

                {/* Tech Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {(expandedProjects[key] ? value.tech : value.tech.slice(0, 4)).map((tech, idx) => (
                    <span key={idx} style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>
                      {tech}
                    </span>
                  ))}
                  {value.tech.length > 4 && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedProjects(prev => ({ ...prev, [key]: !prev[key] }));
                      }}
                      style={{
                        fontSize: '0.7rem', padding: '0.2rem 0.5rem', borderRadius: '4px',
                        background: expandedProjects[key] ? 'rgba(0,230,118,0.15)' : 'rgba(0, 230, 118, 0.08)',
                        color: 'var(--color-green)', cursor: 'pointer',
                        border: '1px solid rgba(0,230,118,0.3)',
                        transition: 'all 0.2s ease',
                        userSelect: 'none'
                      }}
                      title={expandedProjects[key] ? 'Click to collapse' : 'Click to see all tags'}
                    >
                      {expandedProjects[key] ? '▲ less' : `+${value.tech.length - 4} more`}
                    </span>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={handleRunClick}
              disabled={isTyping}
              className="run-project-btn"
              style={{
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.85rem',
                borderRadius: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                cursor: isTyping ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: 'var(--color-green)',
                color: '#070a13',
                border: 'none',
                boxShadow: 'var(--glow-green-sm)'
              }}
            >
              <Play size={16} fill="#070a13" /> {isTyping ? 'EXECUTING PIPELINE...' : 'RUN SELECTED PROJECT'}
            </button>
          </div>

          {/* Right Panel: Interactive Terminal */}
          <div
            onClick={focusInput}
            className="glass-panel scanlines"
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#03050c',
              border: '1px solid rgba(255,255,255,0.05)',
              overflow: 'hidden',
              minHeight: '380px',
              cursor: 'text'
            }}
          >
            {/* Terminal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#070a13', padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
              </div>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                interactive-shell - gourav@backend-pc:~
              </span>
              <Terminal size={14} style={{ color: 'var(--text-muted)' }} />
            </div>

            {/* Terminal Screen Area */}
            <div style={{
              flexGrow: 1,
              padding: '1.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              lineHeight: 1.6,
              color: '#d4d4d4',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              maxHeight: '320px'
            }}>
              {terminalHistory.map((line, idx) => {
                if (typeof line !== 'string') return null;
                let color = '#d4d4d4';
                let weight = 400;
                
                if (line.startsWith('gourav@backend-pc:~$')) {
                  color = 'var(--color-cyan)';
                  weight = 600;
                } else if (line.startsWith('>>> [SUCCESS]') || line.includes('[SUCCESS]')) {
                  color = 'var(--color-green)';
                  weight = 600;
                } else if (line.includes('[METRIC]') || line.startsWith('>>> [METRICS]')) {
                  color = 'var(--color-amber)';
                  weight = 600;
                } else if (line.startsWith('>>>') || line.includes('[INFO]') || line.includes('[SPRINGBOOT]') || line.includes('[MAVEN]') || line.includes('[DJANGO]') || line.includes('[DOCKER]')) {
                  color = 'var(--text-secondary)';
                } else if (line.includes('[DATABASE]')) {
                  color = 'rgba(0, 229, 255, 0.85)';
                } else if (line.includes('Vulnerabilities: 0') || line.includes('Bugs: 0')) {
                  color = 'var(--color-green)';
                } else if (line.includes('SONARQUBE')) {
                  color = 'var(--color-purple)';
                }
                
                return (
                  <div key={idx} style={{ color, fontWeight: weight, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {line}
                  </div>
                );
              })}
              
              {/* Dynamic Prompt Input Line */}
              <form onSubmit={handleCommandSubmit} style={{ display: 'flex', alignItems: 'center', color: 'var(--color-cyan)', fontWeight: 600, gap: '0.5rem', marginTop: '0.25rem' }}>
                <span>gourav@backend-pc:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isTyping}
                  placeholder={isTyping ? 'Executing process...' : 'type "help" here...'}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#d4d4d4',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    flexGrow: 1,
                    caretColor: 'var(--color-green)'
                  }}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </form>
              
              <div ref={terminalBottomRef} />
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .project-grid-responsive {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 2.5rem;
        }
        @media (max-width: 900px) {
          .project-grid-responsive {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        .active-project-card {
          border-color: var(--color-green) !important;
          box-shadow: var(--glow-green-sm);
        }
        .run-project-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--glow-green-lg);
          background-color: #00ff80 !important;
        }
        .run-project-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}
