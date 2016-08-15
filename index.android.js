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
  TouchableNativeFeedback
} from 'react-native';

import { Sun, Cloud, Rain, Snow} from './components/weather_icons/';
const icon = require('react-native-iconic-font/weathericons');

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

var morning = '9am';
var afternoon = '12pm';
var evening = '3pm';
var night = '6pm';

class weather extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selected: 'morning',
      animating: false,
      morningHeight: new Animated.Value(8),
      afternoonHeight: new Animated.Value(3),
      eveningHeight: new Animated.Value(3),
      nightHeight: new Animated.Value(3),
      morningInfo: new Animated.Value(70),
      afternoonInfo: new Animated.Value(-80),
      eveningInfo: new Animated.Value(-80),
      nightInfo: new Animated.Value(-80),
      morningWeather: new Animated.Value(0),
      afternoonWeather: new Animated.Value(-300),
      eveningWeather: new Animated.Value(-300),
      nightWeather: new Animated.Value(-300)
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
    if (this.state.animating)
      return 

    this.state.animating = true;
    Animated.parallel([
      Animated.timing(
        this.state[this.state.selected + 'Height'], {
          toValue: 3,
          duration: 500,
          easing: Easing.bezier(0.645, 0.045, 0.355, 1)
        }
      ),
      Animated.timing(
        this.state[timeSelected + 'Height'], {
          toValue: 8,
          duration: 500,
          easing: Easing.bezier(0.645, 0.045, 0.355, 1)
        }
      ),
      Animated.timing(
        this.state[this.state.selected + 'Info'], {
          toValue: -80,
          duration: 200,
          easing: Easing.bezier(0.645, 0.045, 0.355, 1)
        }
      ),
      Animated.timing(
        this.state[timeSelected + 'Info'], {
          toValue: 70,
          delay: 200,
          duration: 500,
          easing: Easing.bezier(0.645, 0.045, 0.355, 1)
        }
      ),
      Animated.timing(
        this.state[this.state.selected + 'Weather'], {
          toValue: -300,
          duration: 500,
          easing: Easing.bezier(0.645, 0.045, 0.355, 1)
        }
      ),
      Animated.timing(
        this.state[timeSelected + 'Weather'], {
          toValue: 0,

          duration: 500,
          easing: Easing.bezier(0.645, 0.045, 0.355, 1)
        }
      )
    ]).start(() => {
      this.setState({ 
        animating: false, 
        selected: timeSelected 
      })
    });


  }

  render() {

    const timesOfDays = ['morning', 'afternoon', 'evening', 'night'];
    const weatherLayout = timesOfDays.map((time) => {
  
      const infoStyle = [styles.hiddenText, {bottom: this.state[time + 'Info']}];

      return (
        <Animated.View 
          key={time}
          style={{flex: this.state[time + 'Height']}}>
          <TouchableNativeFeedback 
            onPress={this._onPressTime.bind(this, time)}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={styles[time]}>
              <View style={styles.halfView}>
                <Animated.View style={{top: this.state[time + 'Weather']}}>
                  <Snow  />              
                </Animated.View>

              </View>
              <View style={styles.halfView}>
                <Text style={styles.header}>{time.toUpperCase()}</Text>
                <Text style={styles.degree}>-2&deg;</Text>
                <Animated.View style={infoStyle}>
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
  },
  summary: {
    paddingBottom: 10,
    color: '#fff',
    fontSize: 28,
    fontWeight: '500'
  },
  hiddenText: {
    position: 'absolute',
  },
  text: {
    color: '#fff',
    fontWeight: '500',
  }
});

AppRegistry.registerComponent('weather', () => weather);
