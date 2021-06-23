import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCoTUkpKGjaR9rmI37VNjYZFQlpVgq9cBs",
  authDomain: "recipeapp-g0girl.firebaseapp.com",
  databaseURL: "https://recipeapp-g0girl-default-rtdb.firebaseio.com",
  projectId: "recipeapp-g0girl",
  storageBucket: "recipeapp-g0girl.appspot.com",
  messagingSenderId: "451104379386",
  appId: "1:451104379386:web:1570106fb0e80bf6f2d443",
  measurementId: "G-J1H51Z3Y26",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
