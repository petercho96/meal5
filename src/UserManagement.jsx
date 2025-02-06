import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
`;

const UserItem = styled.li`
  padding: 8px;
  margin: 4px 0;
  background: #f5f5f5;
  border-radius: 4px;
`;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data.length === 0) {
        // 사용자가 없으면 admin 계정 생성
        const { data: adminData, error: adminError } = await supabase
          .from('users')
          .insert([{ name: 'admin' }])
          .select();

        if (adminError) throw adminError;
        setUsers(adminData);
      } else {
        setUsers(data);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ name: name.trim() }])
        .select();

      if (error) throw error;

      setUsers([...users, ...data]);
      setName('');
      alert('사용자가 추가되었습니다.');
    } catch (err) {
      console.error('Error:', err);
      alert('사용자 추가 실패: ' + err.message);
    }
  };

  if (error) return <Container>에러: {error}</Container>;

  return (
    <Container>
      <h2>사용자 관리</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="사용자 이름"
          style={{ padding: '8px', marginRight: '8px' }}
        />
        <button 
          type="submit"
          style={{
            padding: '8px 16px',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          추가
        </button>
      </form>
      
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <UserList>
          {users.map((user) => (
            <UserItem key={user.id}>{user.name}</UserItem>
          ))}
        </UserList>
      )}
    </Container>
  );
};

export default UserManagement; 