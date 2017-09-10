import firebase from 'firebase';
import {Actions, ActionConst} from 'react-native-router-flux';

import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
} from './types';

export const employeeUpdate = ({prop, value}) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: {prop, value},
  };
};

export const employeeCreate = ({name, phone, shift}) => {
  const {currentUser} = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .push({name, phone, shift})
        .then(() => {
          Actions.employeeList({type: ActionConst.BACK});
          dispatch({
            type: EMPLOYEE_CREATE
          });
        }); // do not allow go back to previous screen
  };
};

export const employeeFetch = () => {
  const {currentUser} = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .on('value', snapshot => {
          dispatch({
            type: EMPLOYEES_FETCH_SUCCESS,
            payload: snapshot.val()
          })
        });
  };
};