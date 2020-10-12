// eslint-disable-next-line max-len
const peoples = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async() => {
  const response = await fetch(peoples);
  const people = response.json();

  return people;
};
