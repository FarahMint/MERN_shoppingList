import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

// cretae initial state

const initialState = {
  msg: {},
  status: null,
  id: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    /**
     * GET ERRORS
     */
    case GET_ERRORS:
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id
      };
    /**
     * CLEAR ERRORS
     */
    case CLEAR_ERRORS:
      // set back to default - not old err hang around in state
      return {
        msg: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
}
