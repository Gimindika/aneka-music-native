

import React, {Fragment} from 'react';
import {Text} from 'react-native';
import HeaderComponent  from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';
import {Spinner} from 'native-base';
import {getWishlist} from '../public/redux/actions/wishlist';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'



import Wishlist from './Wishlist';

class WishlistScreen extends React.Component {
constructor(props){
    super(props);
    this.state = {
        user:{
          id:'',
          name:'',
          email:'',
        },
        token:'',
        header:'',
    }
  }

  componentDidMount = async () => {

      await AsyncStorage.getItem('id').then((value) => {
        if (value !== null) {
          value = parseInt(value);
          this.setState({user:{...this.state.user, id:value}})
        }
      });

      await AsyncStorage.getItem('token').then((value) => {
        if (value !== null) {
          this.setState({token:value})
        }
      });
      
      const header = {headers:{'authorization':'Bearer '+this.state.token}};
      this.setState({header:header});


      await this.props.dispatch(getWishlist(this.state.user.id, this.state.header));
  }

  render(){
    if(this.props.wishlistLoading){
      return(
        <Fragment>
          <Spinner color='orange' style={{ marginTop: '50%' }} />
        </Fragment>
      )
    }else {

      return (
          <Fragment>
              <HeaderComponent/>
              <Text style={{textAlign:"center", fontSize:30, fontWeight:"900"}}>Wishlist</Text>
              <Wishlist wishlist={this.props.wishlist}/>
  
              <FooterComponent/>
          </Fragment>
      );
    }
  }
  
};

function mapStateToProps(state){
  return{
    wishlistLoading: state.wishlist.isLoading, 
    wishlist: state.wishlist.wishlist
  }
}

export default connect(mapStateToProps)(WishlistScreen);