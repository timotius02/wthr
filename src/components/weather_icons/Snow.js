import React, { Component } from 'react';
import {
	StyleSheet,
	Animated,
	Easing,
	Platform
} from 'react-native';

import Cloudy from './Cloudy';

const icon = require('react-native-iconic-font/weathericons');

const leftMin = 45;
const leftMax = 120;

const topMin = 100;
const topMax = 200;

const flakeAmount = 5;

function randRange(min, max) {
	return (Math.random() * (max - min)) + min;
}

export default class Snow extends Component {
	constructor(props) {
		super(props)
		
		const snow  = [];

		for (let i = 0; i < flakeAmount; i++) {

			snow.push({
				left: new Animated.Value(randRange(leftMin, leftMax)),
				top: new Animated.Value(randRange(topMin, topMax)),
				translateX: new Animated.Value(0),
				animationState: new Animated.Value(0)
			})
		}

		this.state = {
			top: new Animated.Value(0),
			snow
		}
	}
	componentDidMount() {

		let delay = 0;

		this.state.snow.forEach((snowFlake) => {
			const animate = () => {
				const direction = Math.random() > 0.5? 1 : -1;
				Animated.parallel([
					Animated.timing(
						snowFlake.animationState, {
							toValue: 1,
							duration: randRange(2500, 3100),
							easing: Easing.linear
						}
					),
					Animated.sequence([
						Animated.timing(
							snowFlake.translateX, {
								toValue: -20 * direction,
								duration: 500,
								easing: Easing.inOut(Easing.ease)
							}
						),
						Animated.timing(
							snowFlake.translateX, {
								toValue: 20 * direction,
								duration: 1000,
								easing: Easing.inOut(Easing.ease)
							}
						),
						Animated.timing(
							snowFlake.translateX, {
								toValue: -20 * direction,
								duration: 1000,
								easing: Easing.inOut(Easing.ease)
							}
						),
						Animated.timing(
							snowFlake.translateX, {
								toValue: 10 * direction,
								duration: 500,
								easing: Easing.inOut(Easing.ease)
							}
						)
					])
				]).start(() => {
					setTimeout(() => {
						snowFlake.animationState.setValue(0);
						snowFlake.left.setValue(randRange(leftMin, leftMax));
						snowFlake.top.setValue(100);
						
						animate()
					}, delay)
					delay += 300;
					if (delay > 1200) 
						delay = 0;

				})
			}
			
			animate()
		})		
	}
	
	render() {
		const { style } = this.props;
		const { top, snow } = this.state;

		const snowWaves = snow.map((wave, index) => {
			const { left, top, translateX, animationState } = wave;
	
			const translateY = animationState.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 140]
			})

			const opacity = animationState.interpolate({
				inputRange: [0, 1],
				outputRange: [1, 0]
			})
			const transform = [{translateY}, {translateX}];

			const style = [Styles.snow, {top, left, transform, opacity}] 

			return (
				<Animated.Text key={index} style={style}>
					{icon('snowflake-cold')}
				</Animated.Text>
			)
		})

		return (
			<Animated.View style={[style, { top }]}>
				<Cloudy style={{left: 40}}/>

				{ snowWaves }
			</Animated.View>
		)
	}
}

const Styles = StyleSheet.create({
	snow: {
		position: 'absolute',
		fontSize: 40,
		backgroundColor: 'rgba(0,0,0,0)',
		color: '#fff',
		fontFamily: Platform.OS === 'ios' ? 'Weather Icons' : 'weathericons',
	}
}) 