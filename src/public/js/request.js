/**
 * Wrap XMLHttpRequest in a module to take advantage of promises
 *
 * @param {string} method - the HTTP verb
 * @param {string} url - request URL
 */
function request(method, url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function onLoad() {
      if (this.status >= 200 || this.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error({
          status: this.status,
          reason: xhr.statusText,
        }));
      }
    };

    xhr.onerror = function onError() {
      reject(new Error({
        status: this.status,
        reason: xhr.statusText,
      }));
    };

    xhr.send();
  });
}

export default request;
