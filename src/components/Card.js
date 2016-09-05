import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableNativeFeedback, // Android Specific
} from 'react-native';

import Style from '../stylesheets/Style';

import { 
  ClearNight,
  Cloudy,
  Fog,
  PartlyCloudyDay,
  PartlyCloudyNight,
  Rain,
  Sleet,
  Snow,
  Sun,
  Wind
} from './weather_icons/';

import WeatherInfo from './WeatherInfo';

export default class Card extends Component {
  constructor(props) {
    super(props)

    this.state = {
      animationState: new Animated.Value(this.props.isSelected? 1: 0)
    }
  }

  _weatherAnimation(weather) {
    switch(weather) {
      case 'clear-day':
        return <Sun style={{top: -Style.HEIGHT_UNIT}}/>;
      case 'clear-night':
        return <ClearNight style={{top: -Style.HEIGHT_UNIT}}/>;
      case 'rain':
        return <Rain style={{top: -Style.HEIGHT_UNIT}}/>;
      case 'snow':
        return <Snow style={{top: -Style.HEIGHT_UNIT}}/>;
      case 'sleet':
        return <Sleet style={{top: -Style.HEIGHT_UNIT}}/>;
      case 'wind':
        return <Wind style={{top: -Style.HEIGHT_UNIT}}/>;
      case 'fog':
        return <Fog style={{top: -Style.HEIGHT_UNIT}}/>;
      case 'cloudy':
        return  <Cloudy style={{top: -Style.HEIGHT_UNIT}}/>;
      case 'partly-cloudy-day':
        return <PartlyCloudyDay style={{top: -Style.HEIGHT_UNIT}}/>;
      case 'partly-cloudy-night':
        return <PartlyCloudyNight style={{top: -Style.HEIGHT_UNIT}}/>;
      default: 
        return null;

      // case 'Sun':
      //   return <Sun/>;
      // case 'Cloudy':
      //   return  <Cloudy style={{left: 40}}/>;
      // case 'Rain':
      //   return <Rain />;
      // case 'Snow':
      //   return <Snow />;
      // default:
      //   return null;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isSelected === this.props.isSelected &&
        nextProps.show === this.props.show) {
      return false;
    }
    return true;
  } 

  render() {
    const { time, temperature, onPress, isSelected, icon, show, ...other } = this.props;


    const backgroundColor = Style.COLORS[time];

    // TEMPORARY
    // const weathers = ['clear-day', 'clear-night', 'rain', 'snow', 'sleet', 'wind', 'fog', 'cloudy', 'partly-cloudy-day', 'partly-cloudy-night'];
    // const weather = weathers[Math.floor( Math.random() * 10)];


    const viewStyle = [styles.viewStyleBase, {backgroundColor}];

        // Weather animation slide down
    const top = this.props.animationState.interpolate({
      inputRange: [0, 1],
      outputRange: [-Style.DEVICE_HEIGHT, -10]
    });

    // weather info slide up
    const bottom = this.props.animationState.interpolate({
      inputRange: [0, 1],
      outputRange: [-Style.DEVICE_HEIGHT, 0]
    });

    const flex = isSelected? 8 : 3;
    

    return this.props.show ? (
      <View 
        style={{flex }}>
        <TouchableNativeFeedback 
          onPress={this.props.onPress}
          background={TouchableNativeFeedback.SelectableBackground()}>
          <View style={viewStyle}>
            <View style={styles.halfView}>
              <Animated.View style={{top, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                { isSelected ? this._weatherAnimation(icon) : null}
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
    ) : null;
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
    fontSize: Style.em(1.5)
  },
  degree: {
    color: '#fff',
    fontSize: Style.em(2.5),
    paddingBottom: 10
  },
});

