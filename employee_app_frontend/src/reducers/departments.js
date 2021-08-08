import { GET_DEPS, ADD_DEP, DEL_DEP, UPDATE_DEP } from "../actions/types";

const initialState = {
    deps: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
      case GET_DEPS:
        return {
          ...state,
          deps: action.payload,
        };
      case DEL_DEP:
        return {
          ...state,
          deps: state.deps.filter((dep) => dep.id !== action.payload),
        };
      case ADD_DEP:
        return {
          ...state,
          deps: [...state.deps, action.payload],
        };
      case UPDATE_DEP:
        const depId = action.payload.id
        const deps = state.deps
        const index = deps.findIndex(dep=> dep.id === depId)
        deps[index] = action.payload
        return {
          ...state,
          deps: deps,
        };
      default:
        return state;
    }
  }