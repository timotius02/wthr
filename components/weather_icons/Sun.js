import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Animated,
	Easing
} from 'react-native'

const icon = require('react-native-iconic-font/weathericons');

export default class Sun extends Component {
	constructor(props) {
		super(props);

		this.state = {
			top: new Animated.Value(-170),
			rotateValue: new Animated.Value(0)
		}
	}

	componentDidMount() {
		Animated.timing(
			this.state.top, {
          		toValue: 10,
				duration: 250,
          		easing: Easing.bezier(0.645, 0.045, 0.355, 1)
			}
		).start();

		var rotateSun = () => {
	     	this.state.rotateValue.setValue(0);

	    	Animated.timing(
		        this.state.rotateValue, {
		        	toValue: 1,
		        	duration: 3000,
		        	easing: Easing.linear
		        }
		    ).start(() => {
	     		rotateSun();
	      	})
    	}
    	rotateSun();
	}

	render() {
		const rotate = this.state.rotateValue.interpolate({
    		inputRange: [0, 1],
    		outputRange: ['0deg', '360deg']
    	});
		
		const { style} = this.props;
		const { top } = this.state;
		const sunStyle = [styles.sun, style, { top, transform: [{ rotate }]}];

		return (
			<Animated.Text style={ sunStyle }> 
        		{icon('day-sunny')}
    		</Animated.Text>
		)
	}
}


const styles = StyleSheet.create({
  	sun: {
 		fontSize: 70,
		color: '#fff',
		fontFamily: 'weathericons',
		position: 'absolute'
	}
}) 