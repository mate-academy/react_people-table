const getPeople = async () => {
  const link = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const response = await fetch(link);
  const peopleFromServer = await response.json();

  return peopleFromServer.map((person, index) => ({
    id: index + 1,
    ...person,
    age: person.died - person.born,
    motherName: person.mother,
    fatherName: person.father,
    century: Math.ceil(person.died / 100),
    children: peopleFromServer
      .filter(child => (
        child.father === person.name || child.mother === person.name
      ))
      .map(child => child.name).join(', '),
  }));
};

export default getPeople;
