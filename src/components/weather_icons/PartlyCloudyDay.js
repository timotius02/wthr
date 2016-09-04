import React from 'react';
import {
  StyleSheet,
  Text,
  Platform
} from 'react-native';

const icon = require('react-native-iconic-font/weathericons');

export default function PartlyCloudyDay(props) {
  const PartlyCloudyDayStyle = [styles.PartlyCloudyDay, props.style];

  return (
    <Text style={ PartlyCloudyDayStyle } > 
      {icon('day-cloudy')}
    </Text>
  )
}

const styles = StyleSheet.create({
  PartlyCloudyDay: {
    fontSize: 100,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    fontFamily: Platform.OS === 'ios' ? 'Weather Icons' : 'weathericons',
  }
}) 
