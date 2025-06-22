import React, {useEffect} from 'react';

const TimerCompletionModal = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Таймер завершен!</h2>
        <div className="animation">⏰</div>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default TimerCompletionModal;