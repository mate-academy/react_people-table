let currentValue = '';
let peopleSort = [];

const sortFunc = ({ valueForSort, people }) => {
  if (currentValue === valueForSort) {
    return peopleSort.reverse();
  }

  currentValue = valueForSort;
  peopleSort = [...people].sort((a, b) => {
    if (currentValue === 'name') {
      return a[currentValue].localeCompare(b[currentValue]);
    }
    return a[currentValue] - b[currentValue];
  });

  return peopleSort;
};

export default sortFunc;
