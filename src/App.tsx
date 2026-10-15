import React, { useState } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#0f172a' : '#ffffff', color: darkMode ? '#f8fafc' : '#0f172a' }}>
        <nav style={{ borderBottom: '1px solid', borderColor: darkMode ? '#1e293b' : '#e2e8f0', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
              ✨
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>ApplyTrack</span>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid', borderColor: darkMode ? '#334155' : '#cbd5e1', backgroundColor: darkMode ? '#1e293b' : '#f1f5f9', cursor: 'pointer', color: 'inherit' }}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>

        <main style={{ maxWidth: '80rem', margin: '0 auto', padding: '5rem 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: darkMode ? '#1e3a8a' : '#dbeafe', color: darkMode ? '#93c5fd' : '#1d4ed8', fontSize: '0.875rem', fontWeight: '500', marginBottom: '1.5rem' }}>
            ⚡ AI-powered resume tailoring in under 60 seconds
          </div>
          
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '1.5rem' }}>
            Land your dream job with a{' '}
            <span style={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              tailored resume
            </span>
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: darkMode ? '#94a3b8' : '#64748b', marginBottom: '2.5rem', maxWidth: '48rem', marginLeft: 'auto', marginRight: 'auto' }}>
            Paste a job posting, get an ATS-friendly resume that highlights your real experience. Track every application from save to offer.
          </p>
          
          <button 
            onClick={() => setIsLoggedIn(true)}
            style={{ padding: '1rem 2rem', borderRadius: '0.75rem', backgroundColor: '#3b82f6', color: 'white', fontSize: '1rem', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.25)' }}
          >
            Get Started Free →
          </button>
          
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: darkMode ? '#64748b' : '#94a3b8' }}>
            Free for students • No credit card required
          </p>

          <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'left' }}>
            {[
              { icon: '📄', title: 'AI Resume Tailoring', desc: 'Get a tailored resume in 60 seconds. Every change is verified.' },
              { icon: '📊', title: 'Application Tracker', desc: 'Kanban board to track every application. Never miss a deadline.' },
              { icon: '🎯', title: 'Interview Prep', desc: 'Role-specific questions with AI coaching.' },
            ].map((feature, i) => (
              <div key={i} style={{ padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid', borderColor: darkMode ? '#1e293b' : '#e2e8f0', backgroundColor: darkMode ? '#0f172a' : '#ffffff' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>{feature.title}</h3>
                <p style={{ fontSize: '0.875rem', color: darkMode ? '#94a3b8' : '#64748b' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Logged in - Dashboard
  return (
    <div style={{ minHeight: '100vh', backgroundColor: darkMode ? '#0f172a' : '#f8fafc', color: darkMode ? '#f8fafc' : '#0f172a' }}>
      <nav style={{ backgroundColor: darkMode ? '#0f172a' : '#ffffff', borderBottom: '1px solid', borderColor: darkMode ? '#1e293b' : '#e2e8f0', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
            ✨
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>ApplyTrack</span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            style={{ padding: '0.5rem', borderRadius: '0.5rem', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: '1.25rem' }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button 
            onClick={() => setIsLoggedIn(false)}
            style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid', borderColor: darkMode ? '#334155' : '#cbd5e1', backgroundColor: darkMode ? '#1e293b' : '#f1f5f9', cursor: 'pointer', color: 'inherit' }}
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: '80rem', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Welcome back, Alex 👋</h1>
        <p style={{ color: darkMode ? '#94a3b8' : '#64748b', marginBottom: '2rem' }}>Here's your job search overview.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Applications', value: '15', color: '#3b82f6' },
            { label: 'Active Pipeline', value: '8', color: '#10b981' },
            { label: 'Interviews', value: '3', color: '#f59e0b' },
            { label: 'Avg Match Score', value: '72%', color: '#8b5cf6' },
          ].map((stat, i) => (
            <div key={i} style={{ padding: '1.5rem', borderRadius: '0.75rem', backgroundColor: darkMode ? '#1e293b' : '#ffffff', border: '1px solid', borderColor: darkMode ? '#334155' : '#e2e8f0' }}>
              <p style={{ fontSize: '0.875rem', color: darkMode ? '#94a3b8' : '#64748b' }}>{stat.label}</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color, marginTop: '0.5rem' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div style={{ padding: '1.5rem', borderRadius: '0.75rem', backgroundColor: darkMode ? '#1e293b' : '#ffffff', border: '1px solid', borderColor: darkMode ? '#334155' : '#e2e8f0' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Recent Applications</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { company: 'Google', role: 'Software Engineer Intern', status: 'Interview', match: 87 },
              { company: 'Meta', role: 'Frontend Developer', status: 'Applied', match: 75 },
              { company: 'Stripe', role: 'Full-Stack Engineer', status: 'Offer', match: 92 },
            ].map((app, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderRadius: '0.5rem', backgroundColor: darkMode ? '#0f172a' : '#f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', backgroundColor: darkMode ? '#1e3a8a' : '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: darkMode ? '#93c5fd' : '#1d4ed8' }}>
                    {app.company.charAt(0)}
                  </div>
                  <div>
                    <p style={{ fontWeight: '500' }}>{app.role}</p>
                    <p style={{ fontSize: '0.875rem', color: darkMode ? '#94a3b8' : '#64748b' }}>{app.company}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: darkMode ? '#94a3b8' : '#64748b' }}>{app.match}% match</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '500', padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: app.status === 'Offer' ? '#dcfce7' : app.status === 'Interview' ? '#fef3c7' : '#dbeafe', color: app.status === 'Offer' ? '#166534' : app.status === 'Interview' ? '#92400e' : '#1d4ed8' }}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
