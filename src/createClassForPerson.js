const createClassForPerson = (person) => {
  let result = `person person__lived-in-${person.century} `;

  if (person.sex === 'f') {
    result += ` person__female`;
  }

  if (person.sex === 'm') {
    result += ` person__male`;
  }

  if (person.age >= 65) {
    result += ` person__lived-65-and-more`;
  }

  if (person.sex === 'm' && person.children.length > 0) {
    result += ` person__father`;
  }

  if (person.sex === 'f' && person.children.length > 0) {
    result += ` person__mother`;
  }
  return result;
};

export default createClassForPerson;
