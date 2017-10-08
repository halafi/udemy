import React  from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Header = ({ children }) =>
  <View style={styles.viewStyle}>
    <Text style={styles.textStyle}>{ children }</Text>
  </View>;

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#F8F8F8',
    height: 60,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 20,
    },
    elevation: 2,
    position: 'relative',
    shadowOpacity: 1.0,
  },
  textStyle: {
    fontSize: 20,
  },
});

export { Header };
