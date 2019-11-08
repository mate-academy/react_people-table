const api
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

const getData = url => fetch(url)
  .then(response => response.json());

const peopleList
  = getData(api);

export default peopleList;
