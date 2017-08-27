/**
 * Render Repository Template
 * @param {String} container
 * @param {Array} data
 * @param {boolean} single // false - list of the repos, true - single item
 */
export function renderTemplate(container, data, single) {
  const wrapper = document.querySelector(container);
  const fragment = document.createDocumentFragment();

  if (!single) {
    data.forEach((repo, indx) => {
      const element = document.createElement('li');
      element.classList.add('repos__item');
      element.setAttribute('tabindex', indx.toString());
      element.innerHTML = `
      <section class="repo">
        <header class="repo__header">
          <h3 class="repo__title">
              <a class="repo__link" href="${repo.html_url}">${repo.name}</a>
          </h3>
          <div class="${repo.fork ? 'repo__fork': 'visually-hidden'}"> it's Fork    
              <!--<a class="repo__fork-link" href="${repo.forks_url}">${repo.name} </a> -->
          </div>
        </header>
        <main class="repo__main">
          <p class="${repo.description ? 'repo__desq': 'visually-hidden'}">${repo.description}</p>
        </main>
        <footer class="repo__footer">
          <span class="${repo.language ? 'repo__lang-logo': 'visually-hidden'}" style="background-color:${setLangColor(repo.language)}"></span>
          <span class="${repo.language ? 'repo__lang': 'visually-hidden'}">${repo.language}</span>
          <a class="${repo.stargazers_count !== 0 ? 'repo__star-link': 'visually-hidden'}" href="${repo.stargazers_url}">
            <svg class="octicon octicon-star" aria-label="star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14">
              <path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path>
            </svg>
            <span class="repo__stars">${repo.stargazers_count}</span>
          </a>
          <a class="${repo.forks !== 0 ? 'repo__graf-link': 'visually-hidden'}" href="${repo.forks_url}">
            <svg class="octicon octicon-repo-forked" aria-label="fork" height="16" role="img" version="1.1" viewBox="0 0 10 16" width="10">
              <path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path>
            </svg>
            <span class="repo__forks">${repo.forks}</span>
          </a>
          <span class="repo-time">Updated ${repo.updated_at.substring(0,10).split('-').reverse().join('.')}</span>
        </footer>
      </section>
  `;
      fragment.appendChild(element);
    });
  } else {
    const element = document.createElement('section');
    element.classList.add('repo');
    element.innerHTML = `
        <header class="repo__header">
          <h3 class="repo__title">
              <a class="repo__link" href="${data.html_url}">${data.name}</a>
          </h3>
          <div class="${data.fork ? 'repo__fork': 'visually-hidden'}">Forked from   
              <a class="repo__fork-link" href="${data.forks_url}">${data.name} </a>
          </div>
        </header>
        <main class="repo__main">
          <p class="${data.description ? 'repo__desq': 'visually-hidden'}">${data.description}</p>
        </main>
        <footer class="repo__footer">
          <span class="${data.language ? 'repo__lang-logo': 'visually-hidden'}" style="background-color:${setLangColor(data.language)}"></span>
          <span class="${data.language ? 'repo__lang': 'visually-hidden'}">${data.language}</span>
          <a class="${data.stargazers_count !== 0 ? 'repo__star-link': 'visually-hidden'}" href="${data.stargazers_url}">
            <svg class="octicon octicon-star" aria-label="star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14">
              <path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path>
            </svg>
            <span class="repo__stars">${data.stargazers_count}</span>
          </a>
          <a class="${data.forks !== 0 ? 'repo__graf-link': 'visually-hidden'}" href="${data.forks_url}">
            <svg class="octicon octicon-repo-forked" aria-label="fork" height="16" role="img" version="1.1" viewBox="0 0 10 16" width="10">
              <path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path>
            </svg>
            <span class="repo__forks">${data.forks}</span>
          </a>
          <span class="repo-time">Updated ${data.updated_at.substring(0,10).split('-').reverse().join('.')}</span>
        </footer>
  `;
    fragment.appendChild(element);
  }
  wrapper.appendChild(fragment);
}

/**
 * Set color for current Language
 * @param {String} language
 * @returns {String} color
 */
function setLangColor(language) {
  let color;
    switch (language) {
      case 'JavaScript':
        color = '#f1e05a';
        break;
      case 'HTML':
        color = '#e34c26';
        break;
      case 'PHP':
        color = '#4f5d95';
        break;
      case 'CSS':
        color = '#563d7c';
        break;
      default :
        color = '#2b7489';
    }
    return color;
}