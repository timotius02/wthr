import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  Text,
  Animated,
  PanResponder,
  Easing,
  Platform
} from 'react-native';

import { openMenu, closeMenu } from '../actions'; 

import Style from '../stylesheets/Style';

const icon = require('react-native-iconic-font/materialicons');

export default class MenuButton extends Component {
  constructor(props) {
    super(props)

    this._minHeight = Style.HEIGHT_UNIT;
    this._maxHeight = 200;

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
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
          this.state.height.setOffset(this.state.height._value);
          this.state.height.setValue(0);
      },
      onPanResponderMove: Animated.event([
          null, {dy: this.state.height}
        ]),
      onPanResponderTerminationRequest: () => true,
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

function mapStateToProps(state) {
  const { isMenuOpen } = state;
  return {
    isMenuOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: bindActionCreators(openMenu, dispatch),
    closeMenu: bindActionCreators(closeMenu, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton);
