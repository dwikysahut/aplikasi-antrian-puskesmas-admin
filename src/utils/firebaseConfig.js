import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyD7QIiK5vHMNY0tkiZecID4gKazZHoioAc',
  authDomain: 'antrianpuskesmas-c28a2.firebaseapp.com',
  projectId: 'antrianpuskesmas-c28a2',
  storageBucket: 'antrianpuskesmas-c28a2.appspot.com',
  messagingSenderId: '677895495436',
  appId: '1:677895495436:web:edb9ca46dd6928a5e63329',
  measurementId: 'G-4XZTM3V3B3',
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
