import React, {useEffect, useMemo, useState} from "react";
import getPeople from "../helpers/api";
import {PeopleTable} from './PeopleTable';
import {useLocation} from "react-router-dom";


const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';


  useEffect(() => {
      getPeople().then(setPeople)
    },
    []);
  const toLowerQuery = query.toLowerCase();

  const visiblePeople = useMemo(() =>
    people.filter(person =>
      person.name.toLowerCase().includes(toLowerQuery)
      || (person.fatherName !== null
      ? person.fatherName.toLowerCase().includes(toLowerQuery)
      : '')
      || (person.motherName !== null
      ? person.motherName.toLowerCase().includes(toLowerQuery)
      : '')
    ), [toLowerQuery, people]);


  return <>
    <h1>People Page</h1>
    <div className="search ">

    </div>
    {people.length === 0
      ? 'Loading....'
      : <PeopleTable people={visiblePeople}/>
    }
  </>;

}

export default PeoplePage;
