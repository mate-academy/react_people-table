import React from 'react';
import sort from './sort';

function ListUsers(props) {
  const list = props.list;
  let users = props.list.users;
  const value = props.list.value;
 
  if(list.isLoaded && users === null) {
    return <p>...loading</p>
  } else if (!list.isLoaded && users === null) {
    return <p>not loaded</p>
  } else if (list.isLoaded && users !== null) {
    if(value !== '') {
      users = users.filter(
        user =>
          user.name.toLowerCase().includes(value.trim().toLowerCase()) ||
          user.mother.toLowerCase().includes(value.trim().toLowerCase()) ||
          user.father.toLowerCase().includes(value.trim().toLowerCase())
      );
    }
    if(list.sortBy !== null) {
      users = sort(users, list.sortBy);
    }

    return (
      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>name</td>
            <td>sex</td>
            <td>age</td>
            <td>century</td>
            <td>born</td>
            <td>died</td>
            <td>mother</td>
            <td>father</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr
                key={user.id + user.name}
                className={
                  (`Person--lived-in-${user.century}`,
                  user.age >= 65 ? "green" : "red")
                }
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.sex}</td>
                <td>{user.age}</td>
                <td>{user.century}</td>
                <td>{user.born}</td>
                <td>{user.died}</td>
                <td>{user.mother}</td>
                <td>{user.father}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default ListUsers;
