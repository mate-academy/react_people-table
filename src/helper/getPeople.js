export const getPeople = async () => {
  const people = await fetch('https://mate-academy.github.io/react_people-table/api/people.json');
  let preparedPeopleData = await people.json();
  preparedPeopleData = preparedPeopleData.map((people, i) => ({
    id: i + 1,
    ...people,
    mother: people.mother
      ? people.mother
      : '',
    father: people.father
      ? people.father
      : '',
    age: people.died - people.born,
    century: Math.ceil(people.died / 100),
    children: preparedPeopleData.map(person => {
      if (people.name === person.father || people.name === person.mother) {
        return person.name;
      }
    })
      .filter(person => person)
      .join(', '),
  }))

  return preparedPeopleData;
}
