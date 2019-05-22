
import { combineReducers } from 'redux' 

import entities from './entities' 

import home from './home' 

import detail from './detail' 

// combine reducer

const rootReducer = combineReducers({
  entities,
  home,
  detail,
  app,
})

export default rootReducer