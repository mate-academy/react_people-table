let currentValue = '';

const sortFunc = ({ valueForSort, people }) => {
  if (currentValue === valueForSort) {
    return [...people].reverse();
  }

  currentValue = valueForSort;
  return [...people].sort((a, b) => {
    if (currentValue === 'name') {
      return a[currentValue].localeCompare(b[currentValue]);
    }
    return a[currentValue] - b[currentValue];
  });
};

export default sortFunc;
