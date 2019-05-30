
import createReducer from '../../../utils/createReducer'

export const schema = {
  name: 'products',
  id: 'id',
}

const reducer = createReducer(schema.name)

export default reducer 

export const getProductDetail = (state, id) => {

  const product = state.entities.products[id] 

  if (product && product.detail && product.purchaseNotes) {
    return product 
  } else {
    return null
  }
}

export const getProductById = (state, id) => {

  return state.entities.products[id] 
}