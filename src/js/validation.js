/**
 *  Form validation
 * @param {HTMLElement} form
 * @returns {{status: boolean, msg: string}}
 */
export function validation (form) {
  let status = [];
  const radios = {}; //radio array
  const texts = []; // text array
  [].forEach.call(form.elements, (elem) => {
    if (elem.nodeName === 'INPUT') {
      if (elem.type === 'radio') {
        if (radios[elem.name]) {
          radios[elem.name].push(elem);
        } else {
          radios[elem.name] = [];
          radios[elem.name].push(elem)
        }
      }
      if (elem.type === 'text') texts.push(elem);
    }
  });
  for (let key in radios) {
    status.push(radios[key].some(elem => elem.checked === true));
  }
  status.push(texts.every(elem => elem.value !== ''));
  return {
    status: status.every(elem => elem !== false),
    msg: status ? 'You should fill both inputs' : 'Success'
  }
}

