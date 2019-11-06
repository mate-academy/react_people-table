import React from 'react';
import './inputFilter.css'

export default function InputFilter({ changeInput, input }) {
  return (
    <input
      type="text"
      className="form-control col-sm-10 bg-dark text-white"
      placeholder="What is need to be filtered?"
      onChange={changeInput}
      value={input}
    />
  );
}
