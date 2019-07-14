import React from 'react';
import User from './User';

const PeopleTable = ({ users }) => (
  <table className="people-table">
    <thead>
    <tr>
      <th>ID</th>
      <th>century</th>
      <th>name</th>
      <th>sex</th>
      <th>born</th>
      <th>died</th>
      <th>age</th>
      <th>mother</th>
      <th>father</th>
    </tr>
    </thead>
    <tbody>
    {users.map(user => (
      <User user={user}/>
    ))}
    </tbody>
  </table>
);

export default PeopleTable;
