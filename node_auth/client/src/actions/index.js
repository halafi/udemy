import axios from "axios";
import { browserHistory } from "react-router";
import {
  SAVE_COMMENT,
  CHANGE_AUTH,
  FETCH_USERS,
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE
} from "./types";

const API_URL = "http://localhost:3090";

export function saveComment(comment) {
  return {
    type: SAVE_COMMENT,
    payload: comment
  };
}

export function authenticate(isLoggedIn) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  };
}

export function fetchUsers() {
  const req = axios.get("https://jsonplaceholder.typicode.com/users");

  return {
    type: FETCH_USERS,
    payload: req
  };
}

export function signInUser({ email, password }) {
  return function(dispatch) {
    // submit email/pswd to server
    const req = axios
      .post(`${API_URL}/signin`, {
        email,
        password
      })
      .then(response => {
        // update state
        dispatch({ type: AUTH_USER });
        localStorage.setItem("token", response.data.token);
        browserHistory.push("/feature");
      })
      .catch(() => {
        dispatch(authErr("Bad Login Info"));
      });
    // save jwt token for future requests
    // retirect to '/feature'
  };
}

export function authErr(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem("token");

  return {
    type: UNAUTH_USER
  };
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    // submit email/pswd to server
    axios
      .post(`${API_URL}/signup`, {
        email,
        password
      })
      .then(response => {
        console.log(response.data.error);
        // update state
        dispatch({ type: AUTH_USER });
        localStorage.setItem("token", response.data.token);
        browserHistory.push("/feature");
      })
      .catch(err => {
        // todo parse body error string
        dispatch(authErr(String(err)));
      });
  };
}

export function fetchMessage() {
  return function(dispatch) {
    axios
      .get(API_URL, {
        headers: {
          authorization: localStorage.getItem("token")
        }
      })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  };
}
