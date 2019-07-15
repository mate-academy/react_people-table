const getData = async() => {
  const peopleLink = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const expectedResult = await fetch(peopleLink);
  const people = await expectedResult.json();

  return people;
};

export default getData;
