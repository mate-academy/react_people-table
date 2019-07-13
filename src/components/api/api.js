const API_URL = 'https://mate-academy.github.io/react_people-table/api/';

export default async() => {
  const response = await fetch(`${API_URL}people.json`);
  const users = await response.json();

  return users;
};
