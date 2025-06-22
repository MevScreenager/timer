import React from 'react';

const TimerDisplay = ({ time, isRunning }) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');

  return (
    <div className="timer-display">
      <div className={`time ${isRunning ? 'running' : 'paused'}`}>
        {minutes}:{seconds}
      </div>
      <div className="status">
        {isRunning ? 'Таймер работает' : 'Таймер на паузе'}
      </div>
    </div>
  );
};

export default TimerDisplay;