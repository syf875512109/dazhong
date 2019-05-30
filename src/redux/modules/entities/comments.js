
import createReducer from '../../../utils/createReducer'

export const schema = {
  name: 'comments',
  id: 'id',
}

export const actionTypes = {
  ADD_COMMENT: 'COMMENT/ADD_COMMENT',
}

export const actions = {
  addComment: (comment) => ({
    type: actionTypes.ADD_COMMENT,
    comment,
  })
}

const normalReducer = createReducer(schema.name)

const reducer = (state = {}, action) => {
  switch(action.type) {
    case actionTypes.ADD_COMMENT: {
      return {
        ...state,
        [action.comment.id]: action.comment,
      }
    }
    default:
      return normalReducer(state, action)
  }
}

export default reducer 