import React, { Component } from 'react';
import { Item, Input, Icon } from 'native-base';
import { withNavigation } from 'react-navigation';

class SearchBar extends Component {
  state ={
    name:'Search item(s)'
  }

  inputHandler = (name, value) => {
    this.setState(() => ({ [name]: value }));
  }
  
  search = () => {
    const searchtarget = this.state.name;
    this.setState({name:'Search item(s)'})
    this.props.navigation.navigate('SearchResultScreen', {name:searchtarget});
  }

  render() {
    return (

          <Item style={{width:'90%', alignSelf:'center'}}>
            <Input  value={this.state.name} style={{ paddingLeft:15, fontSize:20, borderRadius:20, borderColor:'black'}} 
            onFocus= {() => this.setState({name : ''})}
            onChangeText={
              (txt) => {  
                this.inputHandler("name", txt)
                }
              }/>
            <Icon active name='search' button onPress={() => this.search()} />
          </Item>

    );
  }
}

export default withNavigation(SearchBar);
// export default SearchBar;