import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableNativeFeedback, // Android Specific
} from 'react-native';

import { 
  Sun, 
  Cloud, 
  Rain, 
  Snow
} from './weather_icons/';

import WeatherInfo from './WeatherInfo';

const color = {
  base: '#8ba892',
  morning: '#e3bb88',
  afternoon: '#d89864',
  evening: '#b1695a',
  night: '#644749'
}

export default class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      animationState: new Animated.Value(this.props.isSelected? 1: 0)
    }
  }

  _weatherAnimation(weather) {
    switch(weather) {
      case 'Sun':
        return <Sun/>;
      case 'Cloud':
        return  <Cloud style={{left: 40}}/>;
      case 'Rain':
        return <Rain />;
      case 'Snow':
        return <Snow />;
      default:
        return null;
    }
  }
  render() {
    const { time, temperature, onPress, isSelected, ...other } = this.props;


    const backgroundColor = color[time];

    // TEMPORARY
    const weathers = ['Cloud', 'Sun', 'Rain', 'Snow'];
    const weather = weathers[Math.floor( Math.random() * 4)];


    const viewStyle = [styles.viewStyleBase, {backgroundColor}];

        // Weather animation slide down
    const top = this.props.animationState.interpolate({
      inputRange: [0, 1],
      outputRange: [-350, -10]
    });

    // weather info slide up
    const bottom = this.props.animationState.interpolate({
      inputRange: [0, 1],
      outputRange: [-180, 0]
    });

    const flex = isSelected? 8 : 3;

    return (
      <View 
        style={{flex }}>
        <TouchableNativeFeedback 
          onPress={this.props.onPress}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={viewStyle}>
            <View style={styles.halfView}>
              <Animated.View style={{top}}>
                { isSelected ? this._weatherAnimation(weather) : null}
              </Animated.View>
            </View>
            <View style={styles.halfView}>
              <Text style={styles.header}>{time.toUpperCase()}</Text>
              <Text style={styles.degree}>{Math.round(temperature)}&deg; F</Text>
              <Animated.View style={{bottom}}>
                <WeatherInfo {...other} />
              </Animated.View>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewStyleBase: {
      flexDirection: 'row',
      paddingTop: 16,
      flex: 1
  },
  halfView: {
    flex: 1,
    paddingLeft: 20
  },
  header: {
    color: '#fff',
    opacity: 0.4, 
    fontWeight: '700',
    fontSize: 20
  },
  degree: {
    color: '#fff',
    fontSize: 38,
    paddingBottom: 10
  },
});

