import React, { Component } from 'react';
import {  Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { withNavigation } from 'react-navigation';



 class FooterComponent extends Component{

  toHome = () => {
    this.props.navigation.navigate('CategoryScreen');
  }

  toTransaction = () => {
    this.props.navigation.navigate('TransactionScreen');
  }

  toWishlist = () => {
    this.props.navigation.navigate('WishlistScreen')
  }

  toCart = () => {
    this.props.navigation.navigate('CartScreen')
  }

   render(){
    return (
      <Footer >
        <FooterTab style={{backgroundColor:'#F5D372'}} >

          <Button vertical onPress={this.toHome}>
            <Icon name="home" style={{color:'white'}} />
            <Text style={{color:'white'}}>Home</Text>
          </Button>
        

          <Button vertical onPress={this.toWishlist}>
            <Icon name="heart" style={{color:'white'}} />
            <Text style={{color:'white'}}>Wishlist</Text>
          </Button>

          <Button vertical onPress={this.toCart}>
            <Icon active name="cart" style={{color:'white'}} />
            <Text style={{color:'white'}}>Cart</Text>
          </Button>
          <Button vertical onPress={this.toTransaction}>
            <Icon active name="calendar" style={{color:'white'}} />
            <Text style={{color:'white'}}>History</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
   }
    
}
export default withNavigation(FooterComponent);