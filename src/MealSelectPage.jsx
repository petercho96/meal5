import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

const MealSelectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date');

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [meals, setMeals] = useState({
    breakfast: false,
    lunch: false,
    dinner: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 사용자 목록 불러오기
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;

        setUsers(data);
        if (data.length > 0) {
          setSelectedUser(data[0].id);
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 선택된 사용자의 식사 기록 불러오기
  useEffect(() => {
    const fetchMealRecord = async () => {
      if (!selectedUser || !date) return;

      try {
        const { data, error } = await supabase
          .from('meal_records')
          .select('*')
          .eq('user_id', selectedUser)
          .eq('date', date)
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (data) {
          setMeals({
            breakfast: data.breakfast,
            lunch: data.lunch,
            dinner: data.dinner
          });
        }
      } catch (err) {
        console.error('Error fetching meal record:', err);
        setError(err.message);
      }
    };

    fetchMealRecord();
  }, [selectedUser, date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser || !date) return;

    try {
      const { error } = await supabase
        .from('meal_records')
        .upsert({
          user_id: selectedUser,
          date,
          ...meals
        });

      if (error) throw error;

      alert('식사 기록이 저장되었습니다.');
      navigate('/completion');
    } catch (err) {
      console.error('Error saving meal record:', err);
      alert('저장 실패: ' + err.message);
    }
  };

  if (error) return <Container>에러: {error}</Container>;
  if (loading) return <Container>로딩 중...</Container>;

  return (
    <Container>
      <h2>식사 선택 ({date})</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label>
            사용자:
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              style={{ marginLeft: '10px', padding: '5px' }}
            >
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={meals.breakfast}
              onChange={(e) => setMeals({ ...meals, breakfast: e.target.checked })}
            />
            아침
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={meals.lunch}
              onChange={(e) => setMeals({ ...meals, lunch: e.target.checked })}
            />
            점심
          </label>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>
            <input
              type="checkbox"
              checked={meals.dinner}
              onChange={(e) => setMeals({ ...meals, dinner: e.target.checked })}
            />
            저녁
          </label>
        </div>

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
          저장
        </button>
      </form>
    </Container>
  );
};

export default MealSelectPage; 