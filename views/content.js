// import { makeRequest } from '/assets/js/requests.mjs';


function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
              resolve(xhr.response);
          } else {
              reject({
                  status: this.status,
                  statusText: xhr.statusText
              });
          }
      };
      xhr.onerror = function () {
          reject({
              status: this.status,
              statusText: xhr.statusText
          });
      };
      xhr.send();
  });
}

async function getContent() {
  let result = await makeRequest("GET", "https://api.dev.smartlockers.io/api/v2.0/translation/static/fr");
  const texts = JSON.parse(result).data;
  console.log(texts); 
}

document.addEventListener("DOMContentLoaded", function () {
  getContent();
  // create and manipulate your DOM here. doAjaxThings() will run asynchronously and not block your DOM rendering
  /*document.createElement("...");
  document.getElementById("...").addEventListener(...);*/
});
