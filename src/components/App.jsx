import React, {useEffect, useState} from 'react';
import TimerForm from './TimerForm';
import TimerControls from './TimerControls';
import TimerDisplay from './TimerDisplay';
import TimerCompletionModal from './TimerCompletionModal';


const App = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // восстановление из localStorage
  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('timerState'));
    if (savedState) {
      setRemainingTime(savedState.remainingTime);
      setInitialTime(savedState.initialTime);
      setIsRunning(savedState.isRunning);
      setIsPaused(savedState.isPaused);
      setShowForm(savedState.showForm);
    }
  }, []);

  // сохранение в localStorage
  useEffect(() => {
    const timerState = {
      remainingTime,
      initialTime,
      isRunning,
      isPaused,
      showForm,
    };
    localStorage.setItem('timerState', JSON.stringify(timerState));
  }, [remainingTime, initialTime, isRunning, isPaused, showForm]);

  // обратный отсчет
  useEffect(() => {
    let interval;
    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            setShowCompletionModal(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, remainingTime]);

  const handleStart = (totalSeconds) => {
    setRemainingTime(totalSeconds);
    setInitialTime(totalSeconds);
    setIsRunning(true);
    setIsPaused(false);
    setShowForm(false);
  };

  const handlePauseResume = () => {
    if (remainingTime > 0) {
      setIsRunning(!isRunning);
      setIsPaused(!isRunning);
    }
  };

  const handleReset = () => {
    setRemainingTime(initialTime);
    setIsRunning(false);
    setIsPaused(false);
  };

  const handleNewTimer = () => {
    setRemainingTime(0);
    setIsRunning(false);
    setIsPaused(false);
    setShowForm(true);
  };

  const closeCompletionModal = () => {
    setShowCompletionModal(false);
    handleNewTimer();
  };

  return (
    <div className="countdown-timer">
      <h1>ТАЙМЕР</h1>
      {showForm ? (
        <TimerForm onStart={handleStart} />
      ) : (
        <>
          <TimerDisplay time={remainingTime} isRunning={isRunning} />
          <TimerControls
            onPauseResume={handlePauseResume}
            onReset={handleReset}
            onNewTimer={handleNewTimer}
            isRunning={isRunning}
            isPaused={isPaused}
          />
        </>
      )}
      {showCompletionModal && <TimerCompletionModal onClose={closeCompletionModal} />}
    </div>
  );
};

export default App;