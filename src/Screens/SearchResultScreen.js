

import React, {Fragment} from 'react';

import HeaderComponent  from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';
import ItemList from './ItemList';

import { connect } from 'react-redux';
import { getItemsByName } from '../public/redux/actions/items';
import { Text } from 'native-base';

class SearchResultScreen extends React.Component {
  componentDidMount = async () => {
    const { navigation } = this.props;
    const name = navigation.getParam('name');
    console.log('navparamsearch', name);
    
    await this.props.dispatch(getItemsByName(name));
    console.log('items', this.props.items);
    
  }

  render(){
    return (
        <Fragment>
            <HeaderComponent/>
            <Text>{'Search result for keyword : '+ name}</Text>
            <ItemList items={this.props.items}/>

            <FooterComponent/>
        </Fragment>
    );
  }
  
};

function mapStateToProps(state){
  return{
    items: state.items.items
  }
}

export default connect(mapStateToProps)(SearchResultScreen);
// export default SearchResultScreen ;
