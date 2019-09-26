

import React, {Fragment} from 'react';
import { Text,  View, TextInput, Image} from 'react-native';
import { Container, Content, Item } from 'native-base';
import HeaderComponent  from '../Components/HeaderComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import { register } from '../public/redux/actions/user';
import { connect } from 'react-redux';




class RegisterScreen extends React.Component {
  state={
    name:'',
    email:'',
    password:'',
    register:{}
  }

  toLogin = () => {
    this.props.navigation.navigate('LoginScreen');
  }

  inputHandler = (name, value) => {
    this.setState(() => ({ [name]: value }));
  }

  register = async () => {
    const data = {
      name:this.state.name,
      email:this.state.email,
      password:this.state.password
    }

    await this.props.dispatch(register(data));
    this.setState({register:this.props.register})

    if(this.state.register.error){
      alert(this.state.register.error)
    } else {
      alert('Register success. \n Welcome to Aneka Music');
      this.props.navigation.navigate('CategoryScreen');
    }
  } 

  render(){
    return (
        <Fragment>
            <HeaderComponent/>
              <Container style={{flexDirection:"column", flex:1, alignItems:"center",justifyContent:"center"}}>
                    <Image style={{width:200, height:100, borderRadius:10, marginBottom:0}} source={require('../imgs/logo.png')}/>

                    <TextInput 
                      placeholder='name' 
                      style={{borderColor:'black', borderWidth:1, width:200, borderRadius:10,paddingLeft:10, marginBottom:10}}
                      onChangeText={(txt) => this.inputHandler("name", txt)}
                      ></TextInput>
                    <TextInput 
                      placeholder='email' 
                      style={{borderColor:'black', borderWidth:1, width:200, borderRadius:10,paddingLeft:10, marginBottom:10}}
                      onChangeText={(txt) => this.inputHandler("email", txt)}
                      ></TextInput>
                    <TextInput 
                      placeholder='password' 
                      secureTextEntry={true} 
                      style={{borderColor:'black', borderWidth:1, width:200,borderRadius:10,paddingLeft:10,}}
                      onChangeText={(txt) => this.inputHandler("password", txt)}
                      ></TextInput>
                    
                    <TouchableOpacity onPress={this.register}>
                      <View style={{borderColor:'black', borderWidth:1, width:100,height:30 ,marginTop:10, marginBottom:20,borderRadius:10}}>
                        <Text style={{textAlign:"center",  textAlignVertical:"center"}}>Register</Text>
                      </View>
                    </TouchableOpacity>

                    <Text>Already have an account ? </Text>
                    <TouchableOpacity onPress={this.toLogin}>
                      <View style={{ width:100,height:20}}>
                        <Text style={{textAlign:"center", color:'orange'}}>Login Here</Text>
                      </View>
                    </TouchableOpacity>
              </Container>
              
             
             
            
        </Fragment>
    );
  }
  
};

function mapStateToProps(state){
  return{
      register: state.user.register
  }
}

export default connect(mapStateToProps)(RegisterScreen);