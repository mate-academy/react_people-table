const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

const getFromServer = async() => {
  const responsePeople = await fetch(`${API_URL}`);
  const people = await responsePeople.json();

  const preparePeople = people.map((person, index) => ({
    ...person,
    id: index + 1,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    children: people
      .filter(child => child.father === person.name
      || child.mother === person.name)
      .map(child => child.name),
  })
  );
  return preparePeople;
};

export default getFromServer;
