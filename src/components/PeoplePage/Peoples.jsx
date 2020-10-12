// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';

export const Peoples = () => {
  const tableTitle = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

  // useEffect(()=>{

  // }, []);

  return (
    <>
      <h1>Peoples Page</h1>
      <table>
        <thead>
          {tableTitle.map(item => (
            <tr key={item}>{item}</tr>
          ))}
        </thead>
        <tbody />
      </table>
    </>
  );
};
