import '../styles/app.css';
import { getAll, getSample } from './getData';
import {validation} from './validation';
import {renderTemplate} from "./render";
import Message from './msg';

/**
 * Initial variable
 * @type {HTMLElement} LoginForm
 * @type {HTMLElement} LoginMsg
 * @type {HTMLElement} loadMoreBtn
 * @type {HTMLElement} projectList
 * @type {HTMLElement} backBtn
 * @type {HTMLElement} mainInfo
 * @type {String} activeLink
 * @type {Array} LoginForm
 */
const loginForm = document.querySelector('#login-form');
const loginMsg = Message('.messages');
const loadMoreBtn = document.querySelector('#loadMore');
const projectList = document.querySelector('.projects__list');
const backBtn = document.querySelector('.back-btn');
const mainInfo = document.querySelector('.projects');

let userName = null;
let userType = null;
let activeLink = null;
let activeData = [];
// let activeData = [
//   {
//     name: 'one1',
//     html_url: 'http://one',
//     fork: false,
//     forks_url: 'http://one',
//     description: 'asdasdasdasdasdasdasd',
//     //language: 'JavaScript',
//     stargazers_url: 'http://one',
//     stargazers_count: 0,
//     forks_url: 'http://one',
//     forks: 0,
//     updated_at: '2017-03-05'
//   },
//   {
//     name: 'one2',
//     html_url: 'http://one',
//     fork: true,
//     forks_url: 'http://one',
//     description: 'asdasdasdasdasdasdasd',
//     language: 'PHP',
//     stargazers_url: 'http://one',
//     stargazers_count: '20',
//     forks_url: 'http://one',
//     forks: '1',
//     updated_at: '2017-03-05'
//   },
//   {
//     name: 'one3',
//     html_url: 'http://one',
//     forks_url: 'http://one',
//     description: 'asdasdasdasdasdasdasd',
//     language: 'CSS',
//     stargazers_url: 'http://one',
//     stargazers_count: '20',
//     forks_url: 'http://one',
//     forks: '1',
//     updated_at: '2017-03-05'
//   },
//   {
//     name: 'one4',
//     html_url: 'http://one',
//     forks_url: 'http://one',
//     description: 'asdasdasdasdasdasdasd',
//     language: 'JavaScript',
//     stargazers_url: 'http://one',
//     stargazers_count: '20',
//     forks_url: 'http://one',
//     forks: '1',
//     updated_at: '2017-03-05'
//   },
//   {
//     name: 'one5',
//     html_url: 'http://one',
//     forks_url: 'http://one',
//     description: 'asdasdasdasdasdasdasd',
//     language: 'HTML',
//     stargazers_url: 'http://one',
//     stargazers_count: '20',
//     forks_url: 'http://one',
//     forks: '1',
//     updated_at: '2017-03-05'
//   },
//   {
//     name: 'one6',
//     html_url: 'http://one',
//     forks_url: 'http://one',
//     description: 'asdasdasdasdasdasdasd',
//     language: 'TypeScript',
//     stargazers_url: 'http://one',
//     stargazers_count: '20',
//     forks_url: 'http://one',
//     forks: '1',
//     updated_at: '2017-03-05'
//   },
//   {
//     name: 'one7',
//     html_url: 'http://one',
//     forks_url: 'http://one',
//     description: 'asdasdasdasdasdasdasd',
//     language: 'JavaScript',
//     stargazers_url: 'http://one',
//     stargazers_count: '20',
//     forks_url: 'http://one',
//     forks: '1',
//     updated_at: '2017-03-05'
//   },
//   {
//     name: 'one8',
//     html_url: 'http://one',
//     forks_url: 'http://one',
//     description: 'asdasdasdasdasdasdasd',
//     language: 'JavaScript',
//     stargazers_url: 'http://one',
//     stargazers_count: '20',
//     forks_url: 'http://one',
//     forks: '1',
//     updated_at: '2017-03-05'
//   },
//   {
//     name: 'one9',
//     html_url: 'http://one',
//     forks_url: 'http://one',
//     description: 'asdasdasdasdasdasdasd',
//     language: 'JavaScript',
//     stargazers_url: 'http://one',
//     stargazers_count: '20',
//     forks_url: 'http://one',
//     forks: '1',
//     updated_at: '2017-03-05'
//   },
//   {
//     name: 'one10',
//     html_url: 'http://one',
//     forks_url: 'http://one',
//     description: 'asdasdasdasdasdasdasd',
//     language: 'JavaScript',
//     stargazers_url: 'http://one',
//     stargazers_count: '20',
//     forks_url: 'http://one',
//     forks: '1',
//     updated_at: '2017-03-05'
//   },
//   {
//     name: 'one11',
//     html_url: 'http://one',
//     forks_url: 'http://one',
//     description: 'asdasdasdasdasdasdasd',
//     language: 'JavaScript',
//     stargazers_url: 'http://one',
//     stargazers_count: '20',
//     forks_url: 'http://one',
//     forks: '1',
//     updated_at: '2017-03-05'
//   }
// ];

/**
 * Event Listeners
 */

loginForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  onSubmitLogin();
});

loadMoreBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  if(activeLink !== null) {
    getData(activeLink);
  }
});
backBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  activeData = [];
  loginForm.classList.remove('visually-hidden');
  backBtn.classList.add('visually-hidden');
  projectList.innerHTML = '';
  mainInfo.classList.add('visually-hidden');
});
/**
 * Login form submit
 */
function onSubmitLogin() {
  const validateResult = validation(loginForm);
  if(validateResult.status) {
    userName = loginForm.querySelector('input[name="username"]').value;
    userType = loginForm.querySelector('input[name="usertype"]:checked').value;
    getData(`https://api.github.com/${userType}/${userName}/repos?per_page=20`) //per_page=  - number of repos per list
  } else {
    console.error('--- ', validateResult.msg);
    loginMsg.show(validateResult.msg, true);
  }
}

/**
 * Get data from API and show/hide LoadMore Link
 * @param {String} url
 */
function getData(url) {
    //send query
    //TODO: show loader
    getAll(url).then(response => {
      /**
       * success
       * @type {Object} response
       * @type {Array} data // list of the repos
       * @type {Object} links // link to active and next pages
       */
      // const {data} = response;
      // data.forEach(repo => { // add additional data for forked repo's
      //   if (repo.fork) {
      //     getSample(`https://api.github.com/repos/${userName}/${repo.name}`).then(res => {
      //       repo.info = res.data;
      //     }, err => Error(err));
      //   }
      // });
      return response;
    }).then((response) => {
      //TODO hide loader
      if (activeData.length === 0) {
        loginForm.classList.add('visually-hidden');
        backBtn.classList.remove('visually-hidden');
        mainInfo.classList.remove('visually-hidden');
      }
      const {links, data} = response;
      activeData = activeData.concat(data);
      console.log('--- ', activeData);
      isEndOfList(links);
      projectList.innerHTML = '';
      renderTemplate('.projects__list', activeData);
    }).catch(error => { //error
      console.error(error);
      loginMsg.show(error, true);
    });
}

/**
 * Check the end of fetched repo's list
 * @param {Object }links
 */
function isEndOfList(links) {
  if (links !== null && links.next) {
    loadMoreBtn.classList.remove('visually-hidden');
    activeLink = links.next;
  } else { // no more data - hide button
    loadMoreBtn.classList.add('visually-hidden');
    activeLink = null;
  }
}

