import React, { Component } from 'react';
import {
	StyleSheet,
	Animated,
	Easing
} from 'react-native'

import Cloud from './Cloud';

const icon = require('react-native-iconic-font/weathericons');

export default class Rain extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			top: new Animated.Value(-170),
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

		Animated.timing(
			this.state.top, {
          toValue: 0,
					duration: 250,
          easing: Easing.bezier(0.645, 0.045, 0.355, 1)
			}
		).start();

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
		const { top, waves } = this.state;

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
			<Animated.View style={{top}}>
				<Cloud style={{left: 40}}/>
				{rainWaves}
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	raindrops: {
		position: 'absolute',
		fontSize: 45,
		color: '#fff',
		fontFamily: 'weathericons',
	}
}) 