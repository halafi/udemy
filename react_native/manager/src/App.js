import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

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
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
        <Provider store={store}>
          <Router />
        </Provider>
    )
  }
}

export default App
