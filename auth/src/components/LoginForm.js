import React, { Component } from 'react';
import { Button, Card, CardSection, Input } from './common';

export default class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  };

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

        <CardSection>
          <Button>Log In</Button>
        </CardSection>
      </Card>
    )
  }
}