import React from 'react';
import {
  StyleSheet,
  Text,
  Platform
} from 'react-native';

const icon = require('react-native-iconic-font/weathericons');

export default function Sleet(props) {
  const cloudStyle = [styles.cloud, props.style];

  return (
    <Text style={ cloudStyle } > 
      {icon('sleet')}
    </Text>
  )
}

const styles = StyleSheet.create({
  cloud: {
    fontSize: 100,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: Platform.OS === 'ios' ? 'Weather Icons' : 'weathericons',
  }
}) 
