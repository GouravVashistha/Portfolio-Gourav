import React, { useState } from 'react';
import { Send, Terminal, Database, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle, sending, success
  const [responseLog, setResponseLog] = useState(null);
  const [serverLogs, setServerLogs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.senderName || !formData.senderEmail || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    setStatus('sending');
    setServerLogs([
      '>>> [HTTP REST CLIENT] Connecting to springboot-portfolio-gateway...',
      '>>> [HTTP REST CLIENT] Forwarding HTTP Request: POST /api/v1/contact-messages',
      '>>> [SERVER] Dispatching request payload to ContactController...'
    ]);

    // Step 1: Validation log
    setTimeout(() => {
      setServerLogs(prev => [
        ...prev,
        `>>> [VALIDATOR] Checking parameter constraints: email "${formData.senderEmail}" is VALID.`,
        '>>> [SECURITY] JWT Token scan: anonymous submission authorized.'
      ]);
    }, 800);

    // Step 2: Database saving log
    setTimeout(() => {
      setServerLogs(prev => [
        ...prev,
        '>>> [HIBERNATE] JPA EntityManager executing transactional persist()...',
        '    SQL Query: INSERT INTO tbl_contact_inquiries (name, email, subject, message, timestamp) VALUES (?, ?, ?, ?, ?)',
        '>>> [DATABASE] Row committed successfully in Postgres cluster. Generated ID: ' + Math.floor(Math.random() * 9000 + 1000)
      ]);
    }, 1800);

    // Step 3: Notification log
    setTimeout(() => {
      setServerLogs(prev => [
        ...prev,
        '>>> [NOTIFICATION SERVICE] Queueing SMTP background thread for gvashistha4@gmail.com...',
        '    [SMTP] Email dispatch envelope created: "New portfolio message from ' + formData.senderName + '"'
      ]);
    }, 2800);

    // Step 4: Success Response payload
    setTimeout(() => {
      setStatus('success');
      setServerLogs(prev => [
        ...prev,
        '>>> [HTTP SERVER] Handshake complete. Status: 201 Created.'
      ]);
      setResponseLog({
        status: 201,
        statusText: 'Created',
        body: {
          timestamp: new Date().toISOString(),
          message: `Hello ${formData.senderName}, your message has been persisted in Gourav's database.`,
          data: {
            transactionId: 'tx-' + Math.random().toString(36).substring(2, 9),
            inboxRecipient: 'gvashistha4@gmail.com',
            status: 'SUCCESS'
          }
        }
      });
    }, 3800);
  };

  const handleReset = () => {
    setFormData({
      senderName: '',
      senderEmail: '',
      subject: '',
      message: ''
    });
    setStatus('idle');
    setResponseLog(null);
    setServerLogs([]);
  };

  // Generate live request payload preview
  const requestPayloadJSON = JSON.stringify({
    senderName: formData.senderName || 'Recruiter / Guest',
    senderEmail: formData.senderEmail || 'recruiter@company.com',
    subject: formData.subject || 'Opportunity Inquiry',
    message: formData.message || 'Typing details...',
    timestamp: new Date().toISOString()
  }, null, 2);

  return (
    <section id="contact" className="section-padding" style={{ position: 'relative' }}>
      <div className="bg-glow-orb bg-glow-orb-green" style={{ left: '-50px', bottom: '-100px' }} />
      <div className="container">
        
        <div className="section-title-wrapper">
          <span className="section-subtitle">Connect / Query</span>
          <h2 className="section-title">REST API Contact Client</h2>
          <div className="section-line" style={{ backgroundColor: 'var(--color-green)', boxShadow: 'var(--glow-green-sm)' }} />
          <p style={{ marginTop: '1rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Submit a message through a simulated client-server network payload. Fill in the parameters on the left to see the request JSON update.
          </p>
        </div>

        <div className="grid-2 contact-grid-responsive" style={{ gridTemplateColumns: '0.9fr 1.1fr' }}>
          {/* Left Panel: The Input Form */}
          <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--glass-border)' }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0, 230, 118, 0.1)', border: '1px solid var(--color-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                  <CheckCircle size={32} style={{ color: 'var(--color-green)' }} />
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-highlight)', marginBottom: '0.75rem' }}>
                  POST Request Successful!
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                  Your message has been received by my local backend simulation. I will get in touch with you at <strong>{formData.senderEmail}</strong> shortly!
                </p>
                <button
                  onClick={handleReset}
                  className="contact-submit-btn"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--glass-border)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 600,
                    transition: 'all 0.2s ease'
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="senderName" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    Sender Name <span style={{ color: 'var(--color-green)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="senderName"
                    name="senderName"
                    required
                    value={formData.senderName}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    placeholder="Enter your name"
                    className="contact-input"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="senderEmail" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    Sender Email <span style={{ color: 'var(--color-green)' }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="senderEmail"
                    name="senderEmail"
                    required
                    value={formData.senderEmail}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    placeholder="name@company.com"
                    className="contact-input"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="subject" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    placeholder="Inquiry / Recruitment"
                    className="contact-input"
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label htmlFor="message" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    Message Body <span style={{ color: 'var(--color-green)' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === 'sending'}
                    placeholder="Write your message here..."
                    className="contact-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="contact-submit-btn"
                  style={{
                    backgroundColor: 'var(--color-green)',
                    color: '#070a13',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.85rem',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: 'var(--glow-green-sm)',
                    transition: 'all 0.2s ease',
                    marginTop: '0.5rem'
                  }}
                >
                  <Send size={16} />
                  {status === 'sending' ? 'SENDING POST REQUEST...' : 'EXECUTE POST /api/v1/contact'}
                </button>
              </form>
            )}

            {/* Direct Contact Links */}
            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <Mail size={16} style={{ color: 'var(--color-green)' }} />
                <a href="mailto:gvashistha4@gmail.com" className="contact-link-hover">gvashistha4@gmail.com</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <Phone size={16} style={{ color: 'var(--color-green)' }} />
                <a href="tel:+919518443458" className="contact-link-hover">+91 95184 43458</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <MapPin size={16} style={{ color: 'var(--color-green)' }} />
                <span>Bangalore, KA, India</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Client-Server Network Simulator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Request JSON payload */}
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', background: '#040710', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Terminal size={14} style={{ color: 'var(--color-cyan)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    HTTP POST Request Payload
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-cyan)' }}>
                  POST /api/v1/contact
                </span>
              </div>

              <pre style={{
                margin: 0,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'rgba(0, 229, 255, 0.85)',
                overflowX: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                background: 'rgba(0,0,0,0.15)',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.02)'
              }}>
                {requestPayloadJSON}
              </pre>
            </div>

            {/* Network / Server Logs Terminal */}
            <div className="glass-panel scanlines" style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', background: '#03050c', border: '1px solid rgba(255, 255, 255, 0.04)', minHeight: '260px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Database size={14} style={{ color: 'var(--color-green)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Backend REST Server Logs
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Port: 8080
                </span>
              </div>

              {/* Server Terminal history */}
              <div style={{
                flexGrow: 1,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'rgba(255,255,255,0.7)',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                marginBottom: '1rem'
              }}>
                {serverLogs.length === 0 ? (
                  <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Awaiting POST request trigger... Fill out the form and submit.
                  </div>
                ) : (
                  serverLogs.map((log, idx) => {
                    let color = 'rgba(255,255,255,0.7)';
                    if (log.includes('[VALIDATOR]') || log.includes('VALID')) color = 'var(--color-cyan)';
                    else if (log.includes('persisted') || log.includes('[DATABASE]') || log.includes('[HIBERNATE]') || log.includes('committed')) color = 'var(--color-green)';
                    else if (log.includes('SMTP') || log.includes('SMTP thread') || log.includes('email dispatch')) color = 'var(--color-amber)';
                    else if (log.includes('201 Created') || log.includes('Request fulfilled') || log.includes('Status:')) color = 'var(--color-green)';
                    return (
                      <div key={idx} style={{ color, wordBreak: 'break-all' }}>
                        {log}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Response Log block if successful */}
              {responseLog && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-green)', marginBottom: '0.25rem', fontWeight: 600 }}>
                    <span>HTTP/1.1 {responseLog.status} {responseLog.statusText}</span>
                    <span>JSON Response</span>
                  </div>
                  <pre style={{
                    margin: 0,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'rgba(0, 230, 118, 0.85)',
                    overflowX: 'auto',
                    whiteSpace: 'pre-wrap',
                    background: '#040710',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.02)'
                  }}>
                    {JSON.stringify(responseLog.body, null, 2)}
                  </pre>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .contact-input {
          background-color: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
          border-radius: 6px;
          padding: 0.75rem;
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          transition: all 0.2s ease;
        }
        .contact-input:focus {
          outline: none;
          border-color: var(--color-green);
          background-color: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 10px rgba(0, 230, 118, 0.15);
        }
        .contact-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: var(--glow-green-lg) !important;
          background-color: #00ff80 !important;
        }
        .contact-link-hover {
          transition: color 0.2s ease;
        }
        .contact-link-hover:hover {
          color: var(--color-green) !important;
        }
      `}</style>
    </section>
  );
}
