function allData() {
  return fetching(
    'https://mate-academy.github.io/react_people-table/api/people.json'
  );
}

function fetching(url) {
  return fetch(url)
    .then(response => response.json());
}

export { allData };
