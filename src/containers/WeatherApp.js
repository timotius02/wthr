import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {
  StyleSheet,
  View,
  UIManager,
  Animated,
  Easing,
  LayoutAnimation,
  ActivityIndicator
} from 'react-native';

import MenuButton from '../components/MenuButton';

import { fetchWeather, setSelectedTime } from '../actions/';

import Card from '../components/Card';

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

class WeatherApp extends Component {
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
      morning: {
        animationState: morningState
      },
      afternoon: {
        animationState: afternoonState
      },
      evening: {
        animationState: eveningState
      },
      night: {
        animationState: nightState
      }
    }


    this.render.bind(this);
  }

  componentDidMount() {
    const times = [morningDate.getTime() / 1000, afternoonDate.getTime() / 1000, eveningDate.getTime() / 1000, nightDate.getTime() / 1000];
    this.props.fetchWeather(times);
  }
  _onPressTime(timeSelected) {
    if (this.state.selected === timeSelected)
      return 

    const prevSelected = this.props.selected;
    
    Animated.timing(
      this.state[prevSelected].animationState, {
        toValue: 0,
        duration: 200,
        easing: Easing.bezier(0.645, 0.045, 0.355, 1)
      }
    ).start(() => {
      const config = create(250, Types.easeOut, Properties.opacity);
      configureNext(config);
      
      this.props.setSelectedTime(timeSelected);
      Animated.timing(
        this.state[timeSelected].animationState, {
          toValue: 1,
          easing: Easing.bezier(0.645, 0.045, 0.355, 1)
        }
      ).start();

    }) 
  }

  render() {

    const { times } = this.props;
    const weatherLayout = Object.keys(times).map((time) => {
      const { temperature, icon, ...other } = times[time];
      
      const { animationState } = this.state[time];

      const isSelected = this.props.selected === time;

      return (
        <Card key={time} {...other} time={time} temperature={temperature} isSelected={isSelected}
            onPress={this._onPressTime.bind(this, time)} animationState={animationState} />
      )
    })
    
    const loadingScreen = <ActivityIndicator style={styles.centering} color='white' size='large'/>;
    
    const layout = [<MenuButton key={'menu'} />].concat(weatherLayout);

    const containerStyle = [styles.container, this.props.loading? styles.loading : {}];
    return (
      <View style={containerStyle}>
        { this.props.loading? loadingScreen : layout }
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
  loading: {
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
});


function mapStateToProps(state) {
  const { selected, loading, coords, error, times} = state;
  return {
    selected,
    loading,
    coords,
    error,
    times
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWeather: bindActionCreators(fetchWeather, dispatch),
    setSelectedTime: bindActionCreators(setSelectedTime, dispatch)
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherApp);

