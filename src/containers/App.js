import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore'
import WeatherApp from './WeatherApp';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <WeatherApp />
      </Provider>
    );
  }
}