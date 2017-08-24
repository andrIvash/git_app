import '../styles/app.css';
import { get } from './getData';
import {validation} from './validation';
import Message from './msg';

const loginForm = document.querySelector('#login-form');
const loginMsg = Message('.login__msg');
const loadMoreBtn = document.querySelector('#loadMore');
let offset = 1;
let activeLink = null;
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
    getData(`https://api.github.com/${data.type}/${data.name}/repos?per_page=20`)
  } else {
    console.log('--- ', validateResult.msg);
    loginMsg.show(validateResult.msg, true);
  }
});
/**
 * LoadMore Event
 */
loadMoreBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  if( activeLink !== null) {
    offset++;
    console.log('--- ', offset);
    getData(activeLink);
  }
});

/**
 * Get data from API and show/hide LoadMore Link
 * @param {text} url
 */
function getData(url) {
    //send query
    get(url).then(function(response) {
      console.log("Success!", response); // success
      if (response.links !== null && response.links.next) {
        loadMoreBtn.classList.remove('visually-hidden');
        activeLink = response.links.next;
      } else { // no more data
        loadMoreBtn.classList.add('visually-hidden');
        activeLink = null;
      }
    }, function(error) { // error
      console.log('--- ', 'bad request');
      loginMsg.show(error, true);
    });
}