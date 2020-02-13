import React from 'react';

export default function SortingButtons({ sortBy }) {
  return(
    <div className="btn-group col-sm-10 px-0">
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => sortBy('name')}
      >
        Sort by name
      </button>
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => sortBy('id')}
      >
        Sort by id
      </button>
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => sortBy('sex')}
      >
        Sort by sex
      </button>
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => sortBy('born')}
      >
        Sort by born year
      </button>
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => sortBy('died')}
      >
        Sort by died year
      </button>
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => sortBy('age')}
      >
        Sort by age
      </button>
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => sortBy('century')}
      >
        Sort by century
      </button>
    </div>
  );
}
