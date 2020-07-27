import React, { useState, ChangeEvent } from 'react';

interface Values {
    name: string;
    sex: string;
    born: string;
    died: string;
    mother: string;
    father: string;
}

const initialValues = {
  name: '',
  sex: '',
  born: '',
  died: '',
  mother: '',
  father: '',
}

type FormFields = {
  [key in string]: keyof Values;
}

const formFields: FormFields = {
  name: 'name',
  sex: 'sex',
  born: 'born',
  died: 'died',
  // mother: 'motherName',
  // father: 'fatherName',
}
export const AddForm: React.FC  = () => {
  const [person, setPerson] = useState({sex: 'm',});
  const [inputValues, setInputValues] = useState<Values>({...initialValues});

  const findValue = (field: keyof Values) => {
    return initialValues[field];
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>, field: string) => {
    const { value } = event.currentTarget;
    setInputValues({...inputValues, [field]: value});
  }

  const handleBlur = (event: React.FormEvent<HTMLInputElement>, option: string) => {
    const { value } = event.currentTarget;
    setPerson({
      ...person,
      [option]: value
    })
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>, option: string) => {
    const { value } = event.currentTarget;
    setPerson({
      ...person,
      [option]: value
    })
  }

  return (
   <form action="" className="add_form">
     Please add data
     {
       Object.entries(formFields).map(field => (
         field[0] === 'sex'
          ? (
            <select
              value={person.sex}
              className="add_form-input"
              id={field[1]}
              onChange={(event) => handleSelect(event, field[1])}
            >
              <option value='m'>man</option>
              <option value='f'>woman</option>
            </select>
          )
          : (
            <>
              <input
                value={findValue(field[1])}
                className="add_form-input"
                type="text"
                id={field[1]}
                placeholder={field[0]}
                onChange={(event) => handleChange(event, field[1])}
                onBlur={(event) => handleBlur(event, field[1])}
              />
            </>
          )
       ))
     }
    <button>Save person</button>
   </form>
  )
};
