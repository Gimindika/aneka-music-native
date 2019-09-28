import React, { Component } from 'react';
import { Image } from 'react-native';
import {  Button, Icon, Text } from 'native-base';
import { withNavigation } from 'react-navigation';


class LoginButton extends Component {
  toLogin = () => {
    this.props.navigation.navigate('LoginScreen');
  }
  
  render() {
    return (
          <Button bordered warning  style={{width:100, height:40, borderRadius:10, margin:5, borderColor:'black', backgroundColor:'#F5D372', paddingTop:0, paddingBottom:0, paddingLeft:0, paddingRight:0}} onPress={this.toLogin}>
            <Text style={{fontSize:20, color:"black"}}>LogIn</Text>
          </Button>
    );
  }
}

export default withNavigation(LoginButton);