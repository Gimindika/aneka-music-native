
import React, {Fragment} from 'react';
import {ScrollView, View, Text} from 'react-native';

import ItemCard from '../Components/ItemCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';



class ItemList extends React.Component {
  toItemDetails = (id) => {
    this.props.navigation.navigate('ItemDetails', {id:id});
  }

  render(){

    return (
      <Fragment>
      <ScrollView style={{flex:1, }}>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
          {this.props.items.length ? 
            (
              <Fragment>
                {this.props.items.map((item,index) => {
                   return(
                    <TouchableOpacity  key={index} onPress={() => this.toItemDetails(item.id)}>
                      <ItemCard item={item}/>
                    </TouchableOpacity>
                   )
                })} 
              </Fragment> 
            )
            :
            <Fragment>
              {/* <Text style={{flex:1 , textAlign:"center", fontSize:20}}>No Item(s) in this category yet</Text> */}
              <Text style={{flex:1 , textAlign:"center", fontSize:20}}>No Item(s) with this category/name yet</Text>
  
            </Fragment>  
          }
        </View>
      </ScrollView>
      </Fragment>
    );
  }
};

export default withNavigation(ItemList);
