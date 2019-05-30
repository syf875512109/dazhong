
import { combineReducers } from 'redux'

import url from '../../utils/url' 

import { FETCH_DATA } from '../middleware/api'

import { schema } from './entities/products' 

// 获取数据路径大小
export const params = {
  PATH_LIKES: 'likes',
  PATH_DISCOUNTS: 'discounts',
  PAGE_SIZE_LIKES: 5,
  PAGE_SIZE_DISCOUNTS: 3,
}

const initialState = {
  likes: {
    isFetching: null,
    pageCount: 0,
    ids: [],
  },
  discounts: {
    isFetching: null,
    ids: [],
  }
}


export const ActionTypes = {
  // 获取猜你喜欢
  FETCH_LIKES_REQUESTS: "/HOME/FETCH_LIKES_REQUEST", 
  FETCH_LIKES_SUCCESS: "/HOME/FETCH_LIKES_SUCCESS",
  FETCH_LIKES_FAILURE: "/HOME/FETCH_LIKES_FAILURE",

  // 获取折扣
  FETCH_DISCOUNTS_REQUESTS: "/HOME/FETCH_DISCOUNTS_REQUEST", 
  FETCH_DISCOUNTS_SUCCESS: "/HOME/FETCH_DISCOUNTS_SUCCESS",
  FETCH_DISCOUNTS_FAILURE: "/HOME/FETCH_DISCOUNTS_FAILURE",
}

export const actions = {
  loadLikes: () => {
    return (dispatch, getState) => {

      const path = params.PATH_LIKES
      const { pageCount } = getState().home.likes 
      const rowIndex = pageCount * params.PAGE_SIZE_LIKES

      const endpoint = url.getProductList(path, rowIndex, params.PAGE_SIZE_LIKES)
      return dispatch(fetchLikes(endpoint))
    }
  },

  loadDiscounts: () => {

    return (dispatch, getState) => {

      if(getState().home.discounts.ids.length > 0) {
        return null
      }

      const path = params.PATH_DISCOUNTS 

      const endpoint = url.getProductList(path, 0, params.PAGE_SIZE_DISCOUNTS)
      return dispatch(fetchDiscounts(endpoint))
    }
  }
}

const fetchLikes = (endpoint) => ({
  [FETCH_DATA]: {
    types: [
      ActionTypes.FETCH_LIKES_REQUESTS,
      ActionTypes.FETCH_LIKES_SUCCESS,
      ActionTypes.FETCH_LIKES_FAILURE,
    ],
    endpoint,
    schema,
  }
})

const fetchDiscounts = (endpoint) => ({
  [FETCH_DATA]: {
    types: [
      ActionTypes.FETCH_DISCOUNTS_REQUESTS,
      ActionTypes.FETCH_DISCOUNTS_SUCCESS,
      ActionTypes.FETCH_DISCOUNTS_FAILURE,
    ],
    endpoint,
    schema,
  }
})



const likes = (state = initialState.likes, action) => {
 
  switch(action.type) {
    case ActionTypes.FETCH_LIKES_REQUESTS: {
      return {
        ...state,
        isFetching: 'start',
      }
    }

    case ActionTypes.FETCH_LIKES_SUCCESS: {
      return {
        ...state,
        isFetching: 'success',
        pageCount: state.pageCount + 1,
        ids: state.ids.concat(action.response.ids)
      }
    }

    case ActionTypes.FETCH_LIKES_FAILURE: {
      return {
        ...state,
        isFetching: 'failure',
      }
    }
    default: 
      return state
  }
}

// 特惠商品

const discounts = (state = initialState.discounts, action) => {


  switch(action.type) {
    case ActionTypes.FETCH_DISCOUNTS_REQUESTS: {
      return {
        ...state,
        isFetching: 'start'
      }
    }

    case ActionTypes.FETCH_DISCOUNTS_SUCCESS: {
      return {
        ...state,
        isFetching: 'success',
        ids: action.response.ids
      }
    }

    case ActionTypes.FETCH_DISCOUNTS_FAILURE: {
      return {
        ...state,
        isFetching: 'failure',
      }
    }

    default: 
      return state
  }
}


export default combineReducers({likes, discounts}) 

export const getLikes = (state) => {
  return state.home.likes.ids.map(id => {
    return state.entities.products[id]
  })
}

export const getDiscounts = (state) => {
  return state.home.discounts.ids.map(id => {
    return state.entities.products[id]
  })
}

export const getPageCountOfLikes = (state) => {
  return state.home.likes.pageCount
}