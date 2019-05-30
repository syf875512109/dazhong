import React, { Component } from 'react';
import SearchBox from './components/SearchBox'

import PopularSearch from './components/PolularSearch'

import SearchHistory from './components/SearchHistory'

import { bindActionCreators } from 'redux' 

import { actions as searchActions, getPopularKeywords, getRelatedKeywords, getInput, getHistoryKeywords } from '../../redux/modules/search' 

import { connect } from 'react-redux'

class Search extends Component {


  componentDidMount() {
    const { loadPopularKeywords } = this.props.searchActions
    loadPopularKeywords()
  }

  handleChange = (text) => {
    const { setInputText, loadRelatedKeywords } = this.props.searchActions

    console.log('text', text)
    setInputText(text)
    loadRelatedKeywords(text)
  }

  handleClearInput = () => {
    const { clearInputText } = this.props.searchActions
    clearInputText()
  }

  handleCancel = () => {
    this.handleClearInput()
    this.props.history.goBack()
  }

  handleClickItem = (item) => {
    const { setInputText, addHistoryKeyword, loadRelatedShops } = this.props.searchActions

    setInputText(item.keyword)

    addHistoryKeyword(item.id)

    // go to search page
    loadRelatedShops(item.id)
    this.props.history.push("/search_result")
  }

  handleClearHistory = () => {
    const { clearHistoryKeywords } = this.props.searchActions
    clearHistoryKeywords()
  }

  componentWillUnmount() {
    const { clearInputText } = this.props.searchActions 
    clearInputText()
  }

  render() {  
    const { inputText, relatedKeywords, popularKeywords, historyKeywords } = this.props 

    return (
      <div>
        <SearchBox inputText={inputText} 
          relatedKeywords={relatedKeywords}
          onChange={this.handleChange}
          onClear={this.handleClearInput}
          onCancel={this.handleCancel}
          onClickItem={this.handleClickItem}
        />
        <PopularSearch
          data={popularKeywords}
          onClickItem={this.handleClickItem}
        />
        <SearchHistory
          data={historyKeywords}
          onClickItem={this.handleClickItem}
          onClear={this.handleClearHistory}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {

  return {
    relatedKeywords: getRelatedKeywords(state),
    popularKeywords: getPopularKeywords(state),
    inputText: getInput(state),
    historyKeywords: getHistoryKeywords(state),
    ...props,
  }
}

const mapDispatchToprops = (dispatch, props) => {
  return {
    searchActions: bindActionCreators(searchActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(Search)