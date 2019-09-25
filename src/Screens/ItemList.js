
import React, {Fragment} from 'react';
import {ScrollView, View, Text} from 'react-native';

import ItemCard from '../Components/ItemCard';

const ItemList = (props) => {
  return (
    <Fragment>
    <ScrollView style={{flex:1, }}>
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        {props.items.length ? 
          (
            <Fragment>
              {props.items.map((item,index) => {
                 return(
                  <ItemCard item={item} key={index}/>
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
};

export default ItemList;
