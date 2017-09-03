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
 * @type {HTMLElement} modal
 * @type {HTMLElement} modalClose
 * @type {String} activeLink
 * @type {Array} LoginForm
 */
const loginForm = document.querySelector('#login-form');
const loginMsg = Message('.messages');
const loadMoreBtn = document.querySelector('#loadMore');
const projectList = document.querySelector('.projects__list');
const backBtn = document.querySelector('.back-btn');
const mainInfo = document.querySelector('.projects');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__exit');

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
//     description: 'asdasdasdasdasdasdasd asdasdasd asd a sda    asd asd asdasd asda sdasd asdasdsda;sdas;ld asd asd as da sda  asdasd asdasd a sdasdasdasdas d a sda sd as dds asdasd a sd asdsdasdasdasdasd  asd asda sdasda',
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
//start search
loginForm.addEventListener('submit', ev => {
  ev.preventDefault();
  onSubmitLogin();
});
//load more items into the list
loadMoreBtn.addEventListener('click', ev => {
  ev.preventDefault();
  if(activeLink !== null) {
    getData(activeLink);
  }
});
// new search
backBtn.addEventListener('click', ev => {
  ev.preventDefault();
  activeData = [];
  loginForm.classList.remove('visually-hidden');
  backBtn.classList.add('visually-hidden');
  projectList.innerHTML = '';
  mainInfo.classList.add('visually-hidden');
});
// show modal with additional info
projectList.addEventListener('click', ev => {
  onShowInfo(ev);
});
// close modal
modalClose.addEventListener('click', ev => {
  ev.preventDefault();
  modal.classList.add('visually-hidden');
  modal.querySelector('#modal-repo').innerHTML = '';
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
    renderTemplate('.projects__list', activeData);
    loginForm.classList.add('visually-hidden');
    backBtn.classList.remove('visually-hidden');
    mainInfo.classList.remove('visually-hidden');
  } else {
    console.error('--- ', validateResult.msg);
    loginMsg.show(validateResult.msg, true);
  }
}

/**
 * Show modal with additional repo's info
 * @param {Event} ev
 */
function onShowInfo(ev) {
  const elem = ev.target;
  if(findAncestor(elem, 'repo__star-link') ||
    findAncestor(elem, 'repo__graf-link') ||
    elem.classList.contains('repo__star-link') ||
    elem.classList.contains('repo__graf-link')) {
  } else {
    ev.preventDefault();
    const elemId =  elem.classList.contains('repos__item') ? elem.getAttribute('tabindex') : findAncestor(elem, 'repos__item').getAttribute('tabindex');
    if(!activeData[elemId].addinfo) {
      activeData[elemId].addinfo = {};
      const resInfo = {};
      Promise.all([
        getSample(`https://api.github.com/repos/${userName}/${activeData[elemId].name}`).then((res) => {
          resInfo.main = res.data
        }),
        getSample(`https://api.github.com/repos/${userName}/${activeData[elemId].name}/contributors`).then((res) => {
          resInfo.contributors = res.data
        }),
        getSample(`https://api.github.com/repos/${userName}/${activeData[elemId].name}/languages`).then((res) => {
          resInfo.languages = res.data
        }),
        getSample(`https://api.github.com/repos/${userName}/${activeData[elemId].name}/pulls?sort=popularity`).then((res) => {
          resInfo.pulls = res.data
        })
      ]).then(() => {
        console.log('-----final', resInfo);
        const {main: {source}} = resInfo;
        const {contributors} = resInfo;
        const {languages} = resInfo;
        const {pulls} = resInfo;
        activeData[elemId].addinfo.fork = source ? { name: source.name, url: source.html_url } : null;
        activeData[elemId].addinfo.contributors = contributors.length ? contributors.slice(0, 3).map(item => {keyFilter(item, ['login', 'contributions']); return item}) : null;
        activeData[elemId].addinfo.languages = Object.keys(languages).reduce((res, lang) => {
          if (languages[lang] > 1024) res.push({ name: lang, value: languages[lang] });
          return res;
        }, []);
        activeData[elemId].addinfo.pulls = pulls.length ? pulls.slice(0, 5).map(item => {keyFilter(item, ['title', 'html_url']); return item}) : null;
        console.log('---final ', activeData[elemId].addinfo);

        modal.classList.remove('visually-hidden');
        modal.querySelector('#modal-repo').innerHTML = '';
        renderTemplate('#modal-repo', activeData[elemId], true); // false - list of the repos, true - single item
        }, err => Error(err));
    } else {
      modal.classList.remove('visually-hidden');
      modal.querySelector('#modal-repo').innerHTML = '';
      renderTemplate('#modal-repo', activeData[elemId], true); // false - list of the repos, true - single item
    }
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
      renderTemplate('.projects__list', activeData, false); // false - list of the repos, true - single item
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

/**
 * Find parent element
 * @param {*} elem
 * @param {String} selector
 * @returns {boolean}
 */
function findAncestor(elem, selector) {
  while ((elem = elem.parentElement) && !elem.classList.contains(selector));
  return elem;
}

/**
 * Filter object by the keys
 * @param {Object} data
 * @param {Array} keys
 */
function keyFilter (data, keys) {
  Object.keys(data).reduce((res, key) => {
    if (keys.includes(key)) res[key] = data[key];
    return res;
  }, {});
}
