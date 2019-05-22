
import { createStore, applyMiddleware, compose } from 'redux' 
import rootReducer from './modules'

import thunkMiddleware from 'redux-thunk' 

import api from './middleware/api' 

let store 

// 继承开发功能redux插件
if (process.env.NODE_ENV !== 'production' && 
window.__REDUX__DEVTOOLS__ENTENSION__) {

  const composeEnhancers = window.__REDUX__DEVTOOLS__ENTENSION__COMPOSE__ 

  store = createStore(
    rootReducer, 
    compose(applyMiddleware(thunkMiddleware, api), composeEnhancers)
  )
} else {
  store = createStore(rootReducer, applyMiddleware(thunkMiddleware, api))
}

export default store 