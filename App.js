import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { Font, AppLoading } from 'expo';
import store from './app/redux/store';
import Router from './app/config/routes';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      isReady: false,
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Foundation': require('native-base/Fonts/Foundation.ttf'),
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
    });

const Cosmic = require('cosmicjs')
const api = Cosmic()
const bucket = api.bucket({
    slug: '345a3160-1ce7-11e9-bcae-971095d5a575'
  })
const data = await bucket.getBucket()

    this.setState({isReady: true});
  }


  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('main', () => App);
