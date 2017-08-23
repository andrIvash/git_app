import '../styles/app.css';
import { get } from './getData';
import {validation} from './validation';

const loginForm = document.querySelector('#login-form');
const msgBox = loginForm.querySelector('.messages');
let showError = null;

/**
 * Login form submit
 */
loginForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const validateResult = validation(loginForm);
  if(validateResult.status) {
    console.log('--- ', 'go');
  } else {
    console.log('--- ', validateResult.msg);
  }
});
