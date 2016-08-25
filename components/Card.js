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
  }

  _weatherAnimation(weather) {
    switch(weather) {
      case 'Sun':
        return <Sun/>;
      case 'Cloud':
        return  <Cloud />;
      case 'Rain':
        return <Rain />;
      case 'Snow':
        return <Snow />;
      default:
        return null;
    }
  }
  _onPress(time) {
    const { onPress } = this.props;
    
    onPress(time)  
  }

  render() {
    const {flex, time, weather, temperature} = this.props;
    const { summary, windSpeed, humidity} = this.props;

    const backgroundColor = color[time];

    const viewStyle = [styles.viewStyleBase, {backgroundColor}];
    return (
      <Animated.View 
          style={{flex }}>
          <TouchableNativeFeedback 
            onPress={this._onPress.bind(this, time)}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={viewStyle}>
              <View style={styles.halfView}>
                <Animated.View style={{top}}>
                  { this._weatherAnimation(weather)}
                </Animated.View>
              </View>
              <View style={styles.halfView}>
                <Text style={styles.header}>{time.toUpperCase()}</Text>
                <Text style={styles.degree}>{Math.round(temperature)}&deg; F</Text>
                
                <WeatherInfo summary={summary} windSpeed={windSpeed} humidity={humidity}/>
              </View>
          </View>
        </TouchableNativeFeedback>
      </Animated.View>
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