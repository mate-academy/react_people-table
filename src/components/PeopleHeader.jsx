export const PeopleHeader = ({ selectedPeopleNames }) => {
  return (
    <h1 className="title">
      {selectedPeopleNames.length === 0 ? (
        'People table'
      ) : (
        `Selected person is ${selectedPeopleNames}`
      )}
    </h1>
  );
};
