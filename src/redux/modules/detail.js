
import url from '../../utils/url'

import {FETCH_DATA} from '../middleware/api'

import { schema as shopSchema } from './entities/shops' 

import { schema as productSchema, getProductById } from './entities/products' 

import { getProductDetail } from './entities/products'

import { getShopById } from './entities/shops'

import { combineReducers } from 'redux'

export const ActionTypes = {
  // 获取产品详情
  FETCH_PRODUCT_DETAIL_REQUEST: 'DETAIL/FETCH_PRODUCT_DETAIL_REQUEST',

  FETCH_PRODUCT_DETAIL_SUCCESS: 'DETAIL/FETCH_PRODUCT_DETAIL_SUCCESS',

  FETCH_PRODUCT_DETAIL_FAILURE: 'DETAIL/FETCH_PRODUCT_DETAIL_FAILURE',

  // get shop's ActionType

  FETCH_SHOP_REQUEST: 'DETAIL/FETCH_SHOP_DETAIL_REQUEST',

  FETCH_SHOP_SUCCESS: 'DETAIL/FETCH_SHOP_DETAIL_SUCCESS',

  FETCH_SHOP_FAILURE: 'DETAIL/FETCH_SHOP_DETAIL_FAILURE',
}

export const actions = {
  loadProductDetail: (id) => {
    return (dispatch, getState) => {

      const product = getProductDetail(getState(), id)

      if (product) {
        return dispatch(fetchProductDetailSuccess(id))
      }
      const endpoint = url.getProductDetail(id)
      return dispatch(fetchProductDetail(endpoint, id))
    }
  },

  loadShopById: (id) => {
    return (dispatch, getState) => {
      
      const shop = getShopById(getState(), id) 

      if (shop) {
        return dispatch(fetchShopByIdSuccess(id))
      }

      const endpoint = url.getShopById(id)
      return dispatch(fetchShopById(endpoint, id))
    }
  }

}

const fetchProductDetail = (endpoint, id) => {
  return {
    [FETCH_DATA]: {
      types: [ActionTypes.FETCH_PRODUCT_DETAIL_REQUEST, 
        ActionTypes.FETCH_PRODUCT_DETAIL_SUCCESS,
        ActionTypes.FETCH_PRODUCT_DETAIL_FAILURE,
      ],
      endpoint,
      schema: productSchema,
    }
  }
}

const fetchProductDetailSuccess = (id) => ({
  type: ActionTypes.FETCH_PRODUCT_DETAIL_SUCCESS,
  id,
})

const fetchShopById = (endpoint, id) => {
  return {
    [FETCH_DATA]: {
      types: [
        ActionTypes.FETCH_SHOP_REQUEST,
        ActionTypes.FETCH_SHOP_SUCCESS,
        ActionTypes.FETCH_SHOP_FAILURE,
      ],
      endpoint,
      schema: shopSchema,
    }
  }
}

const fetchShopByIdSuccess = (id) => ({
  type: ActionTypes.FETCH_SHOP_SUCCESS,
  id,
})

const initialState = {
  product: {
    isFetching: null,
    id: null,
  },
  relatedShop: {
    id: null,
    isFetching: null,
  }
}

const product = (state = initialState.product, action) => {

  switch(action.type) {
    case ActionTypes.FETCH_PRODUCT_DETAIL_REQUEST: {
      return {
        ...state,
        isFetching: 'start',
        ...action.response,
      }
    }

    case ActionTypes.FETCH_PRODUCT_DETAIL_SUCCESS: {
      return {
        ...state,
        isFetching: 'success',
        id: action.id,
      }
    }

    case ActionTypes.FETCH_PRODUCT_DETAIL_FAILURE: {
      return {
        ...state,
        id: null,
        isFetching: 'failure',
        error: action.error || 'wrong message'
      }
    }

    default:
      return state
  }
}

const relatedShop = (state = initialState.relatedShop, action) => {
  switch(action.type) {
    case ActionTypes.FETCH_SHOP_REQUEST: {
      return {
        ...state,
        isFetching: 'start'
      }
    }

    case ActionTypes.FETCH_SHOP_SUCCESS: {
      return {
        ...state,
        isFetching: 'success',
        id: action.id,
      }
    }

    case ActionTypes.FETCH_SHOP_FAILURE: {
      return {
        ...state,
        id: null,
        isFetching: 'failure'
      }
    }

    default:
      return state
  }
}


export default combineReducers({
  product,
  relatedShop,
})

// selectors

export const getProduct = (state, id) => {
  return getProductDetail(state, id)
}

export const getRelatedShop = (state, productId) => {

  const product = getProductById(state, productId)

  const shopId = product ? product.nearestShop : null 

  return getShopById(state, shopId)
}