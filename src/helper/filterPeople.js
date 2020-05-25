export const filterPeople = (query, people) => {
  if (!query) {
    return people;
  }

  const filter = people
    .filter(person => {
      const { name } = person;
      const { mother } = person;
      const { father } = person;
      const searchQuery = query.toLowerCase();

      if (!searchQuery) {
        return false;
      }

      if (name.toLowerCase().includes(searchQuery)
        || mother.toLowerCase().includes(searchQuery)
        || father.toLowerCase().includes(searchQuery)) {
        return true;
      }

      return false;
    });

  return filter;
}
