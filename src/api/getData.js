const getData = async() => {
  const peopleUrl = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const responsePosts = await fetch(peopleUrl);
  const people = await responsePosts.json();

  return people;
};

export default getData;
