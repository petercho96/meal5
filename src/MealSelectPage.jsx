import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { saveMealRecord } from './mealRecordService';

const MealSelectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const date = queryParams.get('date');
  
  const [formData, setFormData] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  // 로그인 없이 anonymous 사용자로 처리합니다.
  const user = { id: 'anonymous' };

  useEffect(() => {
    if (!date) return;
    const fetchRecord = async () => {
      const { data, error } = await supabase
        .from('meal_records')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', date)
        .single();
      if (data) {
        setFormData({
          breakfast: data.breakfast,
          lunch: data.lunch,
          dinner: data.dinner,
        });
      }
    };
    fetchRecord();
  }, [date, user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveMealRecord({ user_id: user.id, date, ...formData });
    navigate('/completion');
  };

  return (
    <div style={{ padding: '16px', maxWidth: '500px', margin: '40px auto', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '16px' }}>선택한 날짜: {date}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label style={{ fontSize: '16px' }}>
          <input
            type="checkbox"
            checked={formData.breakfast}
            onChange={(e) =>
              setFormData({ ...formData, breakfast: e.target.checked })
            }
            style={{ marginRight: '8px' }}
          />
          아침
        </label>
        <label style={{ fontSize: '16px' }}>
          <input
            type="checkbox"
            checked={formData.lunch}
            onChange={(e) =>
              setFormData({ ...formData, lunch: e.target.checked })
            }
            style={{ marginRight: '8px' }}
          />
          점심
        </label>
        <label style={{ fontSize: '16px' }}>
          <input
            type="checkbox"
            checked={formData.dinner}
            onChange={(e) =>
              setFormData({ ...formData, dinner: e.target.checked })
            }
            style={{ marginRight: '8px' }}
          />
          저녁
        </label>
        <button type="submit" style={{ padding: '12px', backgroundColor: '#007aff', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>
          제출
        </button>
      </form>
    </div>
  );
};

export default MealSelectPage; 