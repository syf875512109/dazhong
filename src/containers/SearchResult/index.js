import React, { Component } from 'react';

import ShopList from './component/ShopList'

import SearchHeader from './component/SearchHeader' 

import KeywordBox from './component/KeywordBox' 

import Banner from '../../components/Banner' 

import {connect} from 'react-redux' 

import { getSearchedShops, getCurrentKeyword } from '../../redux/modules/search' 

class SearchResult extends Component {

  handleBack = () => {
    this.props.history.push('/')
  }

  handleSearch = () => {
    this.props.history.push('/search')
  }
  render() {
    const { shops, currentKeyword } = this.props
    return (
      <div>
        <SearchHeader
          onBack={ this.handleBack }
          onSearch={ this.handleSearch }
        />
        <KeywordBox text={currentKeyword }/>
        <Banner />
        <ShopList
          data={shops}
        />
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {
    shops: getSearchedShops(state),
    currentKeyword: getCurrentKeyword(state)
  }
}
export default connect(mapStateToProps, null)(SearchResult);