const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

const getFromServer = async() => {
  const responsePeople = await fetch(`${API_URL}`);
  const people = await responsePeople.json();
return people;
};

export default getFromServer;
