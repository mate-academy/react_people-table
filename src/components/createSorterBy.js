let sortedPeople = [];
let currentKey = '';

const createSorterBy = ({ sortField, people }) => {
  if (currentKey === sortField) {
    return sortedPeople.reverse();
  }

  currentKey = sortField;

  sortedPeople = [...people].sort((a, b) => {
    switch (typeof a[sortField]) {
      case 'string':
        return a[sortField].localeCompare(b[sortField]);

      case 'number':
      case 'boolean':
        return a[sortField] - b[sortField];

      default:
        return 0;
    }
  });

  return sortedPeople;
};

export default createSorterBy;
