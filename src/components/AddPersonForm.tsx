import React, { useState, ChangeEvent } from 'react';
import { AddPersonInputs } from './AddPersonInputs';
import { AddPersonButton } from './AddPersonButton';
import { SexSelect } from './SexParametrs';
import { AddFather } from './AddFather';
import { AddMother } from './AddMother';
import { Redirect } from 'react-router-dom'

const pattern = /[0-9]| {2}|\!|\.|\@|\#|\$|\%|\^|\&|\*|\(|\)|^\s+/g;
const currentYear = new Date().getFullYear();

interface Props {
  people: People[];
  addPerson: (
    name: string, born: string, died: string,
    sex: string, father: string, mother: string,
  ) => void;
}

export const AddPersonForm: React.FC<Props> = ({ people, addPerson }) => {
  const [nameValue, setNameValue] = useState('');
  const [bornValue, setBornValue] = useState('');
  const [diedValue, setDiedValue] = useState('');
  const [gender, setGender] = useState('');
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [errorMother, setErrorMother] = useState(false);
  const [errorFather, setErrorFather] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorBorn, setErrorBorn] = useState(false);
  const [errorDied, setErrorDied] = useState(false);
  const [minusDifference, setMinusDifference] = useState(false);
  const [bigDifference, setBigDifference] = useState(false);
  const [errorGender, setErrorGender] = useState(false);


  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value.replace(pattern, ''));

    if (!e.target.value) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
  };

  const handleInputAgeInfo = (e: ChangeEvent<HTMLInputElement>, order: string) => {
    const eventValue = e.target.value.replace(/\D/g, '');

    if (order === 'born') {
      setBornValue(eventValue);

      if (!e.target.value) {
        setErrorBorn(true);
        setBigDifference(false);
      } else {
        setErrorBorn(false);
        setErrorDied(false);
        setMinusDifference(false);
        setBigDifference(false);
      }
    }

    if (order === 'died') {
      setDiedValue(eventValue);

      if (!eventValue) {
        setErrorDied(true);
        setBigDifference(false);
      } else {
        setErrorBorn(false);
        setErrorDied(false);
        setBigDifference(false);
        setMinusDifference(false);
      }
    }
  };

  const blurValidation = (blurParam: string) => {
    if (!nameValue) {
      if (blurParam === 'name') {
        setErrorName(true);

        return;
      }
    }

    if (+bornValue > currentYear || !bornValue) {
      if (blurParam === 'born') {
        setErrorBorn(true);

        return;
      }
    }

    if (+diedValue > currentYear || !diedValue) {
      if (blurParam === 'died') {
        setErrorDied(true);
      }
    }
  };

  const validation = () => {
    let isError = false;

    if (+bornValue > +diedValue) {
      setMinusDifference(true);
      setErrorDied(true);
      setErrorBorn(true);
      isError = true;

      return;
    }

    if (!nameValue) {
      setErrorName(true);
      isError = true;
    }

    if (+bornValue > currentYear || !bornValue) {
      setErrorBorn(true);
      isError = true;
    }

    if (+diedValue > currentYear || !diedValue) {
      setErrorDied(true);
      isError = true;
    }

    if (+diedValue - +bornValue > 150) {
      setBigDifference(true);
      setErrorDied(true);
      setErrorBorn(true);
      isError = true;

      return;
    }

    if (!father) {
      setErrorFather(true);
      isError = true;
    }

    if (!mother) {
      setErrorMother(true);
      isError = true;
    }

    if (!gender) {
      setErrorGender(true);
      isError = true;
    }

    if (!isError) {
      setIsAdd(true);
      addPerson(nameValue, bornValue, diedValue, gender, father, mother);
      reset();
    }
  };

  const chooseGenderStatus = (param: string) => {
    setGender(param);
    setErrorGender(false);
  };

  const chooseFather = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFather(e.target.value);
    setErrorFather(false);
  };

  const chooseMother = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMother(e.target.value);
    setErrorMother(false);
  };

  const reset = () => {
    setNameValue('');
    setBornValue('');
    setDiedValue('');
    setGender('');
    setFather('');
    setMother('');
    setBigDifference(false);
  };

  return (
    <div className="add__people">
      <p className="add__title">
        Add new person
      </p>
      <form onSubmit={e => {
        e.preventDefault();
      }}
      >
        <AddPersonInputs
          nameValue={nameValue}
          handleInputName={handleInputName}
          errorName={errorName}
          bornValue={bornValue}
          handleInputAgeInfo={handleInputAgeInfo}
          errorBorn={errorBorn}
          diedValue={diedValue}
          errorDied={errorDied}
          blurValidation={blurValidation}
        />
        <SexSelect
          genderValue={gender}
          chooseGender={chooseGenderStatus}
          errorGender={errorGender}
        />
        <AddFather
          bornValue={bornValue}
          people={people}
          fatherValue={father}
          chooseFather={chooseFather}
          errorFather={errorFather}
        />
        <AddMother
          people={people}
          bornValue={bornValue}
          fatherValue={mother}
          chooseMother={chooseMother}
          errorMother={errorMother}
        />
        <AddPersonButton
          errorBorn={errorBorn}
          errorDied={errorDied}
          errorName={errorName}
          bigDifference={bigDifference}
          minusDifference={minusDifference}
          validation={validation}
        />

        {isAdd && <Redirect to="/people" />}
      </form>
    </div>
  );
};
