

import React, {Fragment} from 'react';
import { Text,  View, TextInput, Image, ToastAndroid} from 'react-native';
import { Container, Spinner} from 'native-base';
import HeaderComponent  from '../Components/HeaderComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage'
// import {AsyncStorage} from 'react-native';
import { login } from '../public/redux/actions/user';
import {getWishlist} from '../public/redux/actions/wishlist';
import {getCart} from '../public/redux/actions/cart';
import {getUserTransactions} from '../public/redux/actions/transactions';


import { connect } from 'react-redux';


class LoginScreen extends React.Component {
  state={
    email:'',
    password:'',

    user:{
      id:'',
      name:'',
      email:'',
      level:''
    },
    token:''
  }

  toRegister = () => {
    this.props.navigation.navigate('RegisterScreen');
  }

  inputHandler = (name, value) => {
    this.setState(() => ({ [name]: value }));
  }

  // static async getItem(key) {
  //   try {
  //       return await AsyncStorage.getItem(key);
  //   } catch (error) {
  //       console.log("Error saving data" + error);
  //       return null
  //   }
  // }

  login = async () => {
    
    const data = ({
      email:this.state.email,
      password:this.state.password
    })
    if(this.state.email != '' && this.state.password != ''){
      
      await this.props.dispatch(login(data));
      if(this.props.userLoading){
        return(
          <Fragment>
              <Spinner color='orange' style={{ marginTop: '50%' }} />
            </Fragment>
          )
         
      }else {
        if(!this.props.user){
          alert('Wrong email or password!')
        } else {
      
          AsyncStorage.setItem('userName',this.props.user.name)
          AsyncStorage.setItem('id', this.props.user.id.toString())
          AsyncStorage.setItem('userEmail', this.props.user.email)
          AsyncStorage.setItem('userLevel', this.props.user.level.toString())
          AsyncStorage.setItem('token', this.props.token)
    
          await AsyncStorage.getItem('userName').then((value) => {
            if (value !== null) {
              this.setState({user:{...this.state.user, name:value}})
            }
          });
    
          await AsyncStorage.getItem('id').then((value) => {
            // console.log(value);
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
          
          
          ToastAndroid.showWithGravity(
            'Log in success.\nWelcome ' + this.state.user.name,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          setInterval(() => {
            this.props.navigation.navigate('CategoryScreen'); 
        }, 800);
        
          
        }

      }

    } else {
      ToastAndroid.showWithGravity(
        'Email and password can\'t be empty',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    
    }
  } 

  render(){
    return (
        <Fragment>
            <HeaderComponent user='true' />
              <Container style={{flexDirection:"column", flex:1, alignItems:"center",justifyContent:"center"}}>
                    <Image style={{width:200, height:100, borderRadius:10, marginBottom:0}} source={require('../imgs/logo.png')}/>

                    <TextInput 
                      name='email' 
                      placeholder='email' 
                      style={{borderColor:'black', borderWidth:1, width:200, borderRadius:10,paddingLeft:10, marginBottom:10}}
                      onChangeText={(txt) => this.inputHandler("email", txt)}
                      >
                    </TextInput>

                    <TextInput 
                      name='password' 
                      placeholder='password' 
                      secureTextEntry={true} 
                      style={{borderColor:'black', borderWidth:1, width:200,borderRadius:10,paddingLeft:10,}}
                      onChangeText={(txt) => this.inputHandler("password", txt)}
                      >
                    </TextInput>
                    
                    <TouchableOpacity onPress={this.login}>
                      <View style={{borderColor:'black', borderWidth:1, width:100,height:30 ,marginTop:10,marginBottom:20,borderRadius:10}}>
                        <Text style={{textAlign:"center",  textAlignVertical:"center"}}>Login</Text>
                      </View>
                    </TouchableOpacity>

                    <Text>Don't have an account ? </Text>
                    <TouchableOpacity onPress={this.toRegister}>
                      <View style={{ width:100,height:20}}>
                        <Text style={{textAlign:"center", color:'orange'}}>Register Here</Text>
                      </View>
                    </TouchableOpacity>
              </Container>
                    
        </Fragment>
    );
  }
  
};

function mapStateToProps(state){
  return{
      user: state.user.user,
      userLoading: state.user.isLoading,
      token: state.user.token,
      cart:state.cart.cart
  }
}

export default withNavigation(connect(mapStateToProps)(LoginScreen));
// export default withNavigation(LoginScreen);