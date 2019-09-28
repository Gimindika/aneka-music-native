import React, { Component } from 'react';
import {  Button, Icon } from 'native-base';
import { withNavigation } from 'react-navigation';


class ProfileButton extends Component {
  toProfile = () => {
    this.props.navigation.navigate('ProfileScreen');
  }
  

  render() {
    return (
          <Button bordered warning  style={{width:40, height:40, borderRadius:10, margin:5, borderColor:'white', backgroundColor:'white'}} onPress={this.toProfile}>
            <Icon name="person"  style={{width:40, height:40, padding:10}} />
          </Button>
    );
  }
}

export default withNavigation(ProfileButton);