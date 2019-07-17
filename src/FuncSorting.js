let direction = '';
let forSortingData = [];

const FuncSorting = ({ sortType, listForSorting }) => {
  if (direction === sortType) {
    return forSortingData.reverse();
  }

  direction = sortType;
  forSortingData = [...listForSorting];
  forSortingData.sort((a, b) => {
    switch (typeof a[sortType]) {
      case 'string':
        return a[sortType].localeCompare(b[sortType]);
      case 'number':
      case 'boolean':
        return a[sortType] - b[sortType];
      default:
        return 0;
    }
  });

  return forSortingData;
};

export default FuncSorting;
