import React from 'react';
import {View, UIManager} from 'react-native';
import {Provider} from 'react-redux';
import {createStore} from "redux";
import reducers from './reducers';
import {Header} from './components/common';
import LibraryList from './components/LibraryList';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const App = () => {
  return (
      <Provider store={createStore(reducers)}>
        <View style={{flex: 1}}>
          <Header>
            Tech Stack
          </Header>
          <LibraryList/>
          {/*<View />*/}
        </View>
      </Provider>
  );
};

export default App;
