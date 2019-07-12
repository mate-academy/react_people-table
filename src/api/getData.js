const getData = async() => {
  const url = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const responsePeople = await fetch(url);
  const people = await responsePeople.json();

  return people;
};

export default getData;
