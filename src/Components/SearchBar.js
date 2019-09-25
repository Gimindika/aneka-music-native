import React, { Component } from 'react';
import { Item, Input, Icon } from 'native-base';

class SearchBar extends Component {
  render() {
    return (

          <Item style={{width:'90%', alignSelf:'center'}}>
            <Input placeholder='Search item(s)' style={{ paddingLeft:15, fontSize:20, borderRadius:20, border:'black'}}/>
            <Icon active name='search' button onPress={() => alert("This is Search")} />
          </Item>

    );
  }
}

export default SearchBar;