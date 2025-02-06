import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

const MyRecordsPage = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const user = supabase.auth.user() || { id: 'dummy-user-id' };

  useEffect(() => {
    const fetchRecords = async () => {
      const { data, error } = await supabase
        .from('meal_records')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });
      if (data) setRecords(data);
      if (error) console.error(error);
    };
    if (user.id) {
      fetchRecords();
    }
  }, [user.id]);

  return (
    <div>
      <h2>내 식사 내역 관리</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>날짜</th>
            <th>아침</th>
            <th>점심</th>
            <th>저녁</th>
            <th>수정</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.breakfast ? 'O' : 'X'}</td>
              <td>{record.lunch ? 'O' : 'X'}</td>
              <td>{record.dinner ? 'O' : 'X'}</td>
              <td>
                <button onClick={() => navigate(`/meal-select?date=${record.date}`)}>
                  수정
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyRecordsPage; 