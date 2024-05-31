import React, { useState, useEffect } from 'react';
import './IncrementDecrementBtn.css';

function IncrementDecrementBtn({
  minValue = 0,
  maxValue = 100,
  onChange,
}: {
  minValue: number;
  maxValue: number;
  onChange: (value: number) => void; // onChange prop type
}) {
  const [count, setCount] = useState(minValue);

  useEffect(() => {
    onChange(count); // Call the onChange callback whenever count changes
  }, [count, onChange]);

  const handleIncrementCounter = () => {
    if (count < maxValue) {
      setCount((prevState) => prevState + 1);
    }
  };

  const handleDecrementCounter = () => {
    if (count > minValue) {
      setCount((prevState) => prevState - 1);
    }
  };

  return (
    <div className="btn-group">
      <button
        type="button"
        className="increment-btn"
        onClick={handleDecrementCounter}
        aria-label="Decrement"
      >
        <span className="material-symbols-outlined">-</span>
      </button>
      <p>{count}</p>
      <button
        type="button"
        className="decrement-btn"
        onClick={handleIncrementCounter}
        aria-label="Increment"
      >
        <span className="material-symbols-outlined">+</span>
      </button>
    </div>
  );
}

export default IncrementDecrementBtn;
