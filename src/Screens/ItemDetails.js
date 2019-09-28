import React, { Component, Fragment } from "react";
import {Image, Dimensions,  View, ScrollView} from 'react-native';
import {  Card, CardItem, Container,Text, Icon, Spinner } from "native-base";
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getCart, addCart } from '../public/redux/actions/cart';
import { getWishlist, addWishlist, deleteWishlist } from '../public/redux/actions/wishlist';
import { getItemDetails } from '../public/redux/actions/items';
import AsyncStorage from '@react-native-community/async-storage'

 class ItemDetails extends Component {
  state={
    itemDetails:{},
    itemstock:[],
    cart:[],
    wishlist:[],
    isWishlisted: false,
    isAddedtoCart: false,
    id:'',

    user:{
      id:'',
      level:''
    },
    token:'',
    header:''
}

componentDidMount = async () => {
    await AsyncStorage.getItem('id').then((value) => {
      // console.log(value);
      if (value !== null) {
        value = parseInt(value);
        this.setState({user:{...this.state.user, id:value}})
      }
    });

    await AsyncStorage.getItem('userLevel').then((value) => {
      console.log('val',value);
      if (value !== null) {
        value = parseInt(value);
        this.setState({user:{...this.state.user, level:value}})
      }
    });

    await AsyncStorage.getItem('token').then((value) => {
      if (value !== null) {
        this.setState({token:value})
      }
    });

    const header = {headers:{'authorization':'Bearer '+this.state.token}};
    this.setState({header:header});

    const { navigation } = this.props;
    const id = navigation.getParam('id');
    this.setState({id:id});

    await this.props.dispatch(getItemDetails(this.state.id));
    await this.setState({itemDetails:this.props.itemDetails})
    await this.setState({itemstock:this.state.itemDetails.itemstock})

    //wishlist//////////////////////////////////////////////////////////
    await this.props.dispatch(getWishlist(this.state.user.id,this.state.header));
    await this.setState({wishlist:this.props.wishlist})

    this.state.wishlist.map(item => {
        if(this.state.id == item.id){ // eslint-disable-line
            this.setState({isWishlisted:true})
        }
        return null;
    })

    //cart///////////////////////////////////////////////////////
    await this.props.dispatch(getCart(this.state.user.id,this.state.header));
    await this.setState({cart:this.props.cart}) 
   
  }

  //wishlist//////////////////////////////////////////////////////
  addRemoveWishlist = async (user, item, command) => {
    if(command == 'add'){ // eslint-disable-line
        await this.props.dispatch(addWishlist(user, item, this.state.header));
        await this.setState({
            wishlist:this.props.wishlist,
            isWishlisted:true
        });
    } else if(command == 'remove') { // eslint-disable-line
        await this.props.dispatch(deleteWishlist(user, item, this.state.header));
        await this.setState({
            wishlist:this.props.wishlist,
            isWishlisted:false
        });
    }
  }

  //cart///////////////////////////////////////////////////////////
  addToCart = async (user, itemID, item, branchID, branch, price, quantity) => {
    await this.state.cart.map( (cartitem) => {
        if(cartitem != undefined){ // eslint-disable-line
            if (item == cartitem.item && branch == cartitem.branch){ // eslint-disable-line
            this.setState({isAddedtoCart:true});
            }
        }  
        return null;      
    })
    
    
    if(!this.state.isAddedtoCart){
        const data = {
            itemID,
            item,
            price,
            branchID,
            branch,
            quantity
        }
        
        await this.props.dispatch(addCart(user,data,this.state.header))
        
        await this.setState({
            cart:this.props.cart,
            isAddedtoCart:true
        });
        
        alert('Item has been added to cart.');
    } else {
        alert('The item is ready, go to checkout.');
        this.setState({isAddedtoCart:false});
    }
  }

  render(props) {
    const  {height, width} = Dimensions.get('window');
    if(this.props.itemDetailsLoading){
      return(
        <Fragment>
          <Spinner color='orange' style={{ marginTop: '50%' }} />
        </Fragment>
      )
    }else {

      return (
        <Fragment>
            <Card style={{marginBotton:0}}>      
              <CardItem style ={{ paddingRight:0, paddingLeft:0}}>
              <Image source={{uri: this.props.itemDetails.image }} style ={{width:width, height:height/3,marginLeft:0, paddingLeft:0, borderColor:'black', resizeMode:"contain"}}/>
              </CardItem>
            
            <ScrollView >
                <CardItem style={{paddingBottom:0}}>
                  <Container style={{flex:4, paddingTop:0, paddingBottom:0, marginTop:0, width:width-50, margin:0,  flexDirection:"column"}}>
                    <Text>{this.props.itemDetails.name}</Text>
                    <Text>({this.props.itemDetails.category})</Text>
                    <Text></Text>
                    <Text>{this.props.itemDetails.description}</Text>
                  </Container>
  
                  {this.state.user.level > 0 ? (
                      <Fragment>
                      {this.state.isWishlisted ? 
                          <Container style={{flex:1,alignItems:'center'}}>
                            <Icon name="heart" style={{ paddingTop:10, color:'red'}} onPress={() => this.addRemoveWishlist(this.state.user.id, this.state.id, 'remove')}/>
                          </Container>
                          :
                          <Container style={{flex:1,alignItems:'center'}}>
                            <Icon name="heart" style={{ paddingTop:10, color:'grey'}} onPress={() => this.addRemoveWishlist(this.state.user.id, this.state.id, 'add')}/>
                          </Container>
                      }
                      </Fragment>
                  ) :null}
                </CardItem>
  
                <Text>Available at : </Text>
                <CardItem style={{flexDirection:"column", justifyContent:"flex-start", paddingLeft:0, paddingRight:0, marginLeft:0, marginRight:0}}>
              
                  {this.state.itemstock ? 
                    <Fragment >
  
                          <Container style={{flex:3,paddingBottom:0, paddingLeft:0, marginLeft:0, width:width-50, justifyContent:"flex-start", flexDirection:"row" , flexWrap:"wrap"}}>
  
                      {this.state.itemstock.map((item, index) => {
                        return(
                          
                          <ScrollView >
                          <CardItem key={index} style={{ justifyContent:"space-between", flexDirection:"column" }}>
                          
                            <CardItem style={{alignSelf:'flex-start'}}>
                              <Text >{item.branch} : </Text>
                            </CardItem>
                           
                            <CardItem style={{ alignItems:"flex-start",alignSelf:"flex-start", flexDirection:"row", marginLeft:0}}>
                              
                              <Text>{item.quantity} unit(s)</Text>
                              <Text>Rp.{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                              {this.state.user.level > 0 ? (
                              <TouchableOpacity onPress={() => {this.addToCart(this.state.user.id, this.state.id, this.state.itemDetails.name, item.branchID, item.branch, item.price, 1)}}>
                                <Text style={{color:'white', backgroundColor:'orange', borderRadius:10, padding:5}}>Add to Cart</Text>
                              </TouchableOpacity>
                              )
                              :null}
                            </CardItem>
                          </CardItem>
                      </ScrollView>
                        
                        )
                      })}
                      </Container>
                    </Fragment>
                  
                    :alert('error itemstock not loaded')}
                    
                </CardItem>
            </ScrollView>
  
          </Card>
        </Fragment>
      );
    }

  }
}

function mapStateToProps(state){
  return{
      itemDetails: state.items.itemDetails,
      itemDetailsLoading: state.items.isLoading,
      cart:state.cart.cart,
      wishlist: state.wishlist.wishlist,
      user: state.user.user
  }
}

export default connect(mapStateToProps)(ItemDetails);