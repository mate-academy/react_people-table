const getUrl = url => fetch(url)
  .then(response => response.json());

const peopleList
  = getUrl('https://mate-academy.github.io/react_people-table/api/people.json');

export default peopleList;
