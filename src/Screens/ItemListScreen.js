

import React, {Fragment} from 'react';

import HeaderComponent  from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';
import ItemList from './ItemList';
import { Spinner} from 'native-base';
import { connect } from 'react-redux';
import { getItemsByCategory } from '../public/redux/actions/items';
// import SearchBar from '../Components/SearchBar';


class ItemListScreen extends React.Component {
  componentDidMount = async () => {
    const { navigation } = this.props;
    const id = navigation.getParam('id');
    // console.log('navparam', id);
    
    await this.props.dispatch(getItemsByCategory(id));
    // console.log('items', this.props.items);
    
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
              {/* <SearchBar/> */}

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

export default connect(mapStateToProps)(ItemListScreen);
// export default ItemListScreen ;
