import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const CompletionPage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(true);

  const closeModal = () => {
    setModalOpen(false);
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Modal 
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: 'rgba(0,0,0,0.5)' },
          content: { 
            maxWidth: '500px', 
            margin: 'auto', 
            borderRadius: '12px', 
            padding: '20px' 
          }
        }}
      >
        <h2>식사 선택이 완료되었습니다!</h2>
        <button 
          onClick={closeModal} 
          style={{ padding: '8px 16px', backgroundColor: '#007aff', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px' }}
        >
          확인
        </button>
      </Modal>
    </div>
  );
};

export default CompletionPage; 