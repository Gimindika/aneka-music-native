
import React from 'react';
import {ScrollView, View} from 'react-native';

import CategoryCard from '../Components/CategoryCard';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class CategoryList extends React.Component {
  

  render() {
    
    return (
      <React.Fragment>
      <ScrollView style={{flex:1, }}>
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
          {this.props.categories.map((category,index) => {
            return(
              <TouchableOpacity  onPress={() => this.props.toItemList(category.id)} key={index}>
                <CategoryCard category={category} />
              </TouchableOpacity>
            )
          })}   
        </View>
      </ScrollView>
      </React.Fragment>
    );
  }
  
};

