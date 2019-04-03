import { GET_ERRORS, CLEAR_ERRORS } from "./types";

// RETURN ERR
export const returnErr = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};
// CLEAR ERR
export const clearErr = () => {
  return {
    type: CLEAR_ERRORS
  };
};
