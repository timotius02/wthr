import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class WeatherInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {summary, windSpeed, humidity } = this.props;

    return (
      <View>
        <Text style={styles.summary}>{summary}</Text>
        <Text style={styles.text}>Wind: {Math.round(windSpeed)} mph</Text>
        <Text style={styles.text}>Humidity: {Math.round(humidity * 100)}%</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  summary: {
    paddingBottom: 10,
    color: '#fff',
    fontSize: 32,
    fontWeight: '500'
  },
  text: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16
  }
});