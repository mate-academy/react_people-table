const addingClassNamesForTd = (personDetails) => {
  let classNameForTd;
  switch (true) {
    case (personDetails.born < 1650):
        classNameForTd += " personDetails_born-before-1650";
      break;
    case (personDetails.died > 1800):
        classNameForTd += " personDetails_died-after-1800";
      break;
  };
  return classNameForTd;
};

export default addingClassNamesForTd;
