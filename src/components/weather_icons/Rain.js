import React, { Component } from 'react';
import {
	StyleSheet,
	Animated,
	Easing,
	Platform
} from 'react-native'

import Cloudy from './Cloudy';

const icon = require('react-native-iconic-font/weathericons');

export default class Rain extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			waves: [
				new Animated.Value(0), 
				new Animated.Value(0), 
				new Animated.Value(0), 
				new Animated.Value(0), 
				new Animated.Value(0), 
				new Animated.Value(0), 
			]
		}
	}

	componentDidMount() {

		const animate = () => {
			const animations = this.state.waves.map((wave) => {
				return Animated.timing(
					wave, {
						toValue: 1,
						duration: 1000,
						easing: Easing.ease
					}
				)
			})
			Animated.stagger(300, animations).start(() => {
				this.state.waves.forEach((wave) => {
					wave.setValue(0)
				})
				animate()
			});
		}
		animate();
	}

	render() {
		const { style } = this.props;
		const { waves } = this.state;

		const rainWaves = waves.map((wave, index) => {
			const right = wave.interpolate({
				inputRange: [0, 1], 
				outputRange: [25, 70] 
			});

			const bottom = wave.interpolate({
				inputRange: [0, 1], 
				outputRange: [-15, -105]
			});

			const opacity = wave.interpolate({
				inputRange: [0, 1], 
				outputRange: [1, 0]
			});

			const rainStyle = [styles.raindrops, style, {right, bottom, opacity}];

			return (
				<Animated.Text key={index} style={rainStyle}>
					{icon('raindrops').repeat(5)}
				</Animated.Text>
			)
		})

		return (
			<Animated.View>
				<Cloudy style={{left: 40}}/>
				{rainWaves}
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	raindrops: {
		position: 'absolute',
		fontSize: 45,
		backgroundColor: 'rgba(0,0,0,0)',
		color: '#fff',
		fontFamily: Platform.OS === 'ios' ? 'Weather Icons' : 'weathericons',
	}
}) 