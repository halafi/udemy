import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Button, Card, CardSection } from './common';

export default class LoginForm extends Component {
  render() {
    return (
      <Card>
        <CardSection>
          <TextInput style={{ height: 20, width: 100, color: "black" }}/>
        </CardSection>

        <CardSection/>

        <CardSection>
          <Button>
            Log In
          </Button>
        </CardSection>
      </Card>
    )
  }
}