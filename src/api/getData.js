const getData = async() => {
  const url
   = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const responsePeople = await fetch(url);
  const people = await responsePeople.json();

  return people
    .map((person, index) => ({
      ...person,
      index: index + 1,
      age: person.died - person.born,
      century: Math.ceil(person.died / 100),
      motherName: person.mother,
      fatherName: person.father,
    }))
    .map((person, index, preparedPeople) => (
      Object.assign(person, {
        mother: preparedPeople.find(woman => woman.name === person.motherName),
        father: preparedPeople.find(man => man.name === person.fatherName),
        children: preparedPeople
          .filter(child => child.motherName === person.name
            || child.fatherName === person.name),
      })
    ));
};

export default getData;
