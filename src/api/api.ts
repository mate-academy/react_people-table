import { PeopleListInterface } from '../interfaces';

// const URL_API = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getData = async (): Promise<PeopleListInterface[]> => {
  const data = await fetch('https://mate-academy.github.io/react_people-table/api/people.json').then(respond => respond.json());

  return data;
};

// export const getPrepearedList = async () => {
//   const people = await getData(URL_API);

//   return people;
// };
