import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

const AdminPage = () => {
  const [aggregatedData, setAggregatedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAggregatedData = async () => {
      // Supabase RPC 함수를 호출하여 날짜별 아침, 점심, 저녁 인원 집계
      const { data, error } = await supabase.rpc('get_meal_summary');
      if (error) {
        console.error('Error fetching aggregated data:', error);
      } else {
        setAggregatedData(data);
      }
      setLoading(false);
    };
    fetchAggregatedData();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      <h2>관리자 페이지: 날짜별 식사 집계</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>날짜</th>
            <th>아침 인원</th>
            <th>점심 인원</th>
            <th>저녁 인원</th>
          </tr>
        </thead>
        <tbody>
          {aggregatedData.map((item) => (
            <tr key={item.date}>
              <td>{item.date}</td>
              <td>{item.breakfast_count}</td>
              <td>{item.lunch_count}</td>
              <td>{item.dinner_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage; 