import React from 'react';
import {
  StyleSheet,
  Animated,
  Platform
} from 'react-native';

const icon = require('react-native-iconic-font/weathericons');

export default function PartlyCloudyNight(props) {
  const PartlyCloudyNightStyle = [styles.PartlyCloudyNight, props.PartlyCloudyNight];

  return (
    <Animated.Text style={ PartlyCloudyNightStyle } > 
      {icon('night-alt-cloudy')}
    </Animated.Text>
  )
}

const styles = StyleSheet.create({
  PartlyCloudyNight: {
    left: 40,
    fontSize: 110,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: Platform.OS === 'ios' ? 'Weather Icons' : 'weathericons',
  }
}) 
