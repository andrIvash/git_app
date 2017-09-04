export function getAll(url) {
  return new Promise(function(resolve, reject) { // return new Promise
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.setRequestHeader("Accept","application/vnd.github.mercy-preview+json");
    req.onload = function() {
      if (req.status == 200) {
        const header = req.getResponseHeader('Link');
        let links = {};
        if (header !== null) {
          header.split(',').forEach((elem) => {
            const link = elem.split(';');
            links[link[1].replace(/rel=|"/g,'').trim()] = link[0].replace(/[<>]/g,'').trim();
          }) ;
        } else {
          links = null
        }
        resolve({
          data: JSON.parse(req.response),
          links
        })
      }
      else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function() { // network errors
      reject(Error("Network Error"));
    };
    req.send(); // Make the request
  });
}

export function getSample(url) {
  return new Promise(function(resolve, reject) { // return new Promise
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function() {
      if (req.status == 200) {
        resolve({data: JSON.parse(req.response)})
      }
      else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function() { // network errors
      reject(Error("Network Error"));
    };
    req.send(); // Make the request
  });
}
