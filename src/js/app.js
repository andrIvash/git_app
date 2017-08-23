import '../styles/app.css';
import { get } from './getData';
import {validation} from './validation';
import Message from './msg';

const loginForm = document.querySelector('#login-form');
const loginMsg = Message('.login__msg');

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
    loginMsg.show('error', true);
  }

});
