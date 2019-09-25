
import React, {Fragment} from 'react';
import {ScrollView, View, Text} from 'react-native';

import ItemCard from '../Components/ItemCard';
import SearchBar from '../Components/SearchBar';

const ItemList = (props) => {
  return (
    <Fragment>
    <SearchBar/>
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
            <Text style={{flex:1 , textAlign:"center", fontSize:20}}>No Item(s) in this category yet</Text>
          </Fragment>  
        }
      </View>
    </ScrollView>
    </Fragment>
  );
};

export default ItemList;
