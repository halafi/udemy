import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

export default class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({
      error: '',
      loading: true,
    });

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
          firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(this.onLoginSuccess.bind(this))
              .catch(this.onLoginFail.bind(this))
        });
  }

  onLoginFail(err) {
    this.setState({
      error: `Authentication failed ${err}`,
      loading: false,
    });
  }

  onLoginSuccess() {
    this.setState({
      error: '',
      loading: false,
      email: '',
      password: '',
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    )
  }

  render() {
    const { email, password } = this.state;

    return (
      <Card>
        <CardSection>
          <Input
              placeholder="user@gmail.com"
              label="Email"
              value={email}
              onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
              placeholder="password"
              label="Password"
              value={password}
              onChangeText={password => this.setState({ password })}
              secureTextEntry
          >
          </Input>
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  }
};