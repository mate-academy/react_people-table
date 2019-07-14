const getDataFromServer = async() => {
  const linkToServer = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const expectedData = await fetch(linkToServer);
  const listOfPersons = await expectedData.json();

  return listOfPersons.map((person, index) => ({
    ...person,
    id: index + 1,
    century: (Math.ceil(person.died / 100)),
    age: person.died - person.born,
    children: listOfPersons
      .filter(child => child.father === person.name
      || child.mother === person.name)
      .map(human => human.name),
  }));
};

export default getDataFromServer;
