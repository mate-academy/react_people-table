let direction = '';
let sortedData = [];

const SortPlant = ({ sortType, peopleTemplate }) => {
  if (direction === sortType) {
    return sortedData.reverse();
  }
  direction = sortType;
  sortedData = [...peopleTemplate];
  sortedData.sort((a, b) => {
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
   return sortedData;
};

export default SortPlant;
