/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  UIManager,
  Animated,
  Easing,
  TouchableNativeFeedback,
  LayoutAnimation
} from 'react-native';

const { create, configureNext, Types, Properties } = LayoutAnimation;

import { Sun, Cloud, Rain, Snow} from './components/weather_icons/';
const icon = require('react-native-iconic-font/weathericons');

UIManager.setLayoutAnimationEnabledExperimental && 
UIManager.setLayoutAnimationEnabledExperimental(true);

var morning = '9am';
var afternoon = '12pm';
var evening = '3pm';
var night = '6pm';

class weather extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selected: 'morning',
      morningInfo: new Animated.Value(0),
      afternoonInfo: new Animated.Value(-180),
      eveningInfo: new Animated.Value(-180),
      nightInfo: new Animated.Value(-180),
      morningWeather: new Animated.Value(-10),
      afternoonWeather: new Animated.Value(-350),
      eveningWeather: new Animated.Value(-350),
      nightWeather: new Animated.Value(-350)
    }

    this.render.bind(this);
  }
  componentDidMount() {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     var apiKey = 'f7bad367bde9bc6ea4311bba3c939d0a'
    //     const coords = position.coords;
    //     fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&apikey=${apiKey}`)
    //       .then((response) => response.json())
    //       .then((responseJson) => {
    //         return responseJson.list.map((item ) => {
    //           return item.dt
    //         });
    //       })
    //       .then((list) => {
    //         console.log(Date.now());
    //         // console.log(list);
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   },
    //   (error) => alert(error),
    //   {enableHighAccuracy: false}
    
    //);
  }
  _onPressTime(timeSelected) {
    if (this.state.selected === timeSelected)
      return 

    const prevSelected = this.state.selected;
    
    Animated.parallel([
      Animated.timing(
        this.state[prevSelected + 'Info'], {
          toValue: -180,
          duration: 200,
          easing: Easing.bezier(0.645, 0.045, 0.355, 1)
        }
      ),
      Animated.timing(
        this.state[prevSelected + 'Weather'], {
          toValue: -350,
          duration: 200,
          easing: Easing.bezier(0.645, 0.045, 0.355, 1)
        }
      ),
    ]).start(() => {
      const config = create(250, Types.easeOut, Properties.opacity);
      configureNext(config);
      this.setState({ 
        selected: timeSelected 
      }, () => {
         Animated.parallel([
          Animated.timing(
            this.state[timeSelected + 'Info'], {
              toValue: 0,
              delay: 200,
              duration: 500,
              easing: Easing.bezier(0.645, 0.045, 0.355, 1)
            }
          ),
          Animated.timing(
            this.state[timeSelected + 'Weather'], {
              toValue: -10,
              duration: 500,
              easing: Easing.bezier(0.645, 0.045, 0.355, 1)
            }
          )
        ]).start();
      })
    }) 
  }

  render() {

    const timesOfDays = ['morning', 'afternoon', 'evening', 'night'];
    const weatherLayout = timesOfDays.map((time) => {

      const isSelected = this.state.selected === time;
      const flex = isSelected? 8 : 3;

      const info = (
        <Animated.View>
          <Text style={styles.summary}>Sunny</Text>
          <Text style={styles.text}>Wind: E 7 mph</Text>
          <Text style={styles.text}>Humidity: 91%</Text>
        </Animated.View>
      );

      // TEMPORARY
      const weathers = [<Cloud style={{left: 40}}/>, <Sun/>, <Rain/>, <Snow/>];
      const weather = weathers[Math.floor( Math.random() * 4)];

      return (
        <Animated.View 
          key={time}
          style={{flex }}>
          <TouchableNativeFeedback 
            onPress={this._onPressTime.bind(this, time)}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={[styles[time]]}>
              <View style={styles.halfView}>
                <Animated.View style={{top: this.state[time + 'Weather']}}>
                  { isSelected ? weather : null}
                </Animated.View>
  
              </View>
              <View style={styles.halfView}>
                <Text style={styles.header}>{time.toUpperCase()}</Text>
                <Text style={styles.degree}>-2&deg;</Text>

                <Animated.View style={{bottom: this.state[time + 'Info']}}>
                  <Text style={styles.summary}>Sunny</Text>
                  <Text style={styles.text}>Wind: E 7 mph</Text>
                  <Text style={styles.text}>Humidity: 91%</Text>
                </Animated.View>
              </View>
          </View>
        </TouchableNativeFeedback>
      </Animated.View>
      )
    })

    return (
      <View style={styles.container}>
        { weatherLayout }
      </View>
    );
  }
}

const colorBase = '#8ba892';
const colorMorning = '#e3bb88';
const colorAfternoon = '#d89864';
const colorEvening = '#b1695a';
const colorNight = '#644749';


const viewStyleBase = {
    flexDirection: 'row',
    paddingTop: 16,
    flex: 1
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colorBase,
    paddingTop: 33
  },
  morning: {
    ...viewStyleBase,
    backgroundColor: colorMorning
  },
  afternoon: {
    ...viewStyleBase,
    backgroundColor: colorAfternoon
  },
  evening: {
    ...viewStyleBase,
    backgroundColor: colorEvening
  },
  night: {
    ...viewStyleBase,
    backgroundColor: colorNight
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
    fontSize: 34,
    paddingBottom: 10
  },
  summary: {
    paddingBottom: 10,
    color: '#fff',
    fontSize: 28,
    fontWeight: '500'
  },
  text: {
    color: '#fff',
    fontWeight: '500',
  }
});

AppRegistry.registerComponent('weather', () => weather);
