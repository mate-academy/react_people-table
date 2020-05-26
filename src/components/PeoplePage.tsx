import React, {useEffect, useState} from "react";
import getPeople from "../helpers/api";
import {PeopleTable} from './PeopleTable';
import {RouteComponentProps} from 'react-router-dom';

type Props = RouteComponentProps<{
  personSlug: string;
}>

const PeoplePage: React.FC<Props> = () => {
  const [people, setPeople] = useState<Person[]>([]);


  useEffect(() => {
      getPeople().then(setPeople)},
    []);
return(  <>
    <h1>People Page</h1>
  {people.length===0
    ? 'Loading....'
    : <PeopleTable people={people} />
  }
    </>
  );

}

export default PeoplePage;
