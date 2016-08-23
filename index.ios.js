/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

class weather extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.morning}></View>
        <View style={styles.afternoon}></View>
        <View style={styles.evening}></View>
        <View style={styles.night}></View>
      </View>
    );
  }
}

const colorBase = '#8ba892';
const colorMorning = '#e3bb88';
const colorAfternoon = '#d89864';
const colorEvening = '#b1695a';
const colorNight = '#644749';

const { height, width } = Dimensions.get('window');
const widthUnit = height / 18;

const viewStyleBase = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: widthUnit * 3,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: widthUnit,
    backgroundColor: colorBase
  },
  morning: {
    ...viewStyleBase,
    height: widthUnit * 8,
    backgroundColor: colorMorning
  },
  afternoon: {
    ...viewStyleBase,
    backgroundColor: colorAfternoon
  },
  evening: {
    ...viewStyleBase,
    backgroundColor: colorEvening
  },
  night: {
    ...viewStyleBase,
    backgroundColor: colorNight
  }
});

AppRegistry.registerComponent('weather', () => weather);
