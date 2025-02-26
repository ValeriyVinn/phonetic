import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import css from './Timer.module.css';

const Timer = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [iterations, setIterations] = useState(0);
  const [maxIterations, setMaxIterations] = useState(1);
  const [minDelay, setMinDelay] = useState(60);
  const [maxDelay, setMaxDelay] = useState(300);
  const [restTime, setRestTime] = useState(30);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning && iterations < maxIterations) {
      const delay = Math.floor(
        Math.random() * (maxDelay - minDelay + 1) + minDelay
      );
      const timer = setTimeout(() => {
        setCountdown(restTime);
        setModalOpen(true);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [iterations, isRunning, maxIterations, minDelay, maxDelay, restTime]);

  useEffect(() => {
    if (isModalOpen && countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isModalOpen) {
      setModalOpen(false);
      setIterations(prev => prev + 1);

      // Зупиняємо таймер, якщо всі ітерації завершені
      if (iterations + 1 >= maxIterations) {
        setIsRunning(false);
      }
    }
  }, [isModalOpen, countdown, iterations, maxIterations]);

  const startTimer = () => {
    setIterations(0); // Скидаємо ітерації
    setIsRunning(true);
  };

  return (
    <div className={css.restTimer}>
      <div>
           <a
        href="https://www.youtube.com/watch?v=wIVst5U9wDM"  target="_blank" rel="noreferrer"
        // https://www.youtube.com/shorts/0zQaNicTyCM
        className={css.restTimerHeader} 
      >
        Training timer
      </a>
      <a
        href="https://www.youtube.com/shorts/0zQaNicTyCM"  target="_blank" rel="noreferrer"
        // 
        className={css.restTimerHeader} 
      >
        En
      </a>   
      </div>

      {/* <h3 className={css.restTimerHeader}>Training timer</h3> */}
      <div>
        <label>
          Attempt:
          <input
            type="number"
            value={maxIterations}
            onChange={e => setMaxIterations(Number(e.target.value))}
            min="1"
            max="20"
          />
        </label>
      </div>
      <div>
        <label className={css.min}>
          Min:
          <input
            type="number"
            value={minDelay}
            onChange={e => setMinDelay(Number(e.target.value))}
            min="10"
          />
        </label>
        <label>
          Max:
          <input
            type="number"
            value={maxDelay}
            onChange={e => setMaxDelay(Number(e.target.value))}
            max="600"
          />
        </label>
      </div>
      <div>
        <label>
          Rest:
          <input
            type="number"
            value={restTime}
            onChange={e => setRestTime(Number(e.target.value))}
            min="30"
            max="120"
          />
        </label>
      </div>
      <button
        onClick={startTimer}
        disabled={isRunning}
        className={css.buttonTimer}
      >
        Start Timer
      </button>

      {isModalOpen && (
        <Modal closeModal={() => setModalOpen(false)}>
          <div className={css.restTimerModal}>
            {/* <h2 className={css.restTimerHeader}>Rest Timer</h2> */}
            <p className={css.restTimerCountdown}>
              {Math.floor(countdown / 60)
                .toString()
                .padStart(2, '0')}
              :{(countdown % 60).toString().padStart(2, '0')}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Timer;
