

import React, {Fragment} from 'react';
import {ScrollView, View, Text, Image, Dimensions} from 'react-native';
// import ItemCard from '../Components/ItemCard';

import {  Card, CardItem, Body, Icon, Left, Right } from "native-base";
import HeaderComponent  from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getCart, editCart, deleteCart, clearCart } from '../public/redux/actions/cart';
import { newTransaction } from '../public/redux/actions/transactions';
import AsyncStorage from '@react-native-community/async-storage'




// import Cart from './Cart';


class ProfileScreen extends React.Component {
 

  render(){
    const  {height, width} = Dimensions.get('window');
    
    return (
        <Fragment>
            <HeaderComponent/>
            

            <FooterComponent/>
        </Fragment>
    );
  }
  
};


function mapStateToProps(state){
  return{
      user: state.cart.user
  }
}

export default connect(mapStateToProps)(ProfileScreen);