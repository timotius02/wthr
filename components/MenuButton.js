import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
} from 'react-native';

const icon = require('react-native-iconic-font/materialicons');


export default class MenuButton extends Component {
  constructor(props) {
    super(props)

    this._container;

    this._minHeight = 33;
    this._maxHeight = 200;
    this._containerProps = {
      style: {
        height: this._minHeight
      }
    }

    this._updateHeight.bind(this);
  }
  
  componentWillMount() {
     this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
          this._updateHeight(this._minHeight)
      },
      onPanResponderMove: (evt, gestureState) => {
          this._updateHeight(this._minHeight + gestureState.dy);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const midHeight = (this._minHeight + this._maxHeight) /2;
        if (this._containerProps.style.height <= midHeight) {
          this._updateHeight(this._minHeight);
        }
        else {
          this._updateHeight(this._maxHeight); 
        }

      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
    });
  }
  componentDidMount() {
    this._updateHeight(this._minHeight);
  }

  _updateHeight(height) {
    this._containerProps.style.height = height;
    
    if (this._containerProps.style.height >= this._minHeight &&
        this._containerProps.style.height <= this._maxHeight) {
      this._container.setNativeProps(this._containerProps);
    }
  }
 
  render() {
    return (
      <View ref={view => this._container = view} {...this._panResponder.panHandlers}>
        <Text style={styles.icon}>
          {icon('drag_handle')}
        </Text>          

      </View>
    )
  }
}

const styles = StyleSheet.create({

  icon: {
    fontFamily: 'materialicons',
    fontSize: 33,
    color: '#fff',
    opacity: 0.5, 
    textAlign: 'right',
    paddingRight: 10
  },
})