import React, {useEffect, useState} from "react";
import getPeople from "../helpers/api";
import {PeopleTable} from './PeopleTable';
import './Loading.css';


const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
      getPeople().then(setPeople)},
    []);
return(  <>
    <h1>People Page</h1>
  {people.length===0
    ? <div id="inTurnFadingTextG">
      <div id="inTurnFadingTextG_1" className="inTurnFadingTextG">З</div>
      <div id="inTurnFadingTextG_2" className="inTurnFadingTextG">а</div>
      <div id="inTurnFadingTextG_3" className="inTurnFadingTextG">г</div>
      <div id="inTurnFadingTextG_4" className="inTurnFadingTextG">р</div>
      <div id="inTurnFadingTextG_5" className="inTurnFadingTextG">у</div>
      <div id="inTurnFadingTextG_6" className="inTurnFadingTextG">з</div>
      <div id="inTurnFadingTextG_7" className="inTurnFadingTextG">к</div>
      <div id="inTurnFadingTextG_8" className="inTurnFadingTextG">а</div>
    </div>
    : <PeopleTable people={people} />
  }
    </>
  );

}

export default PeoplePage;
