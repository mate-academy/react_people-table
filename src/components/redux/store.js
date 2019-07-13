import { createStore } from 'redux';

const initialStore = {
  isLoaded: false,
  isLoading: false,
  users: [],
  usersToShow: [],
  direction: false,
  selectedPerson: -1,
  isAddingNew: false,
};

// const loadingReducer = (state = false, action) => {
//   const { type } = action;
//   switch (type) {
//     case 'START_LOADING':
//       return {
//         ...state,
//         isLoading: true,
//       };

//     case 'FINISH_LOADING':
//       return {
//         ...state,
//         isLoading: false,
//       };

//     default:
//       return state;
//   }
// };

// const usersReducer = (state = [], action) => {
//   const { type } = action;
//   switch (type) {
//     case 'SET_USERS':
//       return {
//         ...state,
//         users: action.users,
//         usersToShow: action.users,
//       };

//     case 'FILTER_USERS':
//       return {
//         ...state,
//         usersToShow: state.users.filter(user => (
//           [user.name, user.mother, user.father]
//             .join('')
//             .toLowerCase()
//             .includes(action.value.trim().toLowerCase())
//         )),
//       };

//     case 'SORT_USERS': {
//       const { field } = action;

//       const createSorterBy = sortField => (a, b) => {
//         switch (typeof a[sortField]) {
//           case 'string':
//             return a[sortField].localeCompare(b[sortField]);

//           case 'boolean':
//           case 'number':
//             return a[sortField] - b[sortField];

//           case 'object':
//             return a[sortField].length - b[sortField].length;

//           default:
//             return 0;
//         }
//       };

//       const callback = createSorterBy(field);
//       return {
//         ...state,
//         direction: !state.direction,
//         usersToShow: state.direction
//           ? [...state.usersToShow].sort(callback)
//           : [...state.usersToShow].sort(callback).reverse(),
//       };
//     }

//     case 'ADD_NEW_PERSON':
//       return {
//         ...state,
//         users: [...state.users].concat(action.person),
//         usersToShow: [...state.usersToShow].concat(action.person),
//       };

//     default:
//       return state;
//   }
// };

// const tableReducer = (state = 0, action) => {
//   const { type } = action;
//   switch (type) {
//     case 'SET_SELECTED_ROW':
//       return {
//         ...state,
//         selectedPerson: action.rowId,
//       };

//     default:
//       return state;
//   }
// };

const reducer = (state, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        isLoading: true,
      };

    case 'FINISH_LOADING':
      return {
        ...state,
        isLoading: false,
      };

    case 'SET_USERS':
      return {
        ...state,
        users: action.users,
        usersToShow: action.users,
      };

    case 'FILTER_USERS':
      return {
        ...state,
        usersToShow: state.users.filter(user => (
          [user.name, user.mother, user.father]
            .join('')
            .toLowerCase()
            .includes(action.value.trim().toLowerCase())
        )),
      };

    case 'SORT_USERS': {
      const { field } = action;

      const createSorterBy = sortField => (a, b) => {
        switch (typeof a[sortField]) {
          case 'string':
            return a[sortField].localeCompare(b[sortField]);

          case 'boolean':
          case 'number':
            return a[sortField] - b[sortField];

          case 'object':
            return a[sortField].length - b[sortField].length;

          default:
            return 0;
        }
      };

      const callback = createSorterBy(field);
      return {
        ...state,
        direction: !state.direction,
        usersToShow: state.direction
          ? [...state.usersToShow].sort(callback)
          : [...state.usersToShow].sort(callback).reverse(),
      };
    }

    case 'SET_SELECTED_ROW':
      return {
        ...state,
        selectedPerson: action.rowId,
      };

    case 'TOGGLE_ADDING_NEW':
      return {
        ...state,
        isAddingNew: !state.isAddingNew,
      };

    case 'ADD_NEW_PERSON':
      return {
        ...state,
        users: [...state.users].concat(action.person),
        usersToShow: [...state.usersToShow].concat(action.person),
      };

    default:
      return state;
  }
};

const store = createStore(reducer, initialStore);
export default store;
