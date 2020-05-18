import React from 'react';

interface Props {
  startDebounce: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchPeople: React.FC<Props> = ({ startDebounce }) => {
  return (
    <div className="input-group input-group-lg myInput">
      <input
        type="text"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-lg"
        placeholder="Write for search"
        onChange={e => startDebounce(e)}
      />
    </div>
  );
};
