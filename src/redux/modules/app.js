
const initialState = {
  error: null 
}

export const ActionTypes = {
  CLEAR_ERROR: 'APP/CLEAR_ERROR'
}

export const actions = {
  clearError: () => ({
    type: ActionTypes.CLEAR_ERROR,
  })
}

const reducer = (state = initialState, action) => {

  const { type, error } = action 

  if (type === ActionTypes.CLEAR_ERROR) {
    return {
      ...state,
      error: null
    }
  } else if (error) {
    return {
      ...state,
      error,
    }
  }

  return state 
}

export default reducer

export const getError = (state) => {
  return state.app.error
}