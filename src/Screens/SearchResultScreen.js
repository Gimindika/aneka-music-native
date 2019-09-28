

import React, {Fragment} from 'react';

import HeaderComponent  from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';
import ItemList from './ItemList';

import { connect } from 'react-redux';
import { getItemsByName } from '../public/redux/actions/items';
import { Text, Spinner } from 'native-base';

class SearchResultScreen extends React.Component {
  state={
    name:''
  }
  componentDidMount = async () => {
    const { navigation } = this.props;
    const name = navigation.getParam('name');
    this.setState({name:name})
    await this.props.dispatch(getItemsByName(name));
  }

  render(){
    if(this.props.itemListLoading){
      return(
        <Fragment>
          <Spinner color='orange' style={{ marginTop: '50%' }} />
        </Fragment>
      )
    }else {

      return (
          <Fragment>
              <HeaderComponent/>
              <Text>{'Search result for keyword : '+ this.state.name}</Text>
              <ItemList items={this.props.items}/>
  
              <FooterComponent/>
          </Fragment>
      );
    }
  }
  
};

function mapStateToProps(state){
  return{
    itemListLoading: state.items.isLoading,
    items: state.items.items
  }
}

export default connect(mapStateToProps)(SearchResultScreen);
// export default SearchResultScreen ;
