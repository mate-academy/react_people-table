function sort (users, sortBy) {
  if (sortBy === 'sex') {
    return users.sort((a, b) => a.sex.localeCompare(b.sex));
  } else if (sortBy === 'id') {
    return users.sort((a, b) => a.id - b.id);
  } else if (sortBy === 'born') {
    return users.sort((a, b) => a.born - b.born);
  } else if (sortBy === 'age') {
    return users.sort((a, b) => a.age - b.age);
  } else if (sortBy === 'century') {
    return users.sort((a, b) => a.century - b.century);
  } else if (sortBy === 'died') {
    return users.sort((a, b) => a.died - b.died);
  }
}

export default sort;
