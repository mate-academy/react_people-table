import React, { ReactNode, Reducer, useReducer } from 'react';
import { Person } from './types/Person';

export enum ReducerActions {
  setPeople = 'setPeople',
  setIsPeopleLoading = 'setIsPeopleLoading',
  setHasPeopleLoadingError = 'setHasPeopleLoadingError',
}

type Props = {
  children: ReactNode;
};

type DispatchContextType = (action: DispatchActions) => void;

interface State {
  people: Person[] | null;
  isPeopleLoading: boolean;
  hasPeopleLoadingError: boolean;
}
const initialState: State = {
  people: null,
  isPeopleLoading: false,
  hasPeopleLoadingError: false,
};

interface DispatchActions {
  type: ReducerActions,
  // eslint-disable-next-line
  payload: any,
}

const reducerCallBack: Reducer<State, DispatchActions> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ReducerActions.setPeople:
      return {
        ...state,
        people: payload,
      };

    case ReducerActions.setIsPeopleLoading:
      return {
        ...state,
        isPeopleLoading: payload,
      };

    case ReducerActions.setHasPeopleLoadingError:
      return {
        ...state,
        hasPeopleLoadingError: payload,
      };

    default:
      return state;
  }
};

export const DispatchContext = React.createContext<
DispatchContextType
>(() => {});

export const StateContext = React.createContext(initialState);

export const StateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducerCallBack, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
