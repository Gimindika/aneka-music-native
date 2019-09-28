

import React, {Fragment} from 'react';
import { ScrollView, View, Dimensions} from 'react-native';
import { Spinner, Card, CardItem, Text, Body, Left, Right } from "native-base";

import HeaderComponent  from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';

import AsyncStorage from '@react-native-community/async-storage'

import { getUserTransactions } from '../public/redux/actions/transactions';
import { connect } from 'react-redux';

import ItemCard from '../Components/ItemCard';



class TransactionScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        userTransactions:[],
        user:{
          id:'',
        },
        token:'',
        header:'',
        total:0,

        receipt:false
    }
  }

componentDidMount = async () => {
 

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
    
}
  render(){
    const  {height, width} = Dimensions.get('window');
    if(this.props.userTransactionsLoading){
      return(
        <Fragment>
          <Spinner color='orange' style={{ marginTop: '50%' }} />
        </Fragment>
      )
    }else {

      return (
          <Fragment>
              <HeaderComponent/>
              <Text style={{textAlign:"center", fontSize:30, fontWeight:"900"}}>Transaction History</Text>
  
              <React.Fragment>
              <ScrollView style={{flex:1, }}>
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                  
                    
                {this.state.userTransactions.map((transaction,index) => {
                  return(
                    <Card key={index} style={{flexDirection:'column' }}>
                      <CardItem style={{backgroundColor:'orange'}}>
                        <Text>Transaction Date : {transaction.date.toString().slice(0,10)}</Text>
                      </CardItem> 
                      
                      {transaction.transactionitems.map((item, index) => {
                        return(
  
                          <CardItem key={index} style={{paddingBottom:0, paddingTop:0, marginBottom:0, marginTop:0}}>
                            <Card style={{width:width, height:height/4, borderColor:'#F5D372', marginBottom:0, paddingBottom:0, borderColor:'orange', borderWidth:2}} >
                              <CardItem style={{flex:10}}> 
                                <Body style={{flex:8,marginLeft:0, padding:0, flexDirection:"column"}}>
                                  <CardItem style={{paddingBottom:0, paddingTop:0}}>
                                    <Text>{item.itemName}</Text>
                                  </CardItem>
                                  
                                  <Fragment>
                                    <CardItem style={{paddingBottom:0, paddingTop:0}}>
                                    <Text>({item.branch})</Text>
                                    </CardItem>
  
                                    <CardItem style={{paddingBottom:0, paddingTop:0}}>
                                    <Text>Rp. {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                                    </CardItem> 
  
                                    <CardItem style={{paddingBottom:0, paddingTop:0}}>
                                    <Text>Subtotal : Rp. {(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                                    </CardItem> 
                                  </Fragment>
                                </Body>
  
                                <Right style={{flex:2, flexWrap:"nowrap"}}>
                                  <Body>
                                    <Fragment>  
                                      <Text style={{paddingBottom:0, paddingTop:0,flexWrap:"nowrap"}}>{item.quantity}</Text>
                                    </Fragment> 
                                  </Body>
                                </Right>
                              </CardItem>
                            </Card>
                          </CardItem>
                        )
                      })}
                      <CardItem style={{borderColor:'#F5D372', borderWidth:1}}>
                        <Left>
                        <Text>Total:</Text>
                        </Left>
                        <Right>
                        <Text>Rp.{Object.values(transaction.transactionitems).reduce((total, {price,quantity}) => total + price*quantity, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                        </Right>
                      </CardItem>
                      
                    </Card>
                  )
      
                })}        
         
                </View>
              </ScrollView>
              </React.Fragment>
  
              <FooterComponent/>
          </Fragment>
      );
    }
  }
  
};


function mapStateToProps(state){
  return{
    userTransactionsLoading: state.transactions.isLoading,
      userTransactions: state.transactions.userTransactions,
  }
}

export default connect(mapStateToProps)(TransactionScreen);