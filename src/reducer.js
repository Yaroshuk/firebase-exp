import { SET_USER } from "./actions/const";

const initialState = {
  user: null,
  isLoaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.payload, isLoaded: true};
    default:
      return state;
  }
};
