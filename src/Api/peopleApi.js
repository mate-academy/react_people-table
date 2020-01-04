// eslint-disable-next-line max-len
const getPeople = () => fetch('https://mate-academy.github.io/react_people-table/api/people.json')
  .then(response => (response.ok ? response.json() : []))
  .catch(() => 'Error');

export default getPeople;
