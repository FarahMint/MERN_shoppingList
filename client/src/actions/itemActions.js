import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import axios from "axios";

import { tokenConfig } from "./auth_action";
import { returnErr } from "./error_action";

export const getItems = () => dispatch => {
  // set loading to true
  dispatch(setItemsLoading());
  axios.get("/api/items").then(res =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    })
  );
};

//to attach token to the request & the header
export const addItem = item => (dispatch, getState) => {
  axios
    .post("/api/items", item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err => dispatch(returnErr(err.response.data, err.response.status)));
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        // the id we want to delete
        payload: id
      })
    )
    .catch(err => dispatch(returnErr(err.response.data, err.response.status)));
};

// dispatch ITEMS_LOADING (set from false to true)
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
