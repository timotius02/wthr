import React, { Component } from 'react';
import {
	StyleSheet,
	Animated,
	Platform
} from 'react-native';

const icon = require('react-native-iconic-font/weathericons');

export default class Rain extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		const { style } = this.props;
		const cloudStyle = [styles.cloud, style];

		return (
			<Animated.Text style={ cloudStyle } > 
				{icon('cloud')}
			</Animated.Text>
		)
	}
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