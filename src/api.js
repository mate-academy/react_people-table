// 3 identical functions

export function getPeopleThen() {
  return fetch('http://localhost:3000/api/people.json')
    .then(response => response.json())
}

export async function getPeopleAwait() {
  const response = await fetch('http://localhost:3000/api/people.json')

  return response.json();
}

export async function getPeople() {
  const response = await fetch('http://localhost:3000/api/people.json')
  const people = await response.json();

  return people;
}

export const get10People = async () => {
  const people = await getPeople();

  return people.slice(10, 20);
}
