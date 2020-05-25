import React from 'react';

interface Props {
  startDebounce: (str: string) => void;
  inputValue: string
}

export const SearchPeople: React.FC<Props> = ({ startDebounce, inputValue }) => (
  <div className="input-group input-group-lg myInput">
    <input
      type="text"
      className="form-control"
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-lg"
      placeholder="Write for search"
      value={inputValue}
      onChange={e => {
        startDebounce(e.target.value);
      }}
    />
  </div>
);

