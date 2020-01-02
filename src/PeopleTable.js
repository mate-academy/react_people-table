import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Person from './Person';

const PeopleTable = ({ peopleList }) => {
  const [setSelectedPerson] = useState('Person--selected');
  const [personInURL, setPersonInURL] = useState(null);

  const changeSelected = (name) => {
    setSelectedPerson(name);
  };

  const location = useLocation();
  let personFromURL = location.pathname.match(/(people\/.+(?=\/|:|\?|\b))/g);

  if (personFromURL) {
    const [stringFromUrl] = personFromURL;

    personFromURL = stringFromUrl.split('/');
    const [, personFromString] = personFromURL;

    personFromURL = personFromString.split('-').join(' ');
  }

  if ((!personInURL && personFromURL) || personInURL !== personFromURL) {
    setPersonInURL(personFromURL);
  }

  return (
    <table className="people__table">
      <thead className="table__head">
        <tr>
          <td>id</td>
          <td>name</td>
          <td>sex</td>
          <td>born</td>
          <td>died</td>
          <td>mother</td>
          <td>father</td>
          <td>age</td>
          <td>century</td>

        </tr>
      </thead>
      <tbody>
        {
          peopleList.map((person, index) => (
            <Fragment key={person.name}>
              <Person
                person={person}
                index={index}
                changeSelected={changeSelected}
                personInURL={personInURL}
              />
            </Fragment>
          ))
        }
      </tbody>
    </table>
  );
};

PeopleTable.propTypes = {
  peopleList: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default PeopleTable;
