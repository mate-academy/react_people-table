const peopleURL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = () => fetch(peopleURL)
  .then(response => response.json());
