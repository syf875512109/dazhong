
import { getProductDetail } from './entities/products'

import { createSelector }  from 'reselect'

import { 
  AVAILABLE_TYPE,
  actions as orderActions,
} from './entities/orders'

const initialState = {
  quantity: 1,
  showTip: false,
}

export const actionTypes = {
  SET_ORDER_QUANTITY: 'PURCHASE/SET_ORDER_QUANTITY',

  CLOSE_TIP: 'PURCHASE/CLOSE_TIP',

  SUBMIT_ORDER_REQUEST: 'PURCHASE/SUBMIT_ORDER_REQUEST',
  SUBMIT_ORDER_SUCCESS: 'PURCHASE/SUBMIT_ORDER_SUCCESS',
  SUBMIT_ORDER_FAILURE: 'PURCHASE/SUBMIT_ORDER_REQUEST',
}

// action creators
export const actions = {
  setOrderQuantity: (quantity) => ({
    type: actionTypes.SET_ORDER_QUANTITY,
    quantity,
  }),

  closeTip: () => ({
    type: actionTypes.CLOSE_TIP,
  }),

  submitOrder: productId => {
    return (dispatch, getState) => {
      dispatch({
        type: actionTypes.SUBMIT_ORDER_REQUEST,
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const product = getProductDetail(getState(), productId)
  
          const quantity = getState().purchase.quantity
  
          const totalPrice = Number(product.currentPrice) * quantity
  
          const text1 = `${quantity}张 | 总价：${totalPrice}`
  
          const text2 = product.validityPeriod
  
          const order = {
            title: `${product.shop}:${product.product}`,
            orderPicUrl: product.picture,
            channel: '团购',
            statusText: '带消费',
            text: [text1, text2],
            type: AVAILABLE_TYPE,
          }
          
          dispatch(orderActions.addOrder(order))

          dispatch({
            type: actionTypes.SUBMIT_ORDER_SUCCESS,
          })
        }, 500)
      })
    }
  }
}


const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_ORDER_QUANTITY: {
      return {
        ...state,
        quantity: action.quantity,
      }
    }
    case actionTypes.CLOSE_TIP: {
      return {
        ...state,
        showTip: false,
      }
    }

    case actionTypes.SUBMIT_ORDER_SUCCESS: {
      return {
          ...state,
          showTip: true,
      }
    }

    default: 
      return state
  }
}

export default reducer

// selectors
export const getQuantity = (state) => {
  return state.purchase.quantity
}

export const getTipState = (state) => {
  return state.purchase.showTip
}

export const getProduct = (state, id) => {
  return getProductDetail(state, id)
}

export const getTotalPrice = createSelector([getProduct, getQuantity], (product, quantity) => {
  if (!product) {
    return 0
  }
  return (product.currentPrice * quantity).toFixed(1)
})