export function getPeople() {
  return fetch('http://localhost:3000/api/people.json')
    .then(response => response.json())
    .catch(() => []);
}

export function get10People() {
  return getPeople()
    .then(people => people.slice(10, 20));
}
