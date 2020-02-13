function gettingData(url) {
  return fetch(url)
    .then(response => response.json());
}

const tableData = gettingData('https://mate-academy.github.io/react_people-table/api/people.json');

export { tableData };
