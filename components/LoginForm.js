import React, { useState } from 'react';
import { FiEye } from 'react-icons/fi'; // Install with: npm install react-icons

const centerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f9fafb', // light grey background
  padding: '1rem',
};

const cardStyle = {
  maxWidth: '400px',
  width: '100%',
  padding: '3rem 2rem',
  borderRadius: '1.5rem',
  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !password) return;
    onLogin({ email, password });
  };

  return (
    <div style={centerStyle}>
      <div style={cardStyle}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', color: '#1e293b', fontFamily: 'serif', textAlign: 'center' }}>
          Log in
        </h1>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="email" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>
              Username or Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your username or email"
              autoComplete="username"
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid #cbd5e1',
                outline: 'none',
                fontSize: '1rem',
                color: '#1e293b',
                backgroundColor: 'white',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
            <label htmlFor="password" style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#334155' }}>
              Password
            </label>
            <input
  id="password"
  type={show ? 'text' : 'password'}
  value={password}
  onChange={e => setPassword(e.target.value)}
  placeholder="Enter your password"
  autoComplete="current-password"
  required
  style={{
    width: '100%',
    padding: '0.75rem  1rem',
    borderRadius: '0.5rem',
    border: '1px solid #cbd5e1',
    outline: 'none',
    fontSize: '1rem',
    color: '#1e293b',
    backgroundColor: 'white',
  }}
/>

            <button
              type="button"
              onClick={() => setShow(s => !s)}
              tabIndex={-1}
              style={{
                position: 'absolute',
                top: '70%',
                right: '-2rem',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#0f766e',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.875rem',
                userSelect: 'none',
              }}
            >
              <FiEye style={{ marginRight: '0.25rem' }} />
              {show ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '9999px',
              backgroundColor: '#0f766e',
              color: 'white',
              fontWeight: '700',
              fontSize: '1.125rem',
              cursor: 'pointer',
              border: 'none',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={e => (e.target.style.backgroundColor = '#115e59')}
            onMouseOut={e => (e.target.style.backgroundColor = '#0f766e')}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
