import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Animated,
	Easing
} from 'react-native'

import Cloud from './Cloud';

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
						easing: Easing.linear
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
		const rainStyle = [styles.raindrops, style]

		const rainWaves = this.state.waves.map((waves, index) => {
			const right = waves.interpolate({inputRange: [0, 1], outputRange: [25, 70] });
			const bottom = waves.interpolate({inputRange: [0, 1], outputRange: [-15, -105]});
			const opacity = waves.interpolate({inputRange: [0, 1], outputRange: [1, 0]});

			return (
					<Animated.Text key={index} style={[rainStyle, { right, bottom, opacity}]}>
						{icon('raindrops').repeat(5)}
					</Animated.Text>
			)
		})

		return (
			<View >
				<Cloud style={{left: 40}}/>
				{rainWaves}
			</View>
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