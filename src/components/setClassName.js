export const addClassForName = (person) => {
  let className = '';

  if (person.born < 1650) {
    className += 'born-before-1650';
  }

  if (person.died > 1800) {
    className += 'died-after-1800';
  }

  return className;
};

export const addClassForPerson = (person) => {
  let className = `person person--lived-in-${person.century}`;

  if (person.sex === 'm') {
    className += ' person--male';
  }

  if (person.sex === 'f') {
    className += ' person--female';
  }

  if (person.age > 65) {
    className += ' over-65';
  }

  if (person.sex === 'f' && person.children.length > 0) {
    className += ' person--mother';
  }

  if (person.sex === 'm' && person.children.length > 0) {
    className += ' person--father';
  }

  return className;
};
