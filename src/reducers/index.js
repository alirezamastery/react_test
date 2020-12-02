import cartReducer from './cart'
import { combineReducers } from 'redux'
import { withReduxStateSync } from 'redux-state-sync'

const allReducers = combineReducers({
    cart: cartReducer
})

export default allReducers
// export default withReduxStateSync(allReducers) //redux-state-sync