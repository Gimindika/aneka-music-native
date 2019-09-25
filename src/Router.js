
import React, {Fragment} from 'react';

import CategoryScreen from './Screens/CategoryScreen';
import ItemListScreen from './Screens/ItemListScreen';
import TransactionScreen from './Screens/TransactionScreen';
import WishlistScreen from './Screens/WishlistScreen';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const Router = createStackNavigator({
    CategoryScreen: {
    screen: CategoryScreen
  },
  ItemListScreen: {
    screen: ItemListScreen
  },
  TransactionScreen: {
    screen: TransactionScreen
  },
  WishlistScreen: {
    screen: WishlistScreen
  },
  CartScreen: {
    screen: CartScreen
  },
  LoginScreen: {
    screen: LoginScreen
  },
  RegisterScreen: {
    screen: RegisterScreen
  }
},
{
  initialRouteName:"CategoryScreen",
  headerMode:"none"
}

)

const AppContainer  = createAppContainer(Router)
export default AppContainer ;
