

import React, {Fragment} from 'react';
import {ScrollView, View, Text, Dimensions, ToastAndroid} from 'react-native';
// import ItemCard from '../Components/ItemCard';

import {  Card, CardItem, Body, Spinner, Right } from "native-base";
import HeaderComponent  from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { getCart, editCart, deleteCart, clearCart } from '../public/redux/actions/cart';
import { newTransaction } from '../public/redux/actions/transactions';
import AsyncStorage from '@react-native-community/async-storage'

class CartScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        cart:[],
        user:{
          id:'',
          name:'',
          email:'',
        },
        token:'',
        header:'',

        receipt:false
    }
}

componentDidMount = async () => {

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
    
    const header = {headers:{'authorization':'Bearer '+this.state.token}};
    this.setState({header:header});


    await this.props.dispatch(getCart(this.state.user.id, this.state.header));
    await this.setState({cart:this.props.cart})

    
}

  editQuantity = async (user, item, branch, quantity) => {
    const data = {
        item,
        branch,
        quantity
    }
    if(quantity > 0){
        await this.props.dispatch(editCart(user, data, this.state.header));
        await this.setState({cart:this.props.cart});
    } else {
        await this.props.dispatch(deleteCart(user, item, branch, this.state.header));
        await this.setState({cart:this.props.cart});
      
    }
  }

   //count total price/////////////////////////////////////////////////
   total = () => {
    let tot = 0;
    this.props.cart.map(item => { // eslint-disable-line
        tot += (item.quantity * item.price)
    })
    
    return tot;
  } 

  handleCheckout = async () => {
    const tmp = [];
    this.state.cart.map(cartitem => {
        tmp.push({
            item:cartitem.itemID,
            branch:cartitem.branchID,
            quantity:cartitem.quantity,
            price:(cartitem.price * cartitem.quantity),
            itemName: cartitem.item,
            location: cartitem.branch
        })
        return null;
    })
    const data = {
        transactionitems: [...tmp]
    }

   await this.props.dispatch(newTransaction(this.state.user.id, data, this.state.header));
    ToastAndroid.showWithGravity(
      'Transaction success \n Recorded in transaction history',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );

    await this.setState({receipt:true})
    await this.props.dispatch(clearCart(this.state.user.id, this.state.header));
    this.setState({total:0});
  }

  render(){
    const  {height, width} = Dimensions.get('window');
    if(this.props.cartLoading){
      return(
        <Fragment>
          <Spinner color='orange' style={{ marginTop: '50%' }} />
        </Fragment>
      )
    }else {
      
      return (
          <Fragment>
              <HeaderComponent/>
              <Text style={{textAlign:"center", fontSize:30, fontWeight:"900"}}>Cart</Text>
           
              {/* cart ////////////////////////////////////////// */}
              <React.Fragment>
              <ScrollView style={{flex:1, }}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
             
                  {this.props.cart.length? 
                  <React.Fragment>
                    {this.props.cart.map((item,index) => {
                      return(
  
                        // <ItemCard item={item} isCart='true' key={index}/>
  
                        // itemcard Card /////////////////////////////////////////////
                        <Card key={index} style={{width:width, height:height/4, borderColor:'#F5D372', marginBottom:5, padding:0, borderColor:'orange', borderWidth:2}} >
  
                        <CardItem style={{flex:10}}> 
  
                          <Body style={{flex:8,marginLeft:20, padding:20, flexDirection:"column"}}>
                              <CardItem style={{paddingBottom:10, paddingTop:0}}>
                              
                                <Text style={{fontSize:16}}>{item.item}</Text>
                              
                              </CardItem>
  
                              
                              <Fragment>
                                <CardItem style={{paddingBottom:0, paddingTop:0}}>
                                <Text style={{fontWeight:"200"}}>({item.branch})</Text>
                                </CardItem>
              
                                <CardItem style={{paddingBottom:0, paddingTop:0}}>
                                <Text>Rp. {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                                </CardItem> 
  
                                <CardItem style={{paddingBottom:0, paddingTop:0}}>
                                <Text style={{fontSize:16}}>Subtotal : Rp. {(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                                </CardItem> 
                              </Fragment>
                              
                            </Body>
  
                          <Right style={{flex:2, flexWrap:"nowrap", justifyContent:'center'}}>
                            <Body>
                                
                                
                              <Fragment>
                                <CardItem button onPress={() => {this.editQuantity(this.state.user.id, item.itemID, item.branchID, item.quantity+=1)}} style={{paddingBottom:0, flexWrap:"nowrap"}}>
                                    <Text style={{fontSize:30, fontWeight:"600"}}>+</Text>
                                </CardItem>
                                
                                <Text style={{paddingBottom:0, paddingTop:0,flexWrap:"nowrap",fontSize:25, fontWeight:"600"}}>{item.quantity}</Text>
                               
                                <CardItem button onPress={() => {this.editQuantity(this.state.user.id, item.itemID, item.branchID, item.quantity-=1)}} style={{paddingBottom:0, paddingTop:0,flexWrap:"nowrap"}}>
                                    <Text style={{fontSize:30, fontWeight:"600"}}>-</Text>
                                </CardItem>
                              </Fragment>
                                  
                            </Body>
                          </Right>
  
                        </CardItem>
  
                      </Card>
                      //end of itemcard////////////////////////////////////////////////////////////////////////////
                      )
                    })}
                  </React.Fragment>
                  :   
                  <View style={{flex:1,paddingTop:"50%", alignItems:"center"}}>
                    <Text style={{fontSize:20}}>No item(s) in your cart</Text>
                    <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('CategoryScreen')}>
                      <Text style={{fontSize:20, color:'orange'}}>Tap here to Shop now!</Text>
                    </TouchableOpacity>
                  </View>
                  }
                </View>
              </ScrollView>
              </React.Fragment>
  
              {this.props.cart.length? 
              <Fragment>
                <Text style={{fontSize:20, fontWeight:"600"}}>Total : Rp. {this.total().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>            
                <TouchableOpacity>
                        <Text style={{color:'white', backgroundColor:'orange', textAlign:"center", textAlignVertical:"center", height:40,fontSize:20, fontWeight:"600"}} onPress={() => this.handleCheckout()}  >Checkout</Text>
                </TouchableOpacity>
              </Fragment>
              :null}
  
              <FooterComponent/>
          </Fragment>
      );
    }
  }
  
};


function mapStateToProps(state){
  return{
    cartLoading: state.cart.isLoading, 
    cart: state.cart.cart
  }
}

export default connect(mapStateToProps)(CartScreen);