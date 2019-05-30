
import url from '../../utils/url' 

import { FETCH_DATA } from '../middleware/api' 

import { schema as keywordsSchema, getKeywordById } from './entities/keywords'

import { schema as shopSchema } from './entities/shops' 

import { combineReducers } from 'redux';

import { getShopById } from './entities/shops'

const initialState = {
  inputText: '',

  popularKeywords: {
    isFetching: null,
    ids: [],
  },

  relatedKeywords: {

  },

  historyKeywords: [], // 关键词Id

  /**
   * {
   *    shopname: {
   *      isFetching: null,
   *      ids: []
   *    }
   * }
   */
  searchedShopsByKeyword: {

  }
}

export const ActionTypes = {
  // 获取热门关键词
  FETCH_POLULAR_KEYWORDS_REQUEST: 'SEARCH/FETCH_POLULAR_KEYWORDS_REQUEST',

  FETCH_POLULAR_KEYWORDS_SUCCESS: 'SEARCH/FETCH_POLULAR_KEYWORDS_SUCCESS',

  FETCH_POLULAR_KEYWORDS_FAILURE: 'SEARCH/FETCH_POLULAR_KEYWORDS_FAILURE',

  // 获取查询文本获取关键词
  FETCH_RELATED_KEYWORDS_REQUEST: 'SEARCH/FETCH_RELATED_KEYWORDS_REQUEST',

  FETCH_RELATED_KEYWORDS_SUCCESS: 'SEARCH/FETCH_RELATED_KEYWORDS_SUCCESS',

  FETCH_RELATED_KEYWORDS_FAILURE: 'SEARCH/FETCH_RELATED_KEYWORDS_FAILURE',

  // set input

  SET_INPUT_TEXT: 'SEARCH/SET_INPUT_TEXT',

  CLEAR_INPUT_TEXT: 'SEARCH/CLEAR_INPUT_TEXT',

  ADD_HISTORY_KEYWORD: 'SEARCH/ADD_HISTORY_KEYWORD',

  CLEAR_HISTORY_KEYWORDS: 'SEARCH/CLEAR_HISTORY_KEYWORDS',

  // 查询店铺
  FETCH_SHOPS_REQUEST: 'SEARCH/FETCH_SHOPS_REQUEST',

  FETCH_SHOPS_SUCCESS: 'SEARCH/FETCH_SHOPS_SUCCESS',

  FETCH_SHOPS_FAILURE: 'SEARCH/FETCH_SHOPS_FAILURE',

}

export const actions = {

  loadPopularKeywords: () => {
    return (dispatch, getState) => {
      const { ids } = getState().search.popularKeywords

      if (ids && ids.length > 0) {
        return null
      }

      const endpoint = url.getPopularKeywords()

      return dispatch(fetchPopularKeyWords(endpoint))
    }
  },

  loadRelatedKeywords: (text) => {
    return (dispatch, getState) => {

      const { relatedKeywords } = getState().search 

      if (relatedKeywords[text]) {
        return null
      }

      const endpoint = url.getRelatedKeywords(text) 

      return dispatch(fetchRelatedKeywords(text, endpoint))
    }
  },

  loadRelatedShops: (keyword) => {
    return (dispatch, getState) => {
      const { searchedShopsByKeyword } = getState().search
      console.log(searchedShopsByKeyword)
      if (searchedShopsByKeyword[keyword]) {
        return null
      }

      const endpoint = url.getRelatedShops(keyword)

      console.log(endpoint)
      return dispatch(fetchRelatedShops(keyword, endpoint))
    }
  },

  setInputText: (text) => ({
    type: ActionTypes.SET_INPUT_TEXT,
    text,
  }),

  clearInputText: () => ({
    type: ActionTypes.CLEAR_INPUT_TEXT,
  }),

  addHistoryKeyword: (keywordId) => {
    return {
      type: ActionTypes.ADD_HISTORY_KEYWORD,
      text: keywordId,
    }
  },

  clearHistoryKeywords: () => ({
    type: ActionTypes.CLEAR_HISTORY_KEYWORDS,
  }),

}

const fetchPopularKeyWords = (endpoint) => ({
  [FETCH_DATA]: {
    types: [
      ActionTypes.FETCH_POLULAR_KEYWORDS_REQUEST,
      ActionTypes.FETCH_POLULAR_KEYWORDS_SUCCESS,
      ActionTypes.FETCH_POLULAR_KEYWORDS_FAILURE,
    ],
    endpoint,
    schema: keywordsSchema,
  },
})

const fetchRelatedKeywords = (text, endpoint) => ({
  [FETCH_DATA]: {
    types: [
      ActionTypes.FETCH_RELATED_KEYWORDS_REQUEST,
      ActionTypes.FETCH_RELATED_KEYWORDS_SUCCESS,
      ActionTypes.FETCH_RELATED_KEYWORDS_FAILURE,
    ],
    schema: keywordsSchema,
    endpoint,
  },
  text,
})

const fetchRelatedShops = (text, endpoint) => ({
  [FETCH_DATA]: {
    types: [
      ActionTypes.FETCH_SHOPS_REQUEST,
      ActionTypes.FETCH_SHOPS_SUCCESS,
      ActionTypes.FETCH_SHOPS_FAILURE,
    ],
    endpoint,
    schema: shopSchema,
  },

  text,
})
const popularKeywords = (state = initialState.popularKeywords, action) => {
  switch(action.type) {
    case ActionTypes.FETCH_POLULAR_KEYWORDS_REQUEST: {
      return {
        ...state,
        isFetching: 'start'
      }
    }

    case ActionTypes.FETCH_POLULAR_KEYWORDS_SUCCESS: {
      return {
        ...state,
        isFetching: 'success',
        ids: [...action.response.ids]
      }
    }

    case ActionTypes.FETCH_POLULAR_KEYWORDS_FAILURE: {
      return {
        ...state,
        isFetching: 'failure',
        error: action.error,
      }
    }

    default: 
      return state
  }
}

const relatedKeywords = (state = initialState.relatedKeywords, action) => {
  switch(action.type) {
    case ActionTypes.FETCH_RELATED_KEYWORDS_REQUEST: {
      return {
        ...state,
        [action.text]: {
          ...state[action.text],
          ids: [],
          isFetching: 'start',
        }
      }
    }

    case ActionTypes.FETCH_RELATED_KEYWORDS_SUCCESS: {
      return {
        ...state,
        [action.text]: {
          ...state[action.text],
          isFetching: 'success',
          ids: [...action.response.ids],
        }
      }
    }

    case ActionTypes.FETCH_RELATED_KEYWORDS_FAILURE: {
      return {
        ...state,
        [action.text]: {
          ...state[action.text],
          isFetching: 'failure',
          error: action.error,
        },
      }
    }

    default: 
      return state
  }
}

const searchedShopsByKeyword = (state = initialState.searchedShopsByKeyword, action) => {

  switch(action.type) {
    case ActionTypes.FETCH_SHOPS_REQUEST: {
      return {
        ...state,
        [action.text]: {
          ...state[action.text],
          ids: [],
          isFetching: 'start',
        }
      }
    }

    
    case ActionTypes.FETCH_SHOPS_SUCCESS: {
      console.log(action.response)
      return {
        ...state,
        [action.text]: {
          ...state[action.text],
          ids: [...action.response.ids],
          isFetching: 'success',
        }
      }
    }

    case ActionTypes.FETCH_SHOPS_FAILURE: {
      return {
        ...state,
        [action.text]: {
          ...state[action.text],
          isFetching: 'failure',
          error: action.error,
        }
      }
    }

    default:
      return state
  }
}
const inputText = (state = initialState.inputText, action) => {
  switch(action.type) {
    case ActionTypes.SET_INPUT_TEXT: {
      console.log('action', action)
      return action.text
    }
      
    case ActionTypes.CLEAR_INPUT_TEXT: 
      return ''

    default:
      return state
  }
}

const historyKeywords = (state = initialState.historyKeywords, action) => {

  console.log(action.type)
  switch(action.type) {
    
    case ActionTypes.ADD_HISTORY_KEYWORD: {
      const data = state.filter(item => {
        if (item !== action.text) {
          return true
        }
        return false
      })
      console.log('reducer data', data)
      console.log(action.text)
      return [action.text, ...data]
    }

    case ActionTypes.CLEAR_HISTORY_KEYWORDS: 
      return []

    default: 
      return state
  }
}

const reducer = combineReducers({
  popularKeywords,
  relatedKeywords,
  inputText,
  historyKeywords,
  searchedShopsByKeyword,
})

export default reducer

// selectors

export const getPopularKeywords = state => {
  return state.search.popularKeywords.ids.map(id => (
    getKeywordById(state, id)
  ))
}

export const getRelatedKeywords = (state) => {
  const text = state.search.inputText
  if (!text || text.trim().length === 0) {
    return []
  }

  const relatedKeywords = state.search.relatedKeywords[text] 

  if (!relatedKeywords) {
    return []
  }

  return relatedKeywords.ids.map(id => {
    return getKeywordById(state, id)
  })
}

export const getInput = state => {
  return state.search.inputText 
}

export const getHistoryKeywords = state => {
  return state.search.historyKeywords.map(id => {
    return getKeywordById(state, id)
  })
}

export const getSearchedShops = (state) => {

  const keywordId = state.search.historyKeywords[0]

  if (!keywordId) {
    return []
  }

  const shops = state.search.searchedShopsByKeyword[keywordId]

  if (shops) {
    return shops.ids.map(id => {
      return getShopById(state, id)
    })
  }

  return []
  
}

export const getCurrentKeyword = state => {
  const keywordId = state.search.historyKeywords[0] 

  if (!keywordId) {
    return ''
  }
  return getKeywordById(state, keywordId).keyword
}