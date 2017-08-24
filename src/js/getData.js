export function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
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
          response: JSON.parse(req.response),
          links
        })
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };
    // Make the request
    req.send();
  });
}
