import propTypes from 'prop-types';

const baseUrl = 'https://mate-academy.github.io';

const getPeople = async() => {
  const url = '/react_people-table/api/people.json';
  const response = await fetch(`${baseUrl}${url}`);
  const people = await response.json();

  return people.map((person, index) => ({
    id: index + 1,
    ...person,
    age: person.died - person.born,
    century: Math.ceil(person.died / 100),
    children: person.sex === 'm'
      ? people.filter(child => child.father === person.name)
      : people.filter(child => child.mother === person.name),
  }));
};

getPeople.propTypes = {
  person: propTypes.shape({
    father: propTypes.string,
    mother: propTypes.string,
    sex: propTypes.string,
    died: propTypes.number,
    born: propTypes.number,
  }),
};

export default getPeople;
