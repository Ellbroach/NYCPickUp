import database, { firebase } from '../../firebase';
import MainTabNavigator from '../../../navigation/MainTabNavigator';
import {StackNavigator} from 'react-navigation';

export const login = (uid, username) => ({
  type: 'LOGIN',
  uid,
  username
});

export const startLogin = (username, email, password) => {
  console.log('In store')
  return () => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId).set({
            username: username,
            email: email,
            password: password
          })
          .then( this.props.navigation.navigate('Main'))
        // this.writeUserData(username, email, password)
        // this.setState({error: '', loading: false})
        // this.props.navigation.navigate('Main');
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  };
};

export const startSignUp = (username, email, password) => {
  console.log('EMAIL: ', email)
  return () => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      const userId = firebase.auth().currentUser.uid;
      console.log('here! YA: ', userId)
        firebase.database().ref('users/' + userId).set({
            username: username,
            email: email,
            password: password
          });
          this.props.navigation.navigate('Main');
        // this.writeUserData(username, email, password)
        // this.setState({error: '', loading: false})
        // this.props.navigation.navigate('Main');
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};


export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
        displayName: action.username
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
