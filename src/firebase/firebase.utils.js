import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
    // apiKey: "AIzaSyA0W99TcOwKJ2y7CjYeXg-xrqO9OrqBkDA",
    // authDomain: "ecomm-web-react.firebaseapp.com",
    // databaseURL: "https://ecomm-web-react.firebaseio.com",
    // projectId: "ecomm-web-react",
    // storageBucket: "ecomm-web-react.appspot.com",
    // messagingSenderId: "133582984694",
    // appId: "1:133582984694:web:896507ad39f2b5af5ca3d7",
    // measurementId: "G-P5GKSPS722"
    apiKey: "AIzaSyAJLjTTRHut9JJS0UlEdl44k_T2UqYLPBs",
    authDomain: "project-portal-306914.firebaseapp.com",
    projectId: "project-portal-306914",
    storageBucket: "project-portal-306914.appspot.com",
    messagingSenderId: "256967444631",
    appId: "1:256967444631:web:293fdd543899a551bec1d2",
    measurementId: "G-9B8BWVNKT8"
  };

export const MakeProfileOfUser = async (authuser,additionalData)=>{
if(!authuser) return;
console.log(authuser);
 const userRef = firestore.doc(`users/${authuser.uid}`);
 const snapshot= await userRef.get() ;

if(!snapshot.exists)
{
  const {firstname,email}=authuser;
const createdAt=new Date();
try{
 await userRef.set({
    firstname,
    email,
    createdAt,
    ...additionalData
  });
}
catch(error){
  console.log('error creating user', error.message);
}
}
return  userRef;

};
firebase.initializeApp(config);

export const firestore= firebase.firestore();
export const auth= firebase.auth();

const googleprovide= new firebase.auth.GoogleAuthProvider();

googleprovide.setCustomParameters({prompt:'select_account'});

export const  Signinwithgoogle =()=>auth.signInWithPopup(googleprovide);

export default firebase;
