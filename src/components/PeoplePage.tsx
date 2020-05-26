import React from 'react';
import PeopleTable from './PeopleTable';

const PeoplePage = () => {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            People page
          </h1>
          <PeopleTable />
        </div>
      </div>
    </section>
  );
};

export default PeoplePage;
