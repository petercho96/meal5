import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const CompletionPage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div>
      <Modal isOpen={modalOpen}>
        <h2>식사 선택이 완료되었습니다!</h2>
        <button onClick={() => setModalOpen(false)}>확인</button>
      </Modal>
      <button onClick={() => navigate('/')}>다른 날짜 선택</button>
      <button onClick={() => navigate('/my-records')}>내 식사 내역 관리</button>
    </div>
  );
};

export default CompletionPage; 