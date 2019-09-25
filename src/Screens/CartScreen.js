

import React, {Fragment} from 'react';

import { Button, Text } from 'native-base';
import HeaderComponent  from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';


import Cart from './Cart';


const dummy = [
  {
    name:'cart',
    image:'https://d1aeri3ty3izns.cloudfront.net/media/25/253487/600/preview.jpg',
    branch:'balikgitar',
    price:20000
  },
  {
    name:'batu',
    image:'https://d1aeri3ty3izns.cloudfront.net/media/30/303944/600/preview_1.jpg',
    branch:'balikbatu',
    price:20400
  },
  {
    name:'kayu',
    image:'https://d1aeri3ty3izns.cloudfront.net/media/25/253487/600/preview.jpg',
    branch:'balikkayu',
    price:10000
  },
  {
    name:'bola',
    image:'https://d1aeri3ty3izns.cloudfront.net/media/25/253487/600/preview.jpg',
    branch:'balikbola',
    price:23000
  }
]

class CartScreen extends React.Component {

  render(){
    return (
        <Fragment>
            <HeaderComponent user='true' />
            <Text>Cart</Text>
            <Cart items={dummy}/>

            <TouchableOpacity>
           
                    <Text style={{color:'white', backgroundColor:'orange', textAlign:"center", textAlignVertical:"center", height:40}} onPress={() => alert('checkout')} >Checkout</Text>
            
            </TouchableOpacity>

            <FooterComponent/>
        </Fragment>
    );
  }
  
};

export default CartScreen ;
