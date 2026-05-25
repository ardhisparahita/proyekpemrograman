import { useState } from 'react';
import api from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // login 
  const login = async () => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      localStorage.setItem(
        'token',
        response.data.token
      );

      alert('Login Success');
      window.location.href = '/dashboard';
    } catch  {
      alert('Login Failed');
    } 
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>CV Mugijaya</h1>
          <p style={styles.subtitle}>
            Sistem Manajemen Distribusi & Gudang
          </p>
        </div>

        <h2 style={styles.title}>Login</h2>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>

          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>

          <input
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <button
          onClick={login}
          style={styles.button}
        >
          Login
        </button>

        <p style={styles.footer}>
          © 2026 CV Mugijaya
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background:
      'linear-gradient(135deg, #1e3c72, #2a5298)',
    fontFamily: 'Arial',
  },

  card: {
    width: '400px',
    background: '#fff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },

  logoContainer: {
    textAlign: 'center',
    marginBottom: '30px',
  },

  logo: {
    margin: 0,
    color: '#1e3c72',
    fontSize: '32px',
  },

  subtitle: {
    color: '#666',
    marginTop: '8px',
    fontSize: '14px',
  },

  title: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#333',
  },

  formGroup: {
    marginBottom: '20px',
  },

  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#444',
    fontWeight: 'bold',
  },

  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },

  button: {
    width: '100%',
    padding: '14px',
    background: '#1e3c72',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },

  footer: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#777',
    fontSize: '13px',
  },
};