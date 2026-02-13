import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js';
import { getAnalytics, isSupported } from 'https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCgptrCmZe9mkYzZdy2q1LXdWxTRggXqss',
  authDomain: 'the-rc-reserve.firebaseapp.com',
  projectId: 'the-rc-reserve',
  storageBucket: 'the-rc-reserve.firebasestorage.app',
  messagingSenderId: '674308506313',
  appId: '1:674308506313:web:2028d763afc6389bc08318',
  measurementId: 'G-E1LTP04GPX'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

isSupported().then((ok) => {
  if (ok) getAnalytics(app);
});

export { app, auth };
