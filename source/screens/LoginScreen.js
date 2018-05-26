import React from 'react';
import {connect} from 'react-redux'
import {View, Button, Text} from 'react-native';
import * as firebase from 'firebase';
import MainTabNavigator from '../../navigation/MainTabNavigator';
import {StackNavigator} from 'react-navigation';
import {FormLabel, FormInput} from 'react-native-elements';
import firebaseAPIKey from '../../secrets/APISecrets'
import {startLogin, startSignUp} from '../store/actions/auth'


//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       console.log('USER HAS CHANGED IN APP: ', user)
//       const name = user.displayName ? user.displayName : user.email;    
//       store.dispatch(login(user.uid, name));
//       this.props.navigation.navigate('Main');
//       // renderApp();
//       // if (history.location.pathname === '/') {
//       //   history.push('/join');
//       // }
//     } 
//   });


export class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            error: '',
            loading: false
        }
    }

    writeUserData(userId, name, email, imageUrl) {
        userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId).set({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        });
      }

    onLogin(){
        this.setState({error: '', loading: true})

        const {username, email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            this.writeUserData(username, email, password)
            this.setState({error: '', loading: false})
            this.props.navigation.navigate('Main');
        })
        .catch(() => {
            this.setState({error: 'Logging in Failed', loading: false})
        })
    }

    onSignUp(){
        this.setState({error: '', loading: true})
        const {username, email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            this.writeUserData(username, email, password)
            this.setState({error: '', loading: false})
            this.props.navigation.navigate('Main');
        })
        .catch(() => {
            this.setState({error: 'Logging in Failed', loading: false})
        })
    }

    
    
    renderButtonOrLoading(){
        if(this.state.loading){
            return <Text>Loading...</Text>
        }
        return <View>
            <Button 
            onPress={startLogin(this.state.username, this.state.email, this.state)}
            title = 'Login'/>
            <Button 
            onPress=
            {
                startSignUp(this.state.username, this.state.email, this.state.password)
            }
            title = 'Sign Up'/>
        </View>
    }

    render(){
        return(
            <View>
                <FormLabel>UserName</FormLabel>
                <FormInput
                value = {this.state.username}
                placeholder = 'username'
                onChangeText = {username => this.setState({username})}/>
                <FormLabel>Email</FormLabel>
                <FormInput 
                value = {this.state.email}
                placeholder = 'email'
                onChangeText= {email => this.setState({email})}/>
                <FormLabel>Password</FormLabel>
                <FormInput 
                value = {this.state.password}
                secureTextEntry
                placeholder = 'password'
                onChangeText= {password => this.setState({password})}/>
                <Text>{this.state.error}</Text>
                {this.renderButtonOrLoading()}
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin(this.state.username, this.state.email, this.state.password)),
    startSignUp: () => dispatch(startSignUp(this.state.username, this.state.email, this.state.password))
  });

  export default connect(undefined, mapDispatchToProps)(Login);