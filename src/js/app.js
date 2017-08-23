import '../styles/app.css';
import { get } from './getData';

const loginForm = document.querySelector('#login-form');
const msgBox = loginForm.querySelector('.messages');
let showError = null;

/**
 * Login form submit
 */
loginForm.addEventListener('submit', (ev) => {
  ev.preventDefault();

});


