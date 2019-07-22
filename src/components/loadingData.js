export const loadData = async(url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getChildren = (people, person) => (
  people.filter(currenPerson => (
    currenPerson.mother === person.name || currenPerson.father === person.name
  )));

export const getPeopleWhithChildren = async() => {
  const url = './api/people.json';

  const people = await loadData(url);

  const peopleWhithChildren = people.map((currentPerson, currentIndex) => (
    {
      ...currentPerson,
      id: currentIndex,
      age: currentPerson.died - currentPerson.born,
      century: Math.ceil(currentPerson.died / 100),
      children: getChildren(people, currentPerson).map(child => child.name),
    }
  ));

  return peopleWhithChildren;
};
