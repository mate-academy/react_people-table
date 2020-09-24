const BASE_URL = 'https://mate-academy.github.io';

export function getPeople() {
  return fetch(`${BASE_URL}/react_people-table/api/people.json`)
    .then(result => result.json());
}
