import React from 'react';
import {
  StyleSheet,
  Text,
  Platform
} from 'react-native';

const icon = require('react-native-iconic-font/weathericons');

export default function Wind(props) {
  const windStyle = [styles.wind, props.style];

  return (
    <Text style={ windStyle } > 
      {icon('strong-wind')}
    </Text>
  )
}

const styles = StyleSheet.create({
  wind: {
    fontSize: 100,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: Platform.OS === 'ios' ? 'Weather Icons' : 'weathericons',
  }
}) 
