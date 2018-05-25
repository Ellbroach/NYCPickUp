import React from 'react';
import {View, Button, Text} from 'react-native';
import * as firebase from 'firebase';
import MainTabNavigator from '../navigation/MainTabNavigator';
import {StackNavigator} from 'react-navigation';
import {FormLabel, FormInput} from 'react-native-elements';
import firebaseAPIKey from '../expo/secrets'


firebase.initializeApp({
    apiKey: firebaseAPIKey,
    authDomain: "final-pick-up84.firebaseapp.com",
    databaseURL: "https://final-pick-up84.firebaseio.com",
    projectId: "final-pick-up84",
    storageBucket: "final-pick-up84.appspot.com",
    messagingSenderId: "566831377066"
})


export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        }
    }

    onLogin(){
        this.setState({error: '', loading: true})

        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({error: '', loading: false})
            this.props.navigation.navigate('Main');
        })
        .catch(() => {
            this.setState({error: 'Logging in Failed', loading: false})
        })
    }

    onSignUp(){
        this.setState({error: '', loading: true})

        const {email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
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
            onPress={this.onLogin.bind(this)}
            title = 'Login'/>
            <Button 
            onPress={this.onSignUp.bind(this)}
            title = 'Sign Up'/>
        </View>
    }

    render(){
        return(
            <View>
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