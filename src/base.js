import firebase from 'firebase'
import Rebase from 're-base'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDj_7huENoCVVnM2Lg09Md_7iRHs_-KTgA",
  authDomain: "rotas-app.firebaseapp.com",
  databaseURL: "https://rotas-app.firebaseio.com",
  projectId: "rotas-app",
  storageBucket: "rotas-app.appspot.com",
  messagingSenderId: "375833538657"
};

const app = firebase.initializeApp(config);

const base = Rebase.createClass( app.database() )
const auth = firebase.auth()

export { auth, base }