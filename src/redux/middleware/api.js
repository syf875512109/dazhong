
import { get } from '../../utils/request' 

// 有此标识的action经过此中间件处理
export const FETCH_DATA = 'FETCH_DATA'
export default store => next => action => {
  const callAPI = action[FETCH_DATA]

  console.log('action', action)
  if (!(callAPI && callAPI.types)) {
    return next(action)
  }

  const { endpoint, schema, types } = callAPI

  if (typeof endpoint !== 'string') {
    throw new Error('endpoint必须为字符串')
  }

  if(!schema) {
    throw new Error('必须指定领域实体的schema')
  }

  if (!(callAPI.types.every(type => typeof type === 'string'))) {
    throw new Error('action type must be a String')
  }

  const actionWidth = (data) => {
    const finalAction = {...action, ...data} 
    delete finalAction[FETCH_DATA]
    return finalAction
  }

  const [requestType, successType, failureType] = types

  next(actionWidth({
    type: requestType,
  }))

  return fetchData(endpoint, schema).then(
    response => next(actionWidth({
      type: successType,
      response,
    })),
    error => next(actionWidth({
      type: failureType,
      error: error.message || '获取数据失败'
    }))
  )
}

// 执行网络请求
const fetchData = async (endpoint, schema) => {
  const data = await get(endpoint);

  console.log(endpoint, schema)
  
  return normalizeData(data, schema);
}

// 根据schema，获取数据扁平化处理

const normalizeData = (data, schema) => {

  const {id, name} = schema 

  let kvObj = {}
  let ids = []

  if (Array.isArray(data)) {
    data.forEach(item => {

      kvObj[item[id]] = item
      ids.push(item[id])

    })
  } else {
    kvObj[data[id]] = data
    ids.push(data[id])
  }

  const m = {
    [name]: kvObj,
    ids,
  }

  console.log('m', m)
  return {
    [name]: kvObj,
    ids,
  }
}