import React from "react";

const Snackbar = require('node-snackbar');
require('dotenv').config()
const jwt = require("jsonwebtoken");

export function displayMessage(message) {
  Snackbar.show({text: message, pos: 'top-right', duration: 6000});
}

export function displayErrorMessage(message) {
  Snackbar.show({text: message, pos: 'top-right', backgroundColor : '#f5365c', actionTextColor: '#fff', duration: 6000});
}

export function useFormFields(initialValues) {
  const [formFields, setFormFields] = React.useState(initialValues);
  const createChangeHandler = (key) => (e) => {
    const value = e.target.value;
    setFormFields((prev) => (Object.assign(Object.assign({}, prev), { [key]: value })));
  };
  return { formFields, createChangeHandler };
}

export const reverseString = (str) => {
  return str.split("").reverse().join("");
}

export const setSessionData = (data) => {
  localStorage.setItem("_randUid", encodeToken(data.token));
  return localStorage.getItem("_randUid");
}

export const encodeToken = (token) => {
  const salt = process.env.REACT_APP_SECRET_SALT || '07Z54xtPbApkJacQ';
  return btoa(reverseString(reverseString(salt) + token));
}

export const validateToken = () => {
  const token = decodeToken();

  if (token !== "" && token !== undefined) {
    const userObj = jwt.decode(token);

    let expDate = new Date(userObj.exp * 1000);

    if (expDate.valueOf() > new Date().valueOf()) {
      return true;
    } else {
      localStorage.removeItem('_randUid');
      return false;
    }
  } else {
    localStorage.removeItem('_randUid');
    return false;
  }

}

export const decodeToken = () => {
  try {
    const salt = process.env.REACT_APP_SECRET_SALT || '07Z54xtPbApkJacQ';
    let decodedToken = (reverseString(atob(localStorage.getItem('_randUid'))));
    return decodedToken.split(reverseString(salt))[1];
  } catch (e) {
    localStorage.removeItem('_randUid');
    return "";
  }
}