// Input.js
import React, { useState } from 'react';

function Input({ onInput = () => null, label = '', maxLength = 100000000, type = 'text' }) {
  const [inputValue, setInputValue] = useState('');
  const [inputFocus, setInputFocus] = useState(false);

  const handleChange = event => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(event.target.value, 'value');
    }
    if (type === 'number' && event.target.value.length <= maxLength) {
      setInputValue(event.target.value);
      onInput(event.target.value);
    } else {
      setInputValue(event.target.value);
      onInput(event.target.value);
    }
  };

  return (
    <div className='mt-4 relative'>
      <input
        type={type}
        className='bg-background border border-surface focus:border-primary rounded px-3 py-2 w-48 focus:outline-none z-[1]'
        value={inputValue}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        onChange={handleChange}
        required
        max={maxLength}
      />
      <div
        className={`z-[2] bg-transparent absolute transition-all ${
          inputFocus || inputValue
            ? '-top-2 text-xs bg-background pl-1 pr-1 left-2'
            : 'top-2 text-sm left-3'
        } ${inputFocus ? 'text-primary' : ' text-surface-text opacity-50'}`}
      >
        <label htmlFor='inputField'>{label}</label>
      </div>
    </div>
  );
}

export default Input;
