import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [page, setPage] = React.useState<'landing' | 'dashboard'>('landing');

  if (page === 'dashboard') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Welcome back, Alex 👋</h1>
            <button 
              onClick={() => setPage('landing')}
              style={{ padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', backgroundColor: '#f1f5f9', cursor: 'pointer' }}
            >
              Sign Out
            </button>
          </div>
          
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>Here's your job search overview.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { label: 'Total Applications', value: '15', color: '#3b82f6' },
              { label: 'Active Pipeline', value: '8', color: '#10b981' },
              { label: 'Interviews', value: '3', color: '#f59e0b' },
              { label: 'Avg Match Score', value: '72%', color: '#8b5cf6' },
            ].map((stat, i) => (
              <div key={i} style={{ padding: '1.5rem', borderRadius: '0.75rem', backgroundColor: 'white', border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#64748b', fontSize: '0.875rem' }}>{stat.label}</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color, marginTop: '0.5rem' }}>{stat.value}</div>
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Recent Applications</h2>
            {[
              { company: 'Google', role: 'Software Engineer Intern', status: 'Interview', match: 87, bgColor: '#fef3c7', textColor: '#92400e' },
              { company: 'Meta', role: 'Frontend Developer', status: 'Applied', match: 75, bgColor: '#dbeafe', textColor: '#1d4ed8' },
              { company: 'Stripe', role: 'Full-Stack Engineer', status: 'Offer', match: 92, bgColor: '#dcfce7', textColor: '#166534' },
            ].map((app, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#dbeafe', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#1d4ed8' }}>
                    {app.company.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: '500' }}>{app.role}</div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{app.company}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ color: '#64748b' }}>{app.match}% match</span>
                  <span style={{ backgroundColor: app.bgColor, color: app.textColor, padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500' }}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ borderBottom: '1px solid #e2e8f0', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '2rem', height: '2rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
            ✨
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>ApplyTrack</span>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: '#dbeafe', color: '#1d4ed8', fontSize: '0.875rem', fontWeight: '500', marginBottom: '1.5rem' }}>
          ⚡ AI-powered resume tailoring in under 60 seconds
        </div>
        
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '1.5rem' }}>
          Land your dream job with a{' '}
          <span style={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            tailored resume
          </span>
        </h1>
        
        <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '2.5rem', maxWidth: '48rem', marginLeft: 'auto', marginRight: 'auto' }}>
          Paste a job posting, get an ATS-friendly resume that highlights your real experience. Track every application from save to offer.
        </p>
        
        <button 
          onClick={() => setPage('dashboard')}
          style={{ padding: '1rem 2rem', borderRadius: '0.75rem', backgroundColor: '#3b82f6', color: 'white', fontSize: '1rem', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.25)' }}
        >
          Get Started Free →
        </button>
        
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#94a3b8' }}>
          Free for students • No credit card required
        </p>

        <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'left' }}>
          {[
            { icon: '📄', title: 'AI Resume Tailoring', desc: 'Get a tailored resume in 60 seconds. Every change is verified.' },
            { icon: '📊', title: 'Application Tracker', desc: 'Kanban board to track every application. Never miss a deadline.' },
            { icon: '🎯', title: 'Interview Prep', desc: 'Role-specific questions with AI coaching.' },
          ].map((feature, i) => (
            <div key={i} style={{ padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{feature.icon}</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>{feature.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<App />);
}
