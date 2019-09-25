import React from 'react';
import { Image } from 'react-native';
import {  Header,  Body, Right  } from 'native-base';

import LoginButton from '../Elements/LoginButton';
import LogoutButton from '../Elements/LogoutButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'



 class HeaderComponent extends React.Component {
  // state = {
  //   user:{
  //     id:''
  //   }
  // }

  componentDidMount =  async () => {
    
  //   await AsyncStorage.getItem('id').then((value) => {
  //     value = parseInt(value);
  //     console.log(value);
  //     if (value !== null) {
  //       this.setState({user:{...this.state.user, id:value}})
  //     }
  //   });
    
  }
  
  toHome = () => {
    console.log(this.state);
    this.props.navigation.navigate('CategoryScreen');
  }

  // logout = () => {
  //   alert('Logout Success')
  //   this.setState({user:{...this.state.user, id:''}})
  //   AsyncStorage.clear();
  //   this.props.navigation.navigate('CategoryScreen');
  // }

  render(){
    return (
        <Header style={{backgroundColor:'#F5D372', alignItems:"flex-start"}} androidStatusBarColor='#F5C372'>
        
          {/* <Left/> */}
          <TouchableOpacity style={{ alignItems:"center"}} onPress={this.toHome}>
          {/* <Body style={{ alignItems:"center"}}> */}
            <Image style={{width:100, height:50, borderRadius:10}} source={require('../imgs/logo.png')}/>
          {/* </Body> */}
          </TouchableOpacity>
          <Right />
          {this.props.user.id ? 
            // <TouchableOpacity  onPress={this.logout}>
            <TouchableOpacity>
              <LogoutButton/>
            </TouchableOpacity>
            :
            <LoginButton/>
            // <LogoutButton/>
          }
        </Header>
    );
  }
}

function mapStateToProps(state){
  return{
      user: state.user.user,
      token: state.user.token,
  }
}

export default withNavigation(connect(mapStateToProps)(HeaderComponent));
// export default withNavigation(HeaderComponent);