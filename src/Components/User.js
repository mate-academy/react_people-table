import React from 'react';

const User = ({ user, isSelected, selectUser }) => {
  let sex, lifeDuration, selectedClass = '';
  user.sex === 'm' ? sex = 'male' : sex = 'female';
  user.born < 1650 ? lifeDuration = 'line-through'
    : user.died > 1800
      ? lifeDuration = 'bold'
      : lifeDuration = 'normal';

  if(isSelected) {
    selectedClass = 'Person--selected';
  }

  return (
    <tr
      className={`user--lived-in-${user.century} ${selectedClass}`}
      onClick={selectUser}
    >
      <td>{user.id}</td>
      <td>{user.century}</td>
      <td className={lifeDuration}>{user.name}</td>
      <td className={`user--${sex}`}>{user.sex}</td>
      <td>{user.born}</td>
      <td>{user.died}</td>
      <td>{user.age}</td>
      <td>{user.mother}</td>
      <td>{user.father}</td>
    </tr>
  );
};

export default User;
