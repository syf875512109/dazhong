import url from "../../utils/url";

import { FETCH_DATA } from "../middleware/api";

import { schema as orderSchema } from "./entities/orders";

import { combineReducers } from 'redux'

// import { getOrderById } from './entities/orders'

import { createSelector } from 'reselect'

import {
  USED_TYPE,
  TO_PAY_TYPE,
  AVAILABLE_TYPE,
  REFUND_TYPE,
  actions as orderActions,
  actionTypes as orderActionTypes,
  getAllOrders,
} from "./entities/orders";

import Comments, {actions as commentActions, shcema as commentsSchema } from './entities/comments' 

const initialState = {
  orders: {
    isFetching: null,
    ids: [],

    // 待付款的id
    toPayIds: [],

    // 可使用的订单id
    availableIds: [],

    // 退款订单id
    refundIds: []
  },

  currentTab: 0,

  currentOrder: {
    id: null,
    isDeleting: false,
    isCommenting: false,
    comment: '',
    stars: 0,
  }
};

const typeToKey = {
  [USED_TYPE]: 'ids',
  [TO_PAY_TYPE]: 'toPayIds',
  [AVAILABLE_TYPE]: 'availableIds',
  [REFUND_TYPE]: 'refundIds'
}

export const actionTypes = {
  FETCH_ORDERS_REQUEST: "USER/FETCH_ORDERS_REQUEST",
  FETCH_ORDERS_SUCCESS: "USER/FETCH_ORDERS_SUCCESS",
  FETCH_ORDERS_FAILURE: "USER/FETCH_ORDERS_FAILURE",

  // set tab
  SET_CURRENT_TAB: "USER/SET_CURRENT_TAB",

  // delete order

  DELETE_ORDERS_REQUEST: "USER/DELETE_ORDERS_REQUEST",
  DELETE_ORDERS_SUCCESS: "USER/DELETE_ORDERS_SUCCESS",
  DELETE_ORDERS_FAILURE: "USER/DELETE_ORDERS_FAILURE",

  // show delete dialog
  SHOW_DELETE_DIALOG: "USER/SHOW_DELETE_DIALOG",
  HIDE_DELETE_DIALOG: "USER/HIDE_DELETE_DIALOG",

  // show comment area
  SHOW_COMMENT_AREA: "USER/SHOW_COMMENT_AREA",
  HIDE_COMMENT_AREA: "USER/HIDE_COMMENT_AREA",

  // set comment 
  SET_COMMENT: "USET/SET_COMMENT",

  SET_STARS: "USET/STARS",

  // COMMENT
  POST_COMMENT_REQUEST: "USE/POST_COMMENT_REQUEST",
  POST_COMMENT_SUCCESS: "USE/POST_COMMENT_SUCCESS",
  POST_COMMENT_FAILURE: "USE/POST_COMMENT_FAILURE",

};


export const actions = {
  loadOrders: () => {
    return (dispatch, getState) => {
      const { isFetching } = getState().user.orders;
      
      if (isFetching === 'success') {
        return null;
      }

      const endpoint = url.getOrders();

      return dispatch(fetchOrders(endpoint));
    };
  },

  setCurrentTab: index => {
    return {
      type: actionTypes.SET_CURRENT_TAB,
      index
    };
  },

  removeOrder: () => {
    return (dispatch, getState) => {
      const { id } = getState().user.currentOrder

      if (id) {
        dispatch(deleteOrderRequest())

        return new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch(deleteOrderSuccess(id))
            dispatch(orderActions.deleteOrder(id))
            resolve()
          }, 500)
        })
      }
    }
  },

  showDeleteDialog: orderId => ({
    type: actionTypes.SHOW_DELETE_DIALOG,
    orderId,
  }),

  hideDeleteDialog: () => ({
    type: actionTypes.HIDE_DELETE_DIALOG,
  }),

  showCommentArea: (orderId) => ({
    type: actionTypes.SHOW_COMMENT_AREA,
    orderId,
  }),

  hideCommentArea: () => ({
    type: actionTypes.HIDE_COMMENT_AREA,
  }),

  setComment: (comment) => ({
    type: actionTypes.SET_COMMENT,
    comment,
  }),

  setStars: (stars) => ({
    type: actionTypes.SET_STARS,
    stars,
  }),

  // submmit comment
  submitComment: () => {
    return (dispatch, getState) => {
      dispatch(postCommentRequest())

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const { currentOrder: {id, stars, comment }} = getState().user
          const commentObj = {
            id: +new Date(),
            stars,
            content: comment,
          }

          dispatch(postCommentSuccess())

          dispatch(commentActions.addComment(commentObj))

          dispatch(orderActions.addComment(id, commentObj.id))

          return resolve()
        }, 1000)
      })
    }
  }
};

const fetchOrders = endpoint => {
  return {
    [FETCH_DATA]: {
      types: [
        actionTypes.FETCH_ORDERS_REQUEST,
        actionTypes.FETCH_ORDERS_SUCCESS,
        actionTypes.FETCH_ORDERS_FAILURE
      ],
      endpoint,
      schema: orderSchema
    }
  };
};

const deleteOrderRequest = () => {
  return {
    type: actionTypes.DELETE_ORDERS_REQUEST,
  }
}

const deleteOrderSuccess = (orderId) => {
  return {
    type: actionTypes.DELETE_ORDERS_SUCCESS,
    orderId,
  }
}

const postCommentRequest = () => ({
  type: actionTypes.POST_COMMENT_REQUEST,
})

const postCommentSuccess = () => ({
  type: actionTypes.POST_COMMENT_SUCCESS,
})
// reducer

const orders = (state = initialState.orders, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_REQUEST: {
      return {
        ...state,
        isFetching: "start"
      };
    }

    case actionTypes.FETCH_ORDERS_SUCCESS: {
      const toPayIds = action.response.ids.filter(id => {
        return action.response.orders[id].type === TO_PAY_TYPE;
      });

      const availableIds = action.response.ids.filter(id => {
        return action.response.orders[id].type === AVAILABLE_TYPE;
      });

      const refundIds = action.response.ids.filter(id => {
        return action.response.orders[id].type === REFUND_TYPE;
      });

      return {
        ...state,
        isFetching: "success",
        ids: state.ids.concat(action.response.ids),
        toPayIds: state.toPayIds.concat(toPayIds),
        availableIds: state.availableIds.concat(availableIds),
        refundIds: state.refundIds.concat(refundIds)
      };
    }

    case orderActionTypes.ADD_ORDER: {
      const { order } = action
      const key = typeToKey[order.type] 

      return key ? {
        ...state,
        ids: [order.id].concat(state.ids),
        [key]: [order.id].concat(state[key])
      } : {
        ids: [order.id].concat(state.id)
      }
    }

    case actionTypes.DELETE_ORDERS_SUCCESS: {
      return {
        ...state,
        ids: removeOrderId(state, 'ids', action.orderId),
        toPayIds: removeOrderId(state, 'toPayIds', action.orderId),
        availableIds: removeOrderId(state, 'availableIds', action.orderId),
        refundIds: removeOrderId(state, 'refundIds', action.orderId),
      }
    }    

    case actionTypes.FETCH_ORDERS_FAILURE: {
      return {
        ...state,
        isFetching: 'failure'
      }
    }

    default:
      return state
  }
};

const removeOrderId = (state, key, deleteId) => {
  return state[key].filter(id => id != deleteId )
}

const currentTab = (state = initialState.currentTab, action) => {
  switch(action.type) {
    case actionTypes.SET_CURRENT_TAB: {
      return action.index
    }
    
    default: 
      return state
  }
}

const currentOrder = (state = initialState.currentOrder, action) => {
  switch(action.type) {

    case actionTypes.SHOW_DELETE_DIALOG: {
      return {
        ...state,
        id: action.orderId,
        isDeleting: true,
      }
    }

    case actionTypes.SHOW_COMMENT_AREA: {
      return {
        ...state,
        id: action.orderId,
        isCommenting: true,
      }
    }

    case actionTypes.HIDE_COMMENT_AREA: 
    case actionTypes.POST_COMMENT_SUCCESS:
    case actionTypes.POST_COMMENT_FAILURE:
    case actionTypes.HIDE_DELETE_DIALOG:
    case actionTypes.DELETE_ORDERS_SUCCESS:
    case actionTypes.DELETE_ORDERS_FAILURE:
      return initialState.currentOrder

    case actionTypes.SET_COMMENT: {
      return {
        ...state,
        comment: action.comment,
      }
    }

    case actionTypes.SET_STARS: {
      return {
        ...state,
        stars: action.stars,
      }
    }

    default:
      return state
  }
}

export default combineReducers({
  orders,
  currentTab,
  currentOrder,
})

// selectors

export const getCurrentTab = (state) => {
  return state.user.currentTab
}

export const getUserOrder = (state) => state.user.orders 

// export const getOrders = (state) => {
//   const key = ['ids', 'toPayIds', 'availableIds', 'refundIds'][state.user.currentTab]

//   return state.user.orders[key].map(id => {
//     return getOrderById(state, id)
//   })
// }

export const getOrders = createSelector(
  [getCurrentTab, getUserOrder, getAllOrders], (tabIndex, userOrder, orders) => {
    const key = ['ids', 'toPayIds', 'availableIds', 'refundIds'][tabIndex]

    const userOrderIds = userOrder[key] 

    return userOrderIds.map(id => orders[id])
  }
)
export const getDeletingOrderId = (state) => {
  return state.user.currentOrder.isDeleting ? state.user.currentOrder.id : null
}

export const getCommentingOrderId = (state) => {
  return state.user.currentOrder.isCommenting ? state.user.currentOrder.id : null
}

// get commet 
export const getCurrentOrderComment = (state) => {
  return state.user.currentOrder.comment
}

// get stars
export const getCurrentOrderStars = (state) => {
  return state.user.currentOrder ? state.user.currentOrder.stars : 0
}

