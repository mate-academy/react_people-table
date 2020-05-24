import React, {useEffect, useState} from "react";
import getPeople from "../helpers/api";
import {PeopleTable} from './PeopleTable';
import {RouteComponentProps} from 'react-router-dom';

type Props = RouteComponentProps<{
  personSlug: string;
}>

const PeoplePage: React.FC<Props> = ({match}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const personSlug = match.params.personSlug;

  useEffect(() => {
      getPeople().then(setPeople)},
    []);
return(  <>
    <h1>People Page</h1>
  {people.length===0
    ? 'Loading....'
    : <PeopleTable people={people} match={personSlug} />
  }
    </>
  );

}

export default PeoplePage;
