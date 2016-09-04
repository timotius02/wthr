import React from 'react';
import {
	StyleSheet,
	Text,
	Platform
} from 'react-native';

const icon = require('react-native-iconic-font/weathericons');

export default function Cloudy(props) {
	const cloudStyle = [styles.cloudy, props.style];

	return (
		<Text style={ cloudStyle } > 
			{icon('cloudy')}
		</Text>
	)
}

const styles = StyleSheet.create({
  cloudy: {
		fontSize: 100,
		color: '#fff',
		backgroundColor: 'rgba(0,0,0,0)',
		fontFamily: Platform.OS === 'ios' ? 'Weather Icons' : 'weathericons',
	}
}) 