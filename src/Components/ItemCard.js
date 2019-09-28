import React, { Component, Fragment } from "react";
import {Image, Dimensions} from 'react-native';
import {  Card, CardItem, Text, Body, Icon, Left, Right } from "native-base";
import { connect } from 'react-redux';


 class ItemCard extends Component {
  

  render(props) {
    const  {height, width} = Dimensions.get('window');
    return (
          <Card style={{width:width, height:height/4, borderColor:'#F5D372', marginBottom:5, padding:0, borderColor:'orange', borderWidth:2}} >

            <CardItem style={{flex:10}}>
              <Left style ={{width:width, height:height/4-30, flex:4, paddingRight:0, paddingLeft:0}} >
                  <CardItem style ={{ paddingRight:0, paddingLeft:0}}>
                    <Image source={{uri:this.props.item.image }} style ={{width:width/3, height:height/5,marginLeft:0, paddingLeft:0, borderColor:'black', resizeMode:"contain"}}/>
                  </CardItem>
              </Left>  
              <Body style={{flex:8,marginLeft:20, justifyContent:"center", flexDirection:"column"}}>
                  <CardItem style={{paddingBottom:10, paddingTop:0}}>
                    <Text style={{fontSize:20}}>{this.props.item.name}</Text>
                  </CardItem>

                  
                </Body>

            </CardItem>

          </Card>
    );
  }
}

function mapStateToProps(state){
  return{
      wishlist: state.wishlist.wishlist
  }
}

export default connect(mapStateToProps)(ItemCard);
// export default ItemCard;