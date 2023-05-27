import React, { useState, useEffect } from "react";

//sub component
import AddFocusSession from "./AddFocusSession";

const FocusTimer = () => {
  const [timer, setTimer] = useState(1 * 60);
  const [timerDuration, setTimerDuration] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [alertDisplayed, setAlertDisplayed] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && isPaused) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (!isPaused && timer !== 0) {
      clearInterval(interval);
    }

    // Check if the timer is 0 and the alert has not been displayed yet
    if (timer === 0 && !alertDisplayed) {
      setIsActive(false);
      setIsPaused(false);
      setAlertDisplayed(true);
      alert("Time's up!");
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, timer, alertDisplayed]);

  // Reset the alertDisplayed state when timer is reset or started
  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimer(timerDuration * 60);
    setAlertDisplayed(false);
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    // Only reset the timer if it's not currently active
    if (!isActive) {
      setTimer(timerDuration * 60);
    }
    setAlertDisplayed(false);
  };

  const handlePause = () => {
    setIsPaused(false);
  };

  const handleDurationSelect = (e) => {
    setTimerDuration(e.target.value);
  };

  return (
    <div className="text-center space-y-4">
      <div>
        <h4 className="py-4">Select timer duration:</h4>
        <select value={timerDuration} onChange={handleDurationSelect}>
          <option value={1}>1 minute</option>
          <option value={5}>5 minutes</option>
          <option value={10}>10 minutes</option>
        </select>
      </div>
      <div className="text-5xl">{`${Math.floor(timer / 60)}:${
        timer % 60 < 10 ? "0" : ""
      }${timer % 60}`}</div>
      <div className="space-x-4">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      {alertDisplayed && <AddFocusSession />}
    </div>
  );
};

export default FocusTimer;
