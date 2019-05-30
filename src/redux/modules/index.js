
import { combineReducers } from 'redux' 

import entities from './entities' 

import home from './home' 

import detail from './detail' 

import search from './search' 
// combine reducer

import login from './login' 

import user from './user'

import purchase from './purchase' 

const rootReducer = combineReducers({
  entities,
  home,
  detail,
  search,
  login,
  user,
  purchase,
})

export default rootReducer