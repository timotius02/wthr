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
const leftMax = 120;

const topMin = 95;
const topMax = 120
const animDist = 130;

const flakeAmount = 5;

function randRange(min, max) {
	return (Math.random() * (max - min)) + min;
}

export default class Snow extends Component {
	constructor(props) {
		super(props)
		
		const snow  = [];

		for (let i = 0; i < flakeAmount; i++) {
			const leftOrigin = randRange(leftMin, leftMax);

			snow.push({
				left: randRange(leftMin, leftMax),
				top: randRange(topMin, topMax),
				translateX: new Animated.Value(0),
				translateY: new Animated.Value(0)
			})
		}

		this.state = {
			snow
		}

		this._mounted = false;
	}
	componentDidMount() {
		this._mounted = true;
		const animate = () => {


			const animations = this.state.snow.reduce((prev, snowFlake) => {
				return prev.concat([
					Animated.parallel([
						Animated.timing(
							snowFlake.translateY, {
								toValue: 130,
								duration: 3100,
								easing: Easing.linear
							}
						),
						Animated.sequence([
							Animated.timing(
								snowFlake.translateX, {
									toValue: -20,
									duration: 500,
									easing: Easing.linear
								}
							),
							Animated.timing(
								snowFlake.translateX, {
									toValue: 20,
									duration: 1000,
									easing: Easing.linear
								}
							),
							Animated.timing(
								snowFlake.translateX, {
									toValue: -20,
									duration: 1000,
									easing: Easing.linear
								}
							),
							Animated.timing(
								snowFlake.translateX, {
									toValue: 10,
									duration: 500,
									easing: Easing.linear
								}
							)
						])
					])
				])
			}, []); 

			Animated.stagger(randRange(100, 500), animations).start(() => {
				 snow  = [];

				for (let i = 0; i < flakeAmount; i++) {
					const leftOrigin = randRange(leftMin, leftMax);

					snow.push({
						left: randRange(leftMin, leftMax),
						top: randRange(topMin, topMax),
						translateX: new Animated.Value(0),
						translateY: new Animated.Value(0)
					})
				}
				

				if (this._mounted) {
					this.setState({ snow });
					animate();
				}
			})
		}

		animate()
	}

	componentWillUnmount() {
		this._mounted = false;
	}
	
	render() {
		const { style } = this.props;

		const snowWaves = this.state.snow.map((wave, index) => {
			const { left, top, translateX, translateY } = wave;
	
			const transform = [{translateY}, {translateX}];

			return (
				<Animated.Text key={index} style={[styles.snow, style, {top, left, transform}]}>
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