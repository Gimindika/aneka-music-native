

import React, {Fragment} from 'react';
import {Text} from 'react-native';
import HeaderComponent  from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';

import Wishlist from './Wishlist';


const dummy = [
  {
    name:'wishlist',
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

class ItemListScreen extends React.Component {

  render(){
    return (
        <Fragment>
            <HeaderComponent/>
            <Text>Wishlist</Text>
            <Wishlist items={dummy}/>

            <FooterComponent/>
        </Fragment>
    );
  }
  
};

export default ItemListScreen ;
