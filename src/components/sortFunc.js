const sortFunc = (people, valueForSort, isTheSame = false) => {
  if (isTheSame) {
    return [...people].reverse();
  }

  return  [...people].sort((a, b) => {
    if (valueForSort === 'name') {
      return a[valueForSort].localeCompare(b[valueForSort]);
    }
    return a[valueForSort] - b[valueForSort];
  });
};

export default sortFunc;
