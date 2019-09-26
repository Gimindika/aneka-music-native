

import React, {Fragment} from 'react';
import {Text} from 'react-native';
import HeaderComponent  from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';

// import TransactionList from './TransactionList';
import AsyncStorage from '@react-native-community/async-storage'

import { getUserTransactions } from '../public/redux/actions/transactions';
import { connect } from 'react-redux';



class TransactionScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        userTransactions:[],
        user:{
          id:'',
          name:'',
          email:'',
        },
        token:'',
        header:'',
        total:0,

        receipt:false
    }
}

componentDidMount = async () => {
    await AsyncStorage.getItem('userName').then((value) => {
      if (value !== null) {
        this.setState({user:{...this.state.user, name:value}})
      }
    });

    await AsyncStorage.getItem('id').then((value) => {
      if (value !== null) {
        value = parseInt(value);
        this.setState({user:{...this.state.user, id:value}})
      }
    });

    await AsyncStorage.getItem('token').then((value) => {
      if (value !== null) {
        this.setState({token:value})
      }
    });
    
    const header = {headers:{'authorization':'Bearer '+this.state.token}};
    this.setState({header:header});


    await this.props.dispatch(getUserTransactions(this.state.user.id, this.state.header));
    await this.setState({userTransactions:this.props.userTransactions})
    console.log('usr tran',this.props.userTransactions)
    
}
  render(){
    return (
        <Fragment>
            <HeaderComponent/>
            <Text>{this.state.user.name}</Text>
            {/* <TransactionList/> */}

            <FooterComponent/>
        </Fragment>
    );
  }
  
};


function mapStateToProps(state){
  return{
      userTransactions: state.transactions.userTransactions,
  }
}

export default connect(mapStateToProps)(TransactionScreen);