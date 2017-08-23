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
    const data = {
      name: loginForm.querySelector('input[name="username"]').value,
      type: loginForm.querySelector('input[name="usertype"]:checked').value
    };
    console.log(data);
    //send query
    get(`https://api.github.com/${data.type}/${data.name}/repos`).then(function(response) {
      console.log("Success!", response); // success
    }, function(error) { // error
      loginMsg.show(error, true);
    });
  } else {
    console.log('--- ', validateResult.msg);
    loginMsg.show(validateResult.msg, true);
  }
});
