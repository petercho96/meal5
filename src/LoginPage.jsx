import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Supabase의 signInWithPassword API 사용 (버전에 따라 다를 수 있음)
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{ margin: '50px auto', maxWidth: '400px', textAlign: 'center' }}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="email"
            placeholder="이메일"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <button type="submit" style={{ padding: '8px 16px' }}>로그인</button>
      </form>
      <p style={{ marginTop: '10px' }}>
        계정이 없으신가요?{" "}
        <a href="/signup" style={{ color: '#007bff', textDecoration: 'underline' }}>
          회원가입
        </a>
      </p>
    </div>
  );
};

export default LoginPage; 