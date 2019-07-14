const addingClassNames = (personDetails) => {
  let className = `person person__lived-in-${personDetails.century}`;
    switch (true) {
      case (personDetails.sex === 'f'):
        className += " personDetails_female";
        break;
      case ((personDetails.sex === 'm') && (personDetails.children.length > 0)):
        className += " personDetails_father";
        break;
      case ((personDetails.sex === 'f') && (personDetails.children.length > 0)):
        className += " personDetails_mother";
        break;
    };

    switch (true) {
      case (personDetails.age > 65):
        className += " person__age-more-then-65";
        break;
    };
   return className;
};

export default addingClassNames;
