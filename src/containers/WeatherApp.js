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
import Card from '../components/Card';

import { fetchWeather, setSelectedTime, closeMenu } from '../actions/';

import Style from '../stylesheets/Style';


const { create, configureNext, Types, Properties } = LayoutAnimation;

// Android Specific
UIManager.setLayoutAnimationEnabledExperimental && 
UIManager.setLayoutAnimationEnabledExperimental(true);


class WeatherApp extends Component {
  constructor(props) {
    super(props);
    
    const { selected } = props;
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
    const { morning, afternoon, evening, night } = this.props.times;
    const times = [ morning.time, afternoon.time, evening.time, night.time];
    this.props.fetchWeather(times);
  }
  _onPressTime(timeSelected) {
    const { selected, setSelectedTime, isMenuOpen, closeMenu } = this.props;

    if (isMenuOpen) {
      closeMenu();
      return
    }
    else if (selected === timeSelected)
      return 


    Animated.timing(
      this.state[selected].animationState, {
        toValue: 0,
        duration: 200,
        easing: Easing.bezier(0.645, 0.045, 0.355, 1)
      }
    ).start(() => {
      const config = create(250, Types.easeOut, Properties.opacity);
      configureNext(config);
      
      setSelectedTime(timeSelected);
      Animated.timing(
        this.state[timeSelected].animationState, {
          toValue: 1,
          easing: Easing.bezier(0.645, 0.045, 0.355, 1)
        }
      ).start();

    }) 
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isMenuOpen !== this.props.isMenuOpen) {
      return false;
    }

    return true;
  }

  render() {

    const { times, selected, loading, isMenuOpen, closeMenu } = this.props;
    const weatherLayout = Object.keys(times).map((time) => {
      
      const { animationState } = this.state[time];
      const isSelected = selected === time;

      return (
        <Card key={time} {...times[time]} time={time}  isSelected={isSelected}
            onPress={this._onPressTime.bind(this, time)} animationState={animationState} />
      )
    })
    
    const layout = [<MenuButton key={'menu'} />].concat(weatherLayout);

    const containerStyle = [styles.container, loading? styles.loading : {}];
    return (
      <View style={containerStyle}>
        { 
          loading? 
          <ActivityIndicator style={styles.centering} color='white' size='large'/>: 
          layout 
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Style.COLORS.base
  },
  loading: {
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
});


function mapStateToProps(state) {
  const { selected, loading, coords, times, isMenuOpen } = state;
  return {
    isMenuOpen,
    selected,
    loading,
    coords,
    times
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWeather: bindActionCreators(fetchWeather, dispatch),
    setSelectedTime: bindActionCreators(setSelectedTime, dispatch),
    closeMenu: bindActionCreators(closeMenu, dispatch)
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherApp);

