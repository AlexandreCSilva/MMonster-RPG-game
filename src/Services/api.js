import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

function postRegister(body) {
  const promise = axios.post(`${BASE_URL}/sign-up`, body);
  return promise;
}

function postLogin(body) {
  const promise = axios.post(`${BASE_URL}/sign-in`, body);
  return promise;
}

function getChars(header) {
  const promise = axios.get(`${BASE_URL}/chars`, header);
  return promise;
}

function postChar(body, header) {
  const promise = axios.post(`${BASE_URL}/chars`, body, header);
  return promise;
}

function getChar(header) {
  const promise = axios.get(`${BASE_URL}/char`, header);
  return promise;
}

/* function postBalance(body, header) {
  const promise = axios.post(`${BASE_URL}/balance`, body, header);
  return promise;
} */

export { postLogin, postRegister, getChars, postChar, getChar };