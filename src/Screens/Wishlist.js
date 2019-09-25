
import React from 'react';
import {ScrollView, View} from 'react-native';

import ItemCard from '../Components/ItemCard';
// import SearchBar from '../Components/SearchBar';

const Wishlist = (props) => {
  return (
    <React.Fragment>
    {/* <SearchBar/> */}
    <ScrollView style={{flex:1, }}>
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        {props.items.map((item,index) => {
          return(
            <ItemCard item={item}  key={index}/>
          )
        })}
      </View>
    </ScrollView>
    </React.Fragment>
  );
};

export default Wishlist;
