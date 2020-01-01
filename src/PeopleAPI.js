/* eslint-disable-next-line */
const URLPeople = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async() => {
  const response = await fetch(URLPeople);

  return response.json();
};
