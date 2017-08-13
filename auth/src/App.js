import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, Spinner, Card } from './components/common';
import LoginForm from './components/LoginForm';
import {CardSection} from "./components/common/CardSection";

export default class App extends Component {
  state = {
    loggedIn: null,
  };

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

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedIn: true,
        })
      } else {
        this.setState({
          loggedIn: false,
        })
      }

    })
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
            <Card>
              <CardSection>
                <Button onPress={() => firebase.auth().signOut()}>
                  Log Out
                </Button>
              </CardSection>
            </Card>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
        <View>
          <Header>Auth</Header>
          {this.renderContent()}
        </View>
    );
  }
}

