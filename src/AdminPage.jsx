import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const AdminPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      const { data, error } = await supabase
        .from('meal_records')
        .select('*, user:users(name)')
        .order('date', { ascending: false });
      if (error) console.error(error);
      else setRecords(data);
      setLoading(false);
    };
    fetchRecords();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>관리자 페이지: 식사 기록 상세 내역</h2>
      <table border="1" cellPadding="5" style={{ margin: '0 auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>날짜</th>
            <th>사용자</th>
            <th>아침</th>
            <th>점심</th>
            <th>저녁</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.user ? record.user.name : '알 수 없음'}</td>
              <td>{record.breakfast ? 'O' : 'X'}</td>
              <td>{record.lunch ? 'O' : 'X'}</td>
              <td>{record.dinner ? 'O' : 'X'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage; 