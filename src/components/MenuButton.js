import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Text,
  Animated,
  PanResponder,
  Easing,
  Platform,
  Switch,
  View
} from 'react-native';

import { openMenu, closeMenu, toggle } from '../actions'; 

import Style from '../stylesheets/Style';

const icon = require('react-native-iconic-font/materialicons');

export default class MenuButton extends Component {
  constructor(props) {
    super(props)

    this._minHeight = Style.HEIGHT_UNIT;
    this._maxHeight = Style.HEIGHT_UNIT * 8;

    this.state = {
      height: new Animated.Value(this._minHeight)
    }

    this._newPanHandler.bind(this);
    this.open.bind(this);
    this.close.bind(this);
  }


  _newPanHandler() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (e, gestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && Math.abs(gestureState.dy) > 8;
      },

      onPanResponderGrant: () => {
          this.state.height.setOffset(this.state.height._value);
          this.state.height.setValue(0);
      },
      onPanResponderMove: Animated.event([
          null, {dy: this.state.height}
        ]),
      onPanResponderRelease: () => {
        this.state.height.flattenOffset();

        // Snap to min/max height of the menu
        const midHeight = (this._minHeight + this._maxHeight) /2;
        if (this.state.height._value >= midHeight) {
           this.open();
        }
        else {
          this.close();
        }
      },
    });
  }
  open() {
    Animated.timing(this.state.height, {
      toValue: this._maxHeight,
      easing: Easing.out(Easing.ease),
      duration: 100
    }).start(() => {
        this.props.openMenu();
    });
  }

  close() {
    Animated.timing(this.state.height, {
      toValue: this._minHeight,
      easing: Easing.out(Easing.ease),
      duration: 100
    }).start(() => {
      this.props.closeMenu();
    });
  }
  
  componentWillMount() {
     this._newPanHandler();
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.isMenuOpen === false && this.props.isMenuOpen === true) {
      this.close()
    }
  }
  _switch(time) {
    // console.log('switch' + time);
    this.props.toggle(time);
  }
  render() {
    // DOn't allow user to pull tab above or below limit
    let height = this.state.height.interpolate({
      inputRange: [this._minHeight - 1, this._minHeight, this._maxHeight, this._maxHeight + 1],
      outputRange: [this._minHeight, this._minHeight, this._maxHeight, this._maxHeight]
    })
    

    return (
      <Animated.View 
        {...this._panResponder.panHandlers} 
        style={{height}}
        onLayout={this._newPanHandler.bind(this)}>
        {this.props.isMenuOpen ? 
          <View style={styles.menu}>
            <Text style={styles.title}>OPTIONS</Text>
            <View style={styles.row}>
              <Text style={styles.text}>MORNING</Text>
              <Switch value={this.props.showMorning} 
              onValueChange={this._switch.bind(this, 'morning')}/>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>AFTERNOON</Text>
              <Switch value={this.props.showAfternoon} 
              onValueChange={this._switch.bind(this, 'afternoon')}/>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>EVENING</Text>
              <Switch value={this.props.showEvening}
              onValueChange={this._switch.bind(this, 'evening')}/>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>NIGHT</Text>
              <Switch value={this.props.showNight}
              onValueChange={this._switch.bind(this, 'night')}/>
            </View>

          </View>:
          <Text style={styles.icon}>
            {icon('drag_handle')}
          </Text> 
        }         
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: Style.FONT_SIZE_TITLE,
    color: '#fff',
    textAlign: 'center',
    paddingBottom: Style.PADDING / 2
  },
  text: {
    fontWeight: '700',
    fontSize: Style.UNIT,
    color: '#fff',
    opacity: 0.7
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Style.PADDING / 2
  },
  menu: {
    padding: Style.PADDING * 2,
  },
  icon: {
    fontFamily: Platform.OS === 'ios' ? 'Material Icons' : 'materialicons',
    fontSize: Style.em(2.5),
    color: '#fff',
    opacity: 0.5, 
    textAlign: 'right',
    paddingRight: Style.UNIT
  },
})

function mapStateToProps(state) {
  const { isMenuOpen, times } = state;
  return {
    isMenuOpen,
    showMorning: times.morning.show,
    showAfternoon: times.afternoon.show,
    showEvening: times.evening.show,
    showNight: times.night.show
  }
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: bindActionCreators(openMenu, dispatch),
    closeMenu: bindActionCreators(closeMenu, dispatch),
    toggle: bindActionCreators(toggle, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton);
