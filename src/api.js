export const getPeople = async() => {
  const url = 'https://mate-academy.github.io/react_people-table/api';
  return fetch(`${url}/people.json`)
    .then(res => res.json());
};
