const getPeople = async() => {
  const url = 'https://mate-academy.github.io/react_people-table/api';
  const response = await fetch(`${url}/people.json`);
  const people = await response.json();

  return people
    .map((person, i) => ({
      ...person,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      id: i + 1,
      fatherData: people.filter(man => (
        person.father === man.name
      )),
      motherData: people.filter(woman => (
        person.mother === woman.name
      )),
      children: people.filter(child => (
        person.name === child.mother || person.name === child.father
      )).map(child => child.name).join(', '),
    }));
};

export default getPeople;
