
import url from '../../utils/url' 

import { FETCH_DATA } from '../middleware/api'

import { schema } from './entities/products' 

export const ActionTypes = {
  // 获取猜你喜欢
  FETCH_LIKES_REQUESTS: "/HOME/FETCH_LIKES_REQUEST", 
  FETCH_LIKES_SUCCESS: "FETCH_LIKES_SUCCESS",
  FETCH_LIKES_FAILURE: "FETCH_LIKES_FAILURE",
}

export const actions = {
  loadlikes: () => {
    return (dispatch, getState) => {
      const endpoint = url.getProductList(0, 10)
      return dispatch(fetchLikes(endpoint))
    }
  }
}

const fetchLikes = (endpoint) => ({
  [FETCH_DATA]: {
    types: [
      ActionTypes.fetchLikesRequest,
      ActionTypes.fetchLikesSuccess,
      ActionTypes.fetchLikesFailure
    ],
    endpoint,
    schema,
  }
})


const reducer = (state = {}, action) => {

  switch(action.type) {
    case ActionTypes.fetchLikesRequest: {
      //todos
    }

    case ActionTypes.fetchLikesSuccess: {
      //todos
    }

    case ActionTypes.fetchLikesFailure: {
      //todos
    }

    default: 
      return state
  }
}

export default reducer 