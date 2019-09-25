import React, { Component, Fragment } from "react";
import {Image, Dimensions} from 'react-native';
import {  Card, CardItem, Text, Body, Icon, Left, Right } from "native-base";

export default class ItemCard extends Component {
  render(props) {
    const  {height, width} = Dimensions.get('window');
    return (
          <Card style={{width:width, height:height/4, borderColor:'#F5D372', marginBottom:5, padding:0}} >
               
            <CardItem style={{flex:10}}>
              <Left style ={{width:width, height:height/4-30, flex:4, paddingRight:0, paddingLeft:0}} >
                  <CardItem style ={{ paddingRight:0, paddingLeft:0}} button onPress={() => alert("This is Image")}>
                    <Image source={{uri:this.props.item.image }} style ={{width:width/3, height:height/5,marginLeft:0, paddingLeft:0, borderColor:'black', resizeMode:"contain"}}/>
                  </CardItem>
              </Left>

              <Body style={{flex:8,marginLeft:20, padding:20, flexDirection:"column"}}>
                  <CardItem style={{paddingBottom:10, paddingTop:0}}>
                  <Text>{this.props.item.name}</Text>
                  </CardItem>

                  {this.props.isCart ?
                        (
                          <Fragment>
                            <CardItem style={{paddingBottom:0, paddingTop:0}}>
                            <Text>{this.props.item.branch}</Text>
                            </CardItem>
          
                            <CardItem style={{paddingBottom:0, paddingTop:0}}>
                            <Text>{this.props.item.price}</Text>
                            </CardItem> 
                          </Fragment>
                  )
                  :null}
                </Body>

              <Right style={{flex:2, flexWrap:"nowrap"}}>
                <Body>
                    <CardItem style={{paddingBottom:0, paddingTop:0}} button onPress={() => alert("This is Wishlist")}>
                        <Icon name="heart" style={{ paddingTop:0, color:'red'}}/>
                     </CardItem>
                    
                    {this.props.isCart ?
                        (
                          <Fragment>
                            <CardItem button onPress={() => alert("This is Plus")} style={{paddingBottom:0, flexWrap:"nowrap"}}>
                                <Text>+</Text>
                            </CardItem>
                            
                            <Text style={{paddingBottom:0, paddingTop:0,flexWrap:"nowrap"}}>100</Text>

                            <CardItem button onPress={() => alert("This is Minus")} style={{paddingBottom:0, paddingTop:0,flexWrap:"nowrap"}}>
                                <Text>-</Text>
                            </CardItem>
                          </Fragment>
                        )
                  
                    :null}
                </Body>
              </Right>

            </CardItem>

          </Card>
    );
  }
}