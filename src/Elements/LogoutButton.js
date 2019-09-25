import React, { Component } from 'react';
import { Image } from 'react-native';
import {  Button } from 'native-base';

export default class LogoutButton extends Component {
  render() {
    return (
          <Button bordered warning  style={{width:40, height:40, borderRadius:10, margin:5}}>
            <Image style={{width:40, height:40, borderRadius:10}} source={require('../imgs/logout.png')}/>
          </Button>
    );
  }
}