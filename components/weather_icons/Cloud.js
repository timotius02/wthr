import React, { Component } from 'react';
import {
	StyleSheet,
	Animated,
	Easing
} from 'react-native';

const icon = require('react-native-iconic-font/weathericons');

export default class Rain extends Component {
	constructor(props) {
		super(props);

		this.state = {
			top: new Animated.Value(-170)
		}
	}

	componentDidMount() {
		Animated.timing(
			this.state.top, {
				toValue: 0,
				duration: 250,
				easing: Easing.bezier(0.645, 0.045, 0.355, 1)
			}
		).start();
	}

	render() {
		const { style } = this.props;
		const { top } = this.state;
		const cloudStyle = [styles.cloud, style,];

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
		fontFamily: 'weathericons'
	}
}) 