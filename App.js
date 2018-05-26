import React from 'react';
import * as firebase from 'firebase'
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import {login, logout} from './source/store/actions/auth'
import { Ionicons } from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import configureStore from './source/store/configureStore';

const store = configureStore();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    console.log('APP:' )
      return (
        <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <RootNavigation />
        </View>
        </Provider>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
