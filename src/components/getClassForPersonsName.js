const getClassForPersonsName = (person) => {
  let result = '';

  if (person.born < 1650) {
    result += `person__born-before-1650`;
  }

  if (person.died > 1800) {
    result += `person__died-after-1800`;
  }

  return result;
};

export default getClassForPersonsName;
