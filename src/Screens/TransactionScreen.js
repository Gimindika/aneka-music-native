

import React, {Fragment} from 'react';
import {Text} from 'react-native';
import HeaderComponent  from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';

import TransactionList from './TransactionList';


class TransactionScreen extends React.Component {
buttonHandler = () => {
    this.props.navigation.navigate('CategoryScreen');
}

  render(){
    return (
        <Fragment>
            <HeaderComponent/>
            <Text>User</Text>
            <TransactionList/>

            <FooterComponent/>
        </Fragment>
    );
  }
  
};

export default TransactionScreen ;
