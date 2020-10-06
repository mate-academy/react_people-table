import React, { useEffect, useState, useCallback } from 'react';
import {getPeople} from '../../api/people';
import {PersonRow} from '../PersonRow/PersonRow';
import { useHistory, useLocation } from 'react-router-dom';

export const PeoplePage = ({match}) => {
  const [peopleFromServer, setPeopleFromServer] = useState([])
  const [people, setPeople] = useState([]);
  
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const [name, setName] = useState('');

  useEffect(() => {
    getPeople().then(data => (setPeople(data), setPeopleFromServer(data)));
  }, []);

const filter = () => {
  if (name) {
    setPeople(peopleFromServer.filter(person => 
      person.name.toLowerCase().startsWith(name)
      || (person.motherName && person.motherName.toLowerCase().startsWith(name))
      || (person.fatherName && person.fatherName.toLowerCase().startsWith(name))));
  } else {
    setPeople(peopleFromServer);
  } 
}

useEffect(() => {
filter()
}, [name])

  return (
    <>
    <h1 className="title">This is People Page</h1>
    <input
    className="input is-primary"
     type="text"
     value={name}
     onChange={(event) => {
       setName(event.target.value);
       searchParams.set('query', event.target.value);
       history.push({
         search: searchParams.toString(),
       });
     }}
     >
    </input>
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
     <PersonRow people={people} ></PersonRow>
      </tbody>
    </table>
    </>
  )
}