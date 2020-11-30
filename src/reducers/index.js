import cartReducer from './cartItems'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    cart: cartReducer
})

export default allReducers