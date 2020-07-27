import React, { useState } from 'react';

interface Props {
  setQuery: (value: string) => (void);
  value: string;
}

export const Search: React.FC<Props>  = ({ setQuery, value }) => {
  const [inputValue, setInputValue] = useState(`${value}`)
  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setInputValue(value);
    setQuery(value)
  }
  return (
    <input
      value={inputValue}
      type="text"
      placeholder="Enter name to find"
      onChange={(event) => handleInput(event)}
    />
  )
};
