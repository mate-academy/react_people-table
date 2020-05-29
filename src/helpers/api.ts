const urlWithPeople = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async (): Promise<Person[]> => {
  const dataFromServer = await fetch(urlWithPeople);
  const people = await dataFromServer.json();

  return people;
};
