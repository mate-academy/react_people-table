const createClassForName = (person) => {
  let result = '';

  if (person.born < 1650) {
    result += `person__born-before`;
  }

  if (person.died > 1800) {
    result += `person__died-after`;
  }

  return result;
};

export default createClassForName;
