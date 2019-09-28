
import React from 'react';
import {ScrollView, View, Text} from 'react-native';

import ItemCard from '../Components/ItemCard';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';



class Wishlist extends React.Component {
  toItemDetails = (id) => {
    this.props.navigation.navigate('ItemDetails', {id:id});
  }

  render(){
    return (
      <React.Fragment>
      <ScrollView style={{flex:1, }}>
        
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
          {this.props.wishlist.length > 0 ? 
            <React.Fragment>
              {this.props.wishlist.map((item,index) => {
                return(
                  <TouchableOpacity key={index} onPress={() => this.toItemDetails(item.id)} >
                    <ItemCard item={item}  />
                  </TouchableOpacity>
                )
              })}
            </React.Fragment>
            :
            <Text>No item(s) in your wishlist</Text>
            }
        </View>
      </ScrollView>
      </React.Fragment>
    );
  }
};

function mapStateToProps(state){
  return{
      wishlist: state.wishlist.wishlist
  }
}

export default  withNavigation(connect(mapStateToProps)(Wishlist));