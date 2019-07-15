
// const getPeople = async() => {
//   const Api = 'httpsmate-academy.github.ioreact_people-tableapi';
//   return fetch(`${Api}people.json`).then(respose => respose.json());
// };

// const getPeople = async() => {
//   const Api = 'https://jsonplaceholder.typicode.com/todos';
//   return fetch(`${Api}`).then(respose => respose.json());
// };

// export default getPeople;
import people from './people';

const getPeople = [...people].map((person, index) => ({
  ...person,
  id: index + 1,
  age: person.died - person.born,
  century: Math.ceil(person.died / 100),
  children: [...people]
    .filter(kidd => kidd.father === person.name
|| kidd.mother === person.name)
    .map(parent => parent.name),
}));
export default getPeople;
