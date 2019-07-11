const getClassForPersonsInfo = (person) => {
  let result = `person person__lived-in-${person.century}`;

  if (person.sex === 'f') {
    result += ` person__female`;
  }

  if (person.sex === 'm') {
    result += ` person__male`;
  }

  if (person.age > 65) {
    result += ` person__lived-at-least-65`;
  }

  if (person.sex === 'm' && person.children.length > 0) {
    result += ` person__father`;
  }

  if (person.sex === 'f' && person.children.length > 0) {
    result += ` person__mother`;
  }

  return result;
};

export default getClassForPersonsInfo;
