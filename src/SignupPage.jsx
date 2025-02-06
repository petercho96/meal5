import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 비밀번호 일치 여부 확인
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("회원가입 성공! 확인 이메일을 확인하세요.");
        // 회원가입 후 일정 시간 후 로그인 페이지로 리다이렉트
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      setError("회원가입 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <div style={{ margin: '50px auto', maxWidth: '400px', textAlign: 'center' }}>
      <h2>회원가입</h2>
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
        <div style={{ marginBottom: '10px' }}>
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
        <button type="submit" style={{ padding: '8px 16px' }}>회원가입</button>
      </form>
      <p style={{ marginTop: '10px' }}>
        이미 계정이 있으신가요?{" "}
        <a href="/login" style={{ color: '#007bff', textDecoration: 'underline' }}>
          로그인
        </a>
      </p>
    </div>
  );
};

export default SignupPage; 