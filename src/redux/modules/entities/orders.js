
import createReducer from '../../../utils/createReducer'
import { types } from '@babel/core';

export const schema = {
  name: 'orders',
  id: 'id',
}

export const actionTypes = {
  DELETE_ORDER: 'ORDERS/DELETE_ORDER',

  ADD_COMMENT: 'ORDERS/ADD_COMMENT',

  ADD_ORDER: 'ORDERS/ADD_ORDER',
}

export const USED_TYPE = 1; // 已消费
export const TO_PAY_TYPE = 2; //待付款
export const AVAILABLE_TYPE = 3; //可使用
export const REFUND_TYPE = 4; //退款

const normalReducer = createReducer(schema.name)

let orderIdCounter = 10

export const actions = {
  deleteOrder: (orderId) => ({
    type: actionTypes.DELETE_ORDER,
    orderId,
  }),

  addComment: (orderId, commentId) => ({
    type: actionTypes.ADD_COMMENT,
    orderId,
    commentId,
  }),

  addOrder: (order) => {
    const orderId = `o-${orderIdCounter++}`
    return {
      type: actionTypes.ADD_ORDER,
      orderId,
      order: {
        ...order,
        id: orderId,
      }
    }
  }
}

const reducer = (state = {}, action) => {

  if (action.type && action.type === actionTypes.ADD_COMMENT) {
    return {
      ...state,
      [action.orderId]: {
        ...state[action.orderId],
        commentId: action.commentId,
      }
    }
  }

  if (actionTypes.ADD_ORDER === action.type) {
    return {
      ...state,
      [action.orderId]: action.order,
    }
  }

  if (action.type === actionTypes.DELETE_ORDER) {
    const {[action.orderId]: deleteOrder, ...restOrders} = state
    return restOrders
  } else {
    return normalReducer(state, action)
  }
}

export default reducer 

export const getOrderById = (state, id) => {
  return state.entities.orders[id]
}

export const getAllOrders = (state) => {
  return state.entities.orders
}