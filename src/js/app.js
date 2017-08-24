import '../styles/app.css';
import { get } from './getData';
import {validation} from './validation';
import Message from './msg';

/**
 * Initial variable
 * @type {HTMLElement} LoginForm
 * @type {HTMLElement} LoginMsg
 * @type {HTMLElement} loadMoreBtn
 * @type {String} activeLink
 * @type {Array} LoginForm
 */
const loginForm = document.querySelector('#login-form');
const loginMsg = Message('.login__msg');
const loadMoreBtn = document.querySelector('#loadMore');
let activeLink = null;
let activeData = null;

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
    getData(`https://api.github.com/${data.type}/${data.name}/repos?per_page=30`)
  } else {
    console.error('--- ', validateResult.msg);
    loginMsg.show(validateResult.msg, true);
  }
});

/**
 * Get data from API and show/hide LoadMore Link
 * @param {String} url
 */
function getData(url) {
    //send query
    get(url).then(function(response) {
      console.log("Success!", response); // success
      activeData = response.data;
      renderTemplate('.projects__list', activeData);
      if (response.links !== null && response.links.next) {
        loadMoreBtn.classList.remove('visually-hidden');
        activeLink = response.links.next;
      } else { // no more data
        loadMoreBtn.classList.add('visually-hidden');
        activeLink = null;
      }
    }, function(error) { // error
      console.error('--- ', 'bad request');
      loginMsg.show(error, true);
    });
}

/**
 * Render Repository Template
 * @param {String} container
 * @param {Array} data
 */
function renderTemplate(container, data) {
  const wrapper = document.querySelector(container);
  var fragment = document.createDocumentFragment();
  const template = document.querySelector('#repo-template');
  data.forEach(repo => {
    let element = template.content.children[0].cloneNode(true);
    element.querySelector('.repo__title').innerHTML = repo.name;
    fragment.appendChild(element);
  });
  wrapper.appendChild(fragment);
}