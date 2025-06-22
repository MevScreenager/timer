import React from 'react';

const TimerControls = ({
  onPauseResume,
  onReset,
  onNewTimer,
  isRunning,
  isPaused,
}) => {
  return (
    <div className="timer-controls">
      <button onClick={onPauseResume}>
        {isRunning ? 'Пауза' : isPaused ? 'Продолжить' : 'Старт'}
      </button>
      <button onClick={onReset}>Сброс</button>
      <button onClick={onNewTimer}>Новый таймер</button>
    </div>
  );
};

export default TimerControls;