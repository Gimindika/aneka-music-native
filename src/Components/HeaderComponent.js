import React from 'react';
import { Image } from 'react-native';
import {  Header,  Body, Right  } from 'native-base';

import LoginButton from '../Elements/LoginButton';
import LogoutButton from '../Elements/LogoutButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

 function  HeaderComponent(props) {
 
  toHome = () => {
    props.navigation.navigate('CategoryScreen');
  }

  return (
      <Header style={{backgroundColor:'#F5D372', alignItems:"flex-start"}} androidStatusBarColor='#F5C372'>
      
        {/* <Left/> */}
        <TouchableOpacity style={{ alignItems:"center"}} onPress={toHome}>
        {/* <Body style={{ alignItems:"center"}}> */}
          <Image style={{width:100, height:50, borderRadius:10}} source={require('../imgs/logo.png')}/>
        {/* </Body> */}
        </TouchableOpacity>
        <Right />
        {props.user ? 
          <LoginButton/>
          :
          <LogoutButton/>
        }
      </Header>
  );
}


export default withNavigation(HeaderComponent);