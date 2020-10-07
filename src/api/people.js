// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async() => {
  const response = await fetch(BASE_URL);
  const people = response.json();

  return people;
};
