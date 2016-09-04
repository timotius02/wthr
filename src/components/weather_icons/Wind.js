import React from 'react';
import {
  StyleSheet,
  Animated,
  Platform
} from 'react-native';

const icon = require('react-native-iconic-font/weathericons');

export default function Wind(props) {
  const windStyle = [styles.wind, props.style];

  return (
    <Animated.Text style={ windStyle } > 
      {icon('strong-wind')}
    </Animated.Text>
  )
}

const styles = StyleSheet.create({
  wind: {
    left: 40,
    fontSize: 110,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: Platform.OS === 'ios' ? 'Weather Icons' : 'weathericons',
  }
}) 
