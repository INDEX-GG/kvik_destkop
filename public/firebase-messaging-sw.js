importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js');


firebase.initializeApp({
  apiKey: "AIzaSyBNwEvFhssoO8VRyXgGSeZwm3oOQ-kY6dQ",
  authDomain: "kvik-web-app.firebaseapp.com",
  projectId: "kvik-web-app",
  storageBucket: "kvik-web-app.appspot.com",
  messagingSenderId: "952749153360",
  appId: "1:952749153360:web:d652b639db1f5ac8074555"
});

firebase.messaging();