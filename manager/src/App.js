import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import firebase from 'firebase';
import reducers from './reducers';

class App extends Component {
  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyDgzTE_asG-Qq6GmrbODcLsVMppDAgrcrE',
      authDomain: 'udemy-manager-c76c6.firebaseapp.com',
      databaseURL: 'https://udemy-manager-c76c6.firebaseio.com',
      projectId: 'udemy-manager-c76c6',
      storageBucket: '',
      messagingSenderId: '670125892912'
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
        <Provider store={createStore(reducers)}>
          <View>
            <Text>
              Hello!
            </Text>
          </View>
        </Provider>
    )
  }
}

export default App
