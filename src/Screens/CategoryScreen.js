

import React, {Fragment} from 'react';

import HeaderComponent  from '../Components/HeaderComponent';
import FooterComponent from '../Components/FooterComponent';
import CategoryList from './CategoryList';

import { connect } from 'react-redux';
import { getCategories } from '../public/redux/actions/categories';
import SearchBar from '../Components/SearchBar';


class CategoryScreen extends React.Component {
  state={
    user:{
      id:'',
      name:'',
      email:'',
    },
    token:''
  }

  componentDidMount =  async () => {
    await this.props.dispatch(getCategories());
  }

  toItemList = (id) => {
    this.props.navigation.navigate('ItemListScreen', {id:id});
  }

  render(){
    return (
        <Fragment>
            <HeaderComponent/>
              <SearchBar/>

              <CategoryList categories={this.props.categories} toItemList={ this.toItemList}/>        
            <FooterComponent/>
        </Fragment>
    );
  }
  
};

function mapStateToProps(state){
  return{
      categories: state.categories.categories
  }
}

export default connect(mapStateToProps)(CategoryScreen);
// export default (CategoryScreen);
