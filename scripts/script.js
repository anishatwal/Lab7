// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let i = 1;
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.id = i;
        newPost.addEventListener("click", function() {
          setState({page: "entry", num: newPost.id});
        });
        i++;
        document.querySelector('main').appendChild(newPost);
      });
    });
});

document.querySelector("header h1").addEventListener("click", function() {
  setState({page: "home"}, false);
});

document.querySelector("header img").addEventListener("click", function() {
  setState({page: "settings"}, false);
});

window.onpopstate = function(event) {
  setState(event.state, true);
}
