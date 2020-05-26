import React, {useEffect, useState} from "react";
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


    const visiblePeople = people.filter( person =>
    person.name.toLowerCase().includes(query.toLowerCase())
      || (person.fatherName!==null
      ?person.fatherName.toLowerCase().includes(query.toLowerCase())
      :'')
      || (person.motherName!==null
      ?person.motherName.toLowerCase().includes(query.toLowerCase())
      :'')

    )


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
