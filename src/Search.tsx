import React, { useState } from 'react';

interface Props {
  setFiltered: (value: string) => (void);
  value: string;
}

export const Search: React.FC<Props>  = ({ setFiltered, value }) => {
  const [inputValue, setInputValue] = useState(`${value}`)
  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setInputValue(value);
    setFiltered(value)
  }
  return (
    <input
      value={inputValue}
      type="text"
      placeholder="press name to find"
      onChange={(event) => handleInput(event)}
    />
  )
};
