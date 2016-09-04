import React from 'react';
import {
	StyleSheet,
	Animated,
	Platform
} from 'react-native';

const icon = require('react-native-iconic-font/weathericons');

export default function Cloudy(props) {
	const cloudStyle = [styles.cloudy, props.style];

	return (
		<Animated.Text style={ cloudStyle } > 
			{icon('cloudy')}
		</Animated.Text>
	)
}

const styles = StyleSheet.create({
  cloudy: {
		left: 40,
		fontSize: 110,
		color: '#fff',
		backgroundColor: 'rgba(0,0,0,0)',
		fontFamily: Platform.OS === 'ios' ? 'Weather Icons' : 'weathericons',
	}
}) 