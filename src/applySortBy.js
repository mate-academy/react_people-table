let sortedPersons = [];
let currentFiled = '';

const applySortBy = ({ sortFiled, people }) => {
  if (currentFiled === sortFiled) {
    return sortedPersons.reverse();
  }

  currentFiled = sortFiled;

  sortedPersons = [...people].sort((a, b) => {
    switch (typeof a[sortFiled]) {
      case 'string':
        return a[sortFiled].localeCompare(b[sortFiled]);

      case 'number':
      case 'boolean':
        return a[sortFiled] - b[sortFiled];

      default:
        return 0;
    }
  });

  return sortedPersons;
};

export default applySortBy;
