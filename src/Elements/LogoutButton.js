import React, { Component } from 'react';
import { ToastAndroid, View } from 'react-native';
import {  Button, Icon, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage'
import { withNavigation } from 'react-navigation';
import { logout } from '../public/redux/actions/user';
import { resetWishlist } from '../public/redux/actions/wishlist';
import { resetCart } from '../public/redux/actions/cart';
import { TouchableOpacity } from 'react-native-gesture-handler';


import { connect } from 'react-redux';

class LogoutButton extends Component {

  
  logout = () => {
    AsyncStorage.removeItem('userName')
    AsyncStorage.removeItem('id')
    AsyncStorage.removeItem('userEmail')
    AsyncStorage.removeItem('userLevel')
    AsyncStorage.removeItem('token')
    this.props.dispatch(logout());
    this.props.dispatch(resetWishlist());
    this.props.dispatch(resetCart());

    ToastAndroid.showWithGravity(
      'Logout Success',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );

    this.props.navigation.navigate('CategoryScreen');
  }

  render() {
    return (
      <TouchableOpacity style={{borderColor:'white', borderWidth:1, width:100,height:40 ,borderRadius:10, alignSelf:"center", marginLeft:"-10%",marginBottom:"5%",backgroundColor:'red',}} onPress={this.logout}>
        <View >
          <Text style={{fontSize:20, textAlign:"center",  textAlignVertical:"center",  color:'white'}}>Log Out</Text>
        </View>
      </TouchableOpacity>
          // <Button bordered warning  style={{width:40, height:40, borderRadius:10, margin:5, borderColor:'white'}} onPress={this.logout}>
          //   {/* <Image style={{width:40, height:40, borderRadius:10}} source={require('../imgs/logout.png')}/> */}
          //   <Icon name="exit" style={{ color:'white',width:40, height:40, borderRadius:10, paddingLeft:10, paddingTop:7}}/>
          // </Button>
    );
  }
}

export default withNavigation(connect()(LogoutButton));
