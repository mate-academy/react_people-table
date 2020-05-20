export const sortPeople = (people, sortParam, sortType) => {
  return [...people].sort(
    (a, b) => {
      const comperator1 = a[sortParam];
      const comperator2 = b[sortParam];

      if (sortType === 'number') {
        return comperator1 - comperator2;
      }

      if (sortType === 'string') {
        return (comperator1).localeCompare(comperator2);
      }

      return 0;
    });
};
