import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  PanResponder,
  Easing,
  Platform
} from 'react-native';

import Style from '../stylesheets/Style';

const icon = require('react-native-iconic-font/materialicons');


export default class MenuButton extends Component {
  constructor(props) {
    super(props)

    this._minHeight = Style.HEIGHT_UNIT;
    this._maxHeight = 200;

    this.state = {
      height: new Animated.Value(this._minHeight),
      menuOpen: false
    }

    this._newPanHandler.bind(this);
    this.open.bind(this);
    this.close.bind(this);
  }

  _newPanHandler() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
          this.state.height.setOffset(this.state.height._value);
          this.state.height.setValue(0);
      },
      onPanResponderMove: Animated.event([
          null, {dy: this.state.height}
        ]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.state.height.flattenOffset();

        // Snap to min/max height of the menu
        const midHeight = (this._minHeight + this._maxHeight) /2;
        if (this.state.height._value <= midHeight) {
          this.open()
        }
        else {
          this.close();
        }
      },
    });
  }
  open() {
    Animated.timing(this.state.height, {
      toValue: this._minHeight,
      easing: Easing.out(Easing.ease),
      duration: 100
    }).start(() => {
      if (this.state.menuOpen === true) 
        this.setState({menuOpen: false})
    });
  }

  close() {
    Animated.timing(this.state.height, {
      toValue: this._maxHeight,
      easing: Easing.out(Easing.ease),
      duration: 100
    }).start(() => {
      this.setState({menuOpen: true});
    });
  }
  
  componentWillMount() {
     this._newPanHandler();
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
        {this.state.menuOpen ? 
          null :
          <Text style={styles.icon}>
            {icon('drag_handle')}
          </Text> 
        }         
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({

  icon: {
    fontFamily: Platform.OS === 'ios' ? 'Material Icons' : 'materialicons',
    fontSize: 33,
    color: '#fff',
    opacity: 0.5, 
    textAlign: 'right',
    paddingRight: 10
  },
})