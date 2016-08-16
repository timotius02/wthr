import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Animated,
	Easing
} from 'react-native';

const icon = require('react-native-iconic-font/weathericons');

export default Cloud = ({ style }) => {

	const cloudStyle = [styles.cloud, style];
	return (
		<Animated.Text style={ cloudStyle }> 
    		{icon('cloud')}
  		</Animated.Text>
	)
}

const styles = StyleSheet.create({
  	cloud: {
  		fontSize: 110,
		color: '#fff',
 		fontFamily: 'weathericons'
	}
}) 