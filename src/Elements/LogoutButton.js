import React, { Component } from 'react';
import { Image } from 'react-native';
import {  Button } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage'
import { withNavigation } from 'react-navigation';
import { logout } from '../public/redux/actions/user';
import { resetWishlist } from '../public/redux/actions/wishlist';
import { connect } from 'react-redux';

class LogoutButton extends Component {

  
  logout = () => {
    AsyncStorage.clear();
    this.props.dispatch(logout());
    this.props.dispatch(resetWishlist());
    this.props.navigation.navigate('CategoryScreen');
    alert('Logout Success')
  }

  render() {
    return (
          <Button bordered warning  style={{width:40, height:40, borderRadius:10, margin:5}} onPress={this.logout}>
            <Image style={{width:40, height:40, borderRadius:10}} source={require('../imgs/logout.png')}/>
          </Button>
    );
  }
}

export default withNavigation(connect()(LogoutButton));
