

const initialState = {
  username: localStorage.getItem('username') || '',
  password: '',
  isFetching: null,

  status: localStorage.getItem('login') || false, //登录状态标识
}

export const actionTypes = {
  LOGIN_REQUEST: 'LOGIN/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN/LOGIN_FAILURE',

  LOGOUT: 'LOGIN/LOGOUT',

  SET_UESRNAME: 'LOGIN/SET_USERNAME',
  SET_PASSWORD: 'LOGIN/SET_PASSWORD',

  CLEAR_STATUS: 'LOGIN/CLEAR_STATUS'
}

export const actions = {
  login: () => {
    return (dispatch, getState) => {
      const { username, password } = getState().login

      if (!username.trim() || !password.trim()) {
        return dispatch(loginFailure('用户名或密码错误'))
      }

      dispatch(loginRequest())

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          dispatch(loginSuccess())

          localStorage.setItem('username', username)
          localStorage.setItem('login', true)
          
          resolve()
        }, 1000)
      })
    }
  },

  logout: () => {
    localStorage.removeItem('username')
    localStorage.removeItem('login')
    return {
      type: actionTypes.LOGOUT
    }
  },

  setUsername: (username) => ({
    type: actionTypes.SET_UESRNAME,
    username,
  }),

  setPassword: (password) => ({
    type: actionTypes.SET_PASSWORD,
    password,
  }),

  clearStatus: () => ({
    type: actionTypes.CLEAR_STATUS,
  })
}

const loginSuccess = () => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
  }
}

const loginRequest = () => ({
  type: actionTypes.LOGIN_REQUEST
})

const loginFailure = (error) => ({
  type: actionTypes.LOGIN_FAILURE,
  error,
})

// reducer

const reducer = (state = initialState, action) => {
  console.log(action.type)
  switch(action.type) {

    case actionTypes.LOGIN_REQUEST: {
      return {
        ...state,
        isFetching: 'start'
      }
    }

    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: 'success',
        status: true,
      }
    }

    case actionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isFetching: 'failure',
        error: action.error,
      }
    }

    case actionTypes.LOGOUT: {
      return {
        ...state,
        isFetching: null,
        status: false,
        username: '',
        password: '',
      }
    }

    case actionTypes.SET_PASSWORD: {
      return {
        ...state,
        password: action.password,
      }
    }

    case actionTypes.SET_UESRNAME: {
      return {
        ...state,
        username: action.username,
      }
    }

    case actionTypes.CLEAR_STATUS: {
      return {
        ...state,
        isFetching: null,
      }
    }
    default: 
      return state
  }
}

export default reducer 

// selectors
export const getUsername = (state) => state.login.username

export const getPassword = (state) => state.login.password

export const isLogin = (state) => state.login.status 