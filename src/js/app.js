import '../styles/app.css';
import { getAll, getSample } from './getData';
import {validation} from './validation';
import {renderTemplate} from "./render";
import Message from './msg';
import _ from 'underscore';

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
 * @type {HTMLElement}} filters
 * @type {HTMLElement}} filtersBtn
 */
const loginForm = document.querySelector('#login-form');
const filters = document.querySelector('.filters');
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
let filteredData = [];
let filteredObj = null;

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
  filteredData = [];
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
// set filters
filters.addEventListener('submit', ev => {
  ev.preventDefault();
  onFilter()
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
    doFilter();
    renderTemplate('.projects__list', filteredData);
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
    if(!filteredData[elemId].addinfo) {
      filteredData[elemId].addinfo = {};
      const resInfo = {};
      Promise.all([
        getSample(`https://api.github.com/repos/${userName}/${filteredData[elemId].name}`).then((res) => {
          resInfo.main = res.data
        }),
        getSample(`https://api.github.com/repos/${userName}/${filteredData[elemId].name}/contributors`).then((res) => {
          resInfo.contributors = res.data
        }),
        getSample(`https://api.github.com/repos/${userName}/${filteredData[elemId].name}/languages`).then((res) => {
          resInfo.languages = res.data
        }),
        getSample(`https://api.github.com/repos/${userName}/${filteredData[elemId].name}/pulls?sort=popularity`).then((res) => {
          resInfo.pulls = res.data
        })
      ]).then(() => {
        const {main: {source}} = resInfo;
        const {contributors} = resInfo;
        const {languages} = resInfo;
        const {pulls} = resInfo;
        filteredData[elemId].addinfo.fork = source ? { name: source.name, url: source.html_url } : null;
        filteredData[elemId].addinfo.contributors = contributors.length ? contributors.slice(0, 3).map(item => {keyFilter(item, ['login', 'contributions']); return item}) : null;
        filteredData[elemId].addinfo.languages = Object.keys(languages).reduce((res, lang) => {
          if (languages[lang] > 1024) res.push({ name: lang, value: languages[lang] });
          return res;
        }, []);
        filteredData[elemId].addinfo.pulls = pulls.length ? pulls.slice(0, 5).map(item => {keyFilter(item, ['title', 'html_url']); return item}) : null;
        modal.classList.remove('visually-hidden');
        modal.querySelector('#modal-repo').innerHTML = '';
        renderTemplate('#modal-repo', filteredData[elemId], true); // false - list of the repos, true - single item
        }, err => Error(err));
    } else {
      modal.classList.remove('visually-hidden');
      modal.querySelector('#modal-repo').innerHTML = '';
      renderTemplate('#modal-repo', filteredData[elemId], true); // false - list of the repos, true - single item
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
      if (data.length !== 0){
        isEndOfList(links);
        projectList.innerHTML = '';
        doFilter();
        renderTemplate('.projects__list', filteredData, false); // false - list of the repos, true - single item
      } else {
        throw Error('No data received');
      }
    }).catch(error => { //error
      console.error(error);
      loginMsg.show(error, true);
    });
}

/**
 * Check selected filters and renew data
 */
function onFilter() {
  const elements = filters.elements;
  const postData = {};
  for (let i=0; i < elements.length; i++) {
    if (elements[i].nodeName === "INPUT") {
      if (elements[i].type === 'radio' && elements[i].checked) {
        postData[elements[i].name] = elements[i].value;
      }
      if (elements[i].type !== 'radio' && elements[i].type !== 'checkbox') {
        if (elements[i].type === 'text' && elements[i].value !== '') {
          postData[elements[i].name] = elements[i].value;
        }
      }
      if (elements[i].type === 'checkbox' && elements[i].checked) {
        postData[elements[i].name] = elements[i].value;
      }
    }
  }
  filteredObj = postData;
  doFilter();
  renderTemplate('.projects__list', filteredData);
}

/**
 * Filtering the data according to filters
 */
function doFilter() {
  if (filteredObj !== null) {
    filteredData = _.sortBy(activeData, filteredObj.sort);

    if(filteredObj.ftype && filteredObj.ftype !== 'all') {
        if(filteredObj.ftype == 'forks') {
          filteredData = _.filter(filteredData, (elem) => elem.fork);
        } else {
          filteredData = _.filter(filteredData, (elem) => !elem.fork);
        }
    }
    if(filteredObj.language && filteredObj.language !=='all') {
      if(filteredObj.language !== 'Other') {
        filteredData = _.filter(filteredData, (elem) => {
          return elem.language === filteredObj.language
        });
      } else {
        filteredData = _.filter(filteredData, (elem) => {
          return elem.language !== 'JavaScript' && elem.language !== 'HTML' && elem.language !== 'CSS'
        });
      }
    }
    if(filteredObj.count) {
      filteredData = _.filter(filteredData, (elem) => {
        return elem.open_issues > 0
      });
    }
    if(filteredObj.topics) {
      filteredData = _.filter(filteredData, (elem) => {
        return elem.topics.length !== 0
      });
    }
    if(filteredObj.starred) {
      filteredData = _.filter(filteredData, (elem) => {
        return elem.stargazers_count >= filteredObj.starred
      });
    }
    if(filteredObj.updated) {
      filteredData = _.filter(filteredData, (elem) => {
        const rightnow = new Date(filteredObj.updated);
        const backthen = new Date(elem.updated_at.split('T')[0]);
        return rightnow < backthen;
      });
    }
  } else {
    filteredData = activeData;
  }
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
   return Object.keys(data).reduce((res, key) => {
    if (keys.includes(key)) res[key] = data[key];
    return res;
  }, {});
}

