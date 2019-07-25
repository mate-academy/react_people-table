import React from 'react';

const getUsers = async() => {
  const data = await fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then(response => response.json());
  return data.map((user, index) => {
    return {
      id: index + 1,
      ...user,
      age: user.died - user.born,
      century: Math.ceil(user.died / 100),
    };
  });
};

export default getUsers;
