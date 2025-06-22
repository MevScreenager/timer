import React, {useState} from 'react';


const TimerForm = ({ onStart }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const validateAndSet = (value, setter, max = 59) => {
    const numValue = parseInt(value, 10) || 0;
    if (numValue < 0) {
      setter(0);
    } else if (numValue > max) {
      setter(max);
    } else {
      setter(numValue);
    }
  };

  const handleMinutesChange = (e) => {
    validateAndSet(e.target.value, setMinutes);
  };

  const handleSecondsChange = (e) => {
    validateAndSet(e.target.value, setSeconds);
  };

  const handleStart = () => {
    const totalSeconds = minutes * 60 + seconds;
    if (totalSeconds > 0) {
      onStart(totalSeconds);
    }
  };

  const adjustTime = (amount, unit) => {
    if (unit === 'minutes') {
      validateAndSet(minutes + amount, setMinutes);
    } else {
      validateAndSet(seconds + amount, setSeconds);
    }
  };

  return (
    <div className="timer-form">
      
      <div className="time-inputs">
        <div className="input-group">
          <label>Минуты</label>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={handleMinutesChange}
          />
          <div className="adjust-buttons">
            <button onClick={() => adjustTime(1, 'minutes')}>+1</button>
            <button onClick={() => adjustTime(-1, 'minutes')}>-1</button>
          </div>
        </div>
        <div className="input-group">
          <label>Секунды</label>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={handleSecondsChange}
          />
          <div className="adjust-buttons">
            <button onClick={() => adjustTime(1, 'seconds')}>+1</button>
            <button onClick={() => adjustTime(-1, 'seconds')}>-1</button>
          </div>
        </div>
      </div>
      <button className="start-button" onClick={handleStart}>
        Старт
      </button>
    </div>
  );
};

export default TimerForm;