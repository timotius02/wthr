import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Animated,
	Easing
} from 'react-native';

import Cloud from './Cloud';

const icon = require('react-native-iconic-font/weathericons');

const leftMin = 15;
const leftMax = 160;

const topMin = 95;
const topMax = 120
const animDist = 120;

function randRange(min, max) {
	return (Math.random() * (max - min)) + min;
}

export default class Snow extends Component {
	constructor(props) {
		super(props)

		const startTop = randRange(topMin, topMax);
		const endTop = startTop + animDist;

		this.state = {
			snow: [{
				left: new Animated.Value(randRange(leftMin, leftMax)),
				top: new Animated.Value(randRange(topMin, topMax)),
				endTop
			}, {
				left: new Animated.Value(randRange(leftMin, leftMax)),
				top: new Animated.Value(randRange(topMin, topMax)),
				endTop
			}, {
				left: new Animated.Value(randRange(leftMin, leftMax)),
				top: new Animated.Value(randRange(topMin, topMax)),
				endTop
			}, {
				left: new Animated.Value(randRange(leftMin, leftMax)),
				top: new Animated.Value(randRange(topMin, topMax)),
				endTop
			}]
		}
	}
	componentDidMount() {
		this.state.snow.forEach((wave) => {
			
			const animate = () => {
				Animated.timing(
					wave.top, {
						toValue: wave.endTop,
						duration: 2000,
						easing: Easing.linear
					}
				).start(() => {
					const startTop = randRange(topMin, topMax);
					const endTop = startTop + animDist;
					wave.top.setValue(startTop);
					wave.endTop = endTop;
					wave.left.setValue(randRange(leftMin, leftMax));
					animate()
				});
			}
			animate();
		})

	}
	
	render() {
		const { style } = this.props;

		const snowWaves = this.state.snow.map((wave, index) => {
			const { left, top } = wave

			return (
				<Animated.Text key={index} style={[styles.snow, style, {left, top}]}>
					{icon('snowflake-cold')}
				</Animated.Text>
			)
		})


		return (
			<View>
				<Cloud style={{left: 40}}/>
				{ snowWaves }
			</View>
		)
	}
}

const styles = StyleSheet.create({
	snow: {
		position: 'absolute',
		fontSize: 40,
		color: '#fff',
	 	fontFamily: 'weathericons',
	}
}) 