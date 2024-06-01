import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './IncrementDecrementBtn.css';

function IncrementDecrementBtn({
  minValue = 0,
  maxValue = 100,
  onChange,
}: {
  minValue?: number;
  maxValue?: number;
  onChange: (value: number) => void;
}) {
  const [count, setCount] = useState(minValue);

  useEffect(() => {
    onChange(count);
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

IncrementDecrementBtn.propTypes = {
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

IncrementDecrementBtn.defaultProps = {
  minValue: 0,
  maxValue: 100,
};

export default IncrementDecrementBtn;
