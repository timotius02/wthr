import React from 'react';
import {
  StyleSheet,
  Text,
  Platform
} from 'react-native';

const icon = require('react-native-iconic-font/weathericons');

export default function ClearNight(props) {
  const clearNightStyle = [styles.clearNight, props.style];

  return (
    <Text style={ clearNightStyle } > 
      {icon('night-clear')}
    </Text>
  )
}

const styles = StyleSheet.create({
  clearNight: {
    fontSize: 100,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: Platform.OS === 'ios' ? 'Weather Icons' : 'weathericons',
  }
}) 
