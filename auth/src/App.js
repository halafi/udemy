import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header } from './components/common';
import LoginForm from './components/LoginForm';

export default class App extends Component {
  componentWillMount() {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyAys3v_fzDTi3bkzqdc2FvaL0bdppvLGog",
      authDomain: "auth-e6410.firebaseapp.com",
      databaseURL: "https://auth-e6410.firebaseio.com",
      projectId: "auth-e6410",
      storageBucket: "auth-e6410.appspot.com",
      messagingSenderId: "328544013592"
    });
  }

  render() {
    return (
        <View>
          <Header>Auth</Header>
          <LoginForm />
        </View>
    );
  }
}

