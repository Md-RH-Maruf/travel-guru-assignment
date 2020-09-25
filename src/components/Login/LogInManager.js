import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './fire-base-config';



export const initializeLoginFramework = () =>{
    if(firebase.apps.length === 0){

        firebase.initializeApp(firebaseConfig);
    }
       
}


export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          displayName: displayName,
          email: email,
          photo: photoURL,
          message: {meassage:"",color:""},
          success : true
        }
        return signedInUser;
      })
      .catch(error => {
        console.log(error);
        console.log(error.message);
      })
  }

  export const handleFbSignIn = () =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;     
      var user = result.user;
      user.message = {meassage:"",color:""};
      user.success = true;
      return user;
     
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }

  export const createUserWithEmailAndPassword = (newUser) =>{
    console.log("new user email",newUser.email,newUser.password)
    return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(res=>{
      const newUserInfo = res.user;
      newUserInfo.message =   {message:'',color:''} ;
      newUserInfo.success = true;
      updateUserInfo(newUser);
      return newUserInfo;
    })
    .catch(error=>  {
      const newUserInfo = {}
      newUserInfo.message = {message:error.message,color:'red'};
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  export const signInWithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res=>{
      const newUserInfo = res.user;
      newUserInfo.message = {message:'',color:''};
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch(function(error) {
      const newUserInfo = {}
      newUserInfo.message = {message:error.message,color:'red'};
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  const updateUserInfo = userInfo =>{
    const user = firebase.auth().currentUser;
    user.updateProfile({
      firstName : userInfo.firstName,
      lastName : userInfo.lastName,
      displayName: userInfo.firstName+" "+userInfo.lastName
    }).then(function() {
      console.log("User Name Updated successfully..")
    }).catch(function(error) {
      console.log(error);
    });
  }
