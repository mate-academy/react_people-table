import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Person from './Person';

const PeopleTable = (people) => {
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
          <td className="head__td">id</td>
          <td className="head__td">name</td>
          <td className="head__td">sex</td>
          <td className="head__td">born</td>
          <td className="head__td">died</td>
          <td className="head__td">mother</td>
          <td className="head__td">father</td>
          <td className="head__td">age</td>
          <td className="head__td">century</td>

        </tr>
      </thead>
      <tbody>
        {
          people.map((person, index) => (
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

PeopleTable.propType = {
  people: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default PeopleTable;
