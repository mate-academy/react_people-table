import PropTypes from 'prop-types';

export const appPropTypes = {
  startLoading: PropTypes.func.isRequired,
  finishLoading: PropTypes.func.isRequired,
  setUsers: PropTypes.func.isRequired,
  setUsersToShow: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAddingNew: PropTypes.bool.isRequired,
};

export const peopleTablePropTypes = {
  usersToShow: PropTypes.arrayOf(PropTypes.object).isRequired,
  filterUsers: PropTypes.func.isRequired,
  sortUsers: PropTypes.func.isRequired,
  isAddingNew: PropTypes.bool.isRequired,
  addNewPerson: PropTypes.func.isRequired,
};

const titlesShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
});

export const personPropTypes = {
  person: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    century: PropTypes.number.isRequired,
    born: PropTypes.number.isRequired,
    died: PropTypes.number.isRequired,
    mother: PropTypes.string.isRequired,
    father: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  selectedId: PropTypes.number.isRequired,
  handlePersonClick: PropTypes.func.isRequired,
  titles: PropTypes.arrayOf(titlesShape).isRequired,
};

export const newPersonPropTypes = {
  addUser: PropTypes.func.isRequired,
  addUserToShows: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
