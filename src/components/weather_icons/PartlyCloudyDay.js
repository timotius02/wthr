import React from 'react';
import {
  StyleSheet,
  Animated,
  Platform
} from 'react-native';

const icon = require('react-native-iconic-font/weathericons');

export default function PartlyCloudyDay(props) {
  const PartlyCloudyDayStyle = [styles.PartlyCloudyDay, props.PartlyCloudyDay];

  return (
    <Animated.Text style={ PartlyCloudyDayStyle } > 
      {icon('day-cloudy')}
    </Animated.Text>
  )
}

const styles = StyleSheet.create({
  PartlyCloudyDay: {
    left: 40,
    fontSize: 110,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: Platform.OS === 'ios' ? 'Weather Icons' : 'weathericons',
  }
}) 
