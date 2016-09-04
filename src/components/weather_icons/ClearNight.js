import React from 'react';
import {
  StyleSheet,
  Animated,
  Platform
} from 'react-native';

const icon = require('react-native-iconic-font/weathericons');

export default function ClearNight(props) {
  const cloudStyle = [styles.cloud, props.style];

  return (
    <Animated.Text style={ cloudStyle } > 
      {icon('night-clear')}
    </Animated.Text>
  )
}

const styles = StyleSheet.create({
  cloud: {
    left: 40,
    fontSize: 110,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: Platform.OS === 'ios' ? 'Weather Icons' : 'weathericons',
  }
}) 
