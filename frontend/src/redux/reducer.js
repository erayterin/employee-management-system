import * as types from "./actionType";

const initialState = {
  employees: [],
  employee: {},
  loading: true,
};

const employeesReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_EMPLOYEES:
      return {
        ...state,
        loading: false,
        employees: action.payload,
      };
      case types.GET_SINGLE_EMPLOYEE:
        return {
          ...state,
          loading: false,
          employee: action.payload,
        };
    case types.ADD_EMPLOYEE:
    case types.DELETE_EMPLOYEE:
    case types.UPDATE_EMPLOYEE:
      return {
        ...state,
        loading:false,
      }
    default:
      return state;
  }
};

export default employeesReducers;
