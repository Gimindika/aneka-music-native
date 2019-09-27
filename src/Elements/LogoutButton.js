import React, { Component } from 'react';
import { Image } from 'react-native';
import {  Button, Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage'
import { withNavigation } from 'react-navigation';
import { logout } from '../public/redux/actions/user';
import { resetWishlist } from '../public/redux/actions/wishlist';
import { resetCart } from '../public/redux/actions/cart';

import { connect } from 'react-redux';

import HeaderComponent from '../Components/HeaderComponent';

class LogoutButton extends Component {

  
  logout = () => {
    this.props.resetID();
    AsyncStorage.removeItem('userName')
    AsyncStorage.removeItem('id')
    AsyncStorage.removeItem('userEmail')
    AsyncStorage.removeItem('userLevel')
    AsyncStorage.removeItem('token')
    this.props.dispatch(logout());
    this.props.dispatch(resetWishlist());
    this.props.dispatch(resetCart());
    this.props.navigation.navigate('CategoryScreen');
    alert('Logout Success')
  }

  render() {
    return (
          <Button bordered warning  style={{width:40, height:40, borderRadius:10, margin:5, borderColor:'white'}} onPress={this.logout}>
            {/* <Image style={{width:40, height:40, borderRadius:10}} source={require('../imgs/logout.png')}/> */}
            <Icon name="exit" style={{ color:'white',width:40, height:40, borderRadius:10, paddingLeft:10, paddingTop:7}}/>
          </Button>
    );
  }
}

export default withNavigation(connect()(LogoutButton));
