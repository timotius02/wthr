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
  TouchableNativeFeedback, // Android Specific
  LayoutAnimation,
  ActivityIndicator
} from 'react-native';

import { 
  Sun, 
  Cloud, 
  Rain, 
  Snow
} from './components/weather_icons/';

import fetchWeather from './api/api';

import WeatherInfo from './components/WeatherInfo';
import MenuButton from './components/MenuButton';


const { create, configureNext, Types, Properties } = LayoutAnimation;

// Android Specific
UIManager.setLayoutAnimationEnabledExperimental && 
UIManager.setLayoutAnimationEnabledExperimental(true);


var morningTime = '9:00 am';
var afternoonTime = '12:00 pm';
var eveningTime = '3:00 pm';
var nightTime= '6:00 pm';

const now = new Date();
const morningDate = new Date(`${now.toDateString()} ${morningTime}`);
const afternoonDate = new Date(`${now.toDateString()} ${afternoonTime}`);
const eveningDate = new Date(`${now.toDateString()} ${eveningTime}`);
const nightDate = new Date(`${now.toDateString()} ${nightTime}`);

const times = [morningDate.getTime() / 1000, afternoonDate.getTime() / 1000, eveningDate.getTime() / 1000, nightDate.getTime() / 1000];


class weather extends Component {
  constructor(props) {
    super(props);
  
    let selected = 'morning';
    
    if (now.getTime() > morningDate.getTime()) {
      selected = 'afternoon';
      morningDate.setDate(morningDate.getDate() + 1);
    }
    if (now.getTime() > afternoonDate.getTime()) {
     
      selected = 'evening';  
      afternoonDate.setDate(afternoonDate.getDate() + 1);
    }
    if (now.getTime() > eveningDate.getTime()) {
   
      selected = 'night'  
      eveningDate.setDate(eveningDate.getDate() + 1);
    }
   
    const morningState = new Animated.Value(selected === 'morning'? 1 : 0);
    const afternoonState = new Animated.Value(selected === 'afternoon'? 1 : 0);
    const eveningState = new Animated.Value(selected === 'evening'? 1 : 0);
    const nightState = new Animated.Value(selected === 'night'? 1 : 0);

    this.state = { 
      loading: true,
      selected,
      morning: {
        animationState: morningState,
        temperature: 0,
        summary: 'Sunny',
        icon: 'clear-day',
        windSpeed: '7',
        humidity: 0.91 
      },
      afternoon: {
        animationState: afternoonState,
        temperature: 0,
        summary: 'Sunny',
        icon: 'clear-day',
        windSpeed: '7',
        humidity: 0.91 
      },
      evening: {
        animationState: eveningState,
        temperature: 0,
        summary: 'Sunny',
        icon: 'clear-day',
        windSpeed: '7',
        humidity: 0.91 
      },
      night: {
        animationState: nightState,
        temperature: 0,
        summary: 'Sunny',
        icon: 'clear-day',
        windSpeed: '7',
        humidity: 0.91 
      }
    }


    this.render.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords;

        fetchWeather(coords.latitude, coords.longitude, times)
          .then((weather) => {
            const morning = weather[0];
            const afternoon = weather[1];
            const evening = weather[2];
            const night = weather[3];

            this.setState({
              loading: false,
              morning: {
                ...this.state.morning, ...morning
              },
              afternoon: {
                ...this.state.afternoon, ...afternoon
              },
              evening: {
                ...this.state.evening, ...evening
              },
              night: {
                ...this.state.night, ...night
              }
            }); 
          })
          .catch((error) => {
            console.log(error);
          })
      },
      (error) => alert(error),
      {enableHighAccuracy: false}
    
    );
  }
  _onPressTime(timeSelected) {
    if (this.state.selected === timeSelected)
      return 

    const prevSelected = this.state.selected;
    
    Animated.parallel([
      Animated.timing(
        this.state[prevSelected].animationState, {
          toValue: 0,
          duration: 200,
          easing: Easing.bezier(0.645, 0.045, 0.355, 1)
        })
    ]).start(() => {
      const config = create(250, Types.easeOut, Properties.opacity);
      configureNext(config);
      this.setState({ 
        selected: timeSelected 
      }, () => {
         Animated.parallel([
          Animated.timing(
            this.state[timeSelected].animationState, {
              toValue: 1,
              easing: Easing.bezier(0.645, 0.045, 0.355, 1)
            })
        ]).start();
      })
    }) 
  }

  render() {

    const timesOfDays = ['morning', 'afternoon', 'evening', 'night'];
    const weatherLayout = timesOfDays.map((time) => {

      const { animationState, temperature, icon, ...other } = this.state[time];

      const isSelected = this.state.selected === time;
      const flex = isSelected? 8 : 3;

      // TEMPORARY
      const weathers = [<Cloud style={{left: 40}}/>, <Sun/>, <Rain/>, <Snow/>];
      const weather = weathers[Math.floor( Math.random() * 4)];

      // Weather animation slide down
      const top = animationState.interpolate({
        inputRange: [0, 1],
        outputRange: [-350, -10]
      });

      // weather info slide up
      const bottom = animationState.interpolate({
        inputRange: [0, 1],
        outputRange: [-180, 0]
      });

      const viewStyle = [styles.viewStyleBase, {backgroundColor: color[time]}];
      
      return (
        <View 
          key={time}
          style={{flex }}>
          <TouchableNativeFeedback 
            onPress={this._onPressTime.bind(this, time)}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={viewStyle}>
              <View style={styles.halfView}>
                <Animated.View style={{top}}>
                  { isSelected ? weather : null}
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
    })
    
    const loadingScreen = <ActivityIndicator style={styles.centering} color='white' size='large'/>;
    const loadingStyle = {
      paddingTop: 0,
      alignItems: 'center',
      justifyContent: 'center',
    }
    
    const layout = [<MenuButton key={'menu'} />].concat(weatherLayout);

    const containerStyle = [styles.container, this.state.loading? loadingStyle : {}];
    return (
      <View style={containerStyle}>
        { this.state.loading? loadingScreen : layout }
      </View>
    );
  }
}

const color = {
  base: '#8ba892',
  morning: '#e3bb88',
  afternoon: '#d89864',
  evening: '#b1695a',
  night: '#644749'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: color.base
  },
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

AppRegistry.registerComponent('weather', () => weather);
