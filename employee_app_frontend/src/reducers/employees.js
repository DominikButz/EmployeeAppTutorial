import { GET_EMPS, ADD_EMP, DEL_EMP, UPDATE_EMP } from "../actions/types";

const initialState = {
    employees: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
      case GET_EMPS:
        return {
          ...state,
          employees: action.payload,
        };
      case DEL_EMP:
        return {
          ...state,
          employees: state.employees.filter((employee) => employee.id !== action.payload),
        };
      case ADD_EMP:
        return {
          ...state,
          employees: [...state.employees, action.payload],
        };
      case UPDATE_EMP:
        const empId = action.payload.id
        const employees = state.employees
        const index = employees.findIndex(emp=> emp.id === empId)
        employees[index] = action.payload
        return {
          ...state,
          employees: employees,
        };
      default:
        return state;
    }
  }