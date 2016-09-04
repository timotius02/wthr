import React from 'react';
import {
  StyleSheet,
  Text,
  Platform
} from 'react-native';

const icon = require('react-native-iconic-font/weathericons');

export default function PartlyCloudyNight(props) {
  const PartlyCloudyNightStyle = [styles.PartlyCloudyNight, props.style];

  return (
    <Text style={ PartlyCloudyNightStyle } > 
      {icon('night-alt-cloudy')}
    </Text>
  )
}

const styles = StyleSheet.create({
  PartlyCloudyNight: {
    fontSize: 100,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: Platform.OS === 'ios' ? 'Weather Icons' : 'weathericons',
  }
}) 
