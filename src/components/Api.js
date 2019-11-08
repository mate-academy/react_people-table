const loadedPeople = () => (
  fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then(response => response.json())
);

export default loadedPeople;
